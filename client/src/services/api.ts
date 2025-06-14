// Basic API service utility
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001/api"

interface RequestOptions extends RequestInit {
  needsAuth?: boolean
  isFormData?: boolean
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { needsAuth = false, isFormData = false, ...fetchOptions } = options
  // Conditionally set Content-Type header
  const headers: HeadersInit = isFormData
    ? options.headers || {}
    : { "Content-Type": "application/json", ...(options.headers || {}) }

  if (needsAuth) {
    const token = localStorage.getItem("authToken")
    if (token) {
      if (headers instanceof Headers) {
        headers.set("Authorization", `Bearer ${token}`)
      } else {
        ;(headers as Record<string, string>)["Authorization"] = `Bearer ${token}`
      }
    }
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }))
    console.error("API Error:", errorData)
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
  }

  const contentType = response.headers.get("content-type")
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json() as Promise<T>
  } else {
    // For non-JSON responses (like successful POST with no content, or file downloads)
    // Try to parse as JSON, but fall back to null or text if it fails or isn't JSON
    try {
      const text = await response.text()
      if (!text) return null as unknown as T // Handle empty response body
      return JSON.parse(text) as Promise<T> // Try to parse if there's text
    } catch (e) {
      // If it's not JSON or empty, this might be intentional for some endpoints
      // For file uploads, a 201 or 200 with a simple success message (not JSON) is common
      // We can return a generic success object or the raw text if needed
      // For now, let's assume successful non-JSON responses for FormData might just return a simple object
      // or we can expect the backend to always return JSON, even for FormData uploads.
      // Let's assume backend sends back the created project as JSON.
      // If backend sends non-JSON success, this part needs adjustment.
      // This block might be redundant if backend always sets content-type to json for responses.
      return null as unknown as T
    }
  }
}

// Auth Endpoints
export const registerFanApi = (data: any, tempSessionId?: string) =>
  request("/auth/register/fan", {
    method: "POST",
    body: JSON.stringify(tempSessionId ? { ...data, tempSessionId } : data),
  })

export const loginApi = (data: any, tempSessionId?: string) =>
  request("/auth/login", {
    method: "POST",
    body: JSON.stringify(tempSessionId ? { ...data, tempSessionId } : data),
  })

export const resendVerificationApi = (data: { email: string }) =>
  request("/auth/resend-verification", { method: "POST", body: JSON.stringify(data) })

export const forgotPasswordApi = (email: string) =>
  request<{ message: string }>("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  })

// Fan Profile Endpoints
export const getMyFanProfileApi = () => request("/fans/me/profile", { needsAuth: true })
export const updateMyFanProfileApi = (data: any) =>
  request("/fans/me/profile", { method: "PUT", body: JSON.stringify(data), needsAuth: true })

// New endpoint for fetching bookings
export const getMyBookingsApi = () => request<any[]>("/fans/me/bookings", { needsAuth: true })

// Public Celebrity Endpoints
export const getPublicCelebritiesApi = () => request<any[]>("/celebrities/public") // Consider a more specific type

// Temporary Chat Endpoints
export const initiateTemporaryChatApi = (celebrityId: number) =>
  request<{ tempSessionId: string; messages: any[] }>("/temporary-chats/initiate", {
    method: "POST",
    body: JSON.stringify({ celebrityId }),
  })

export const sendTemporaryMessageApi = (tempSessionId: string, content: string, mediaType = "text") =>
  request("/temporary-chats/message", {
    method: "POST",
    body: JSON.stringify({ tempSessionId, content, mediaType }),
  })

export const getTemporaryMessagesApi = (tempSessionId: string) =>
  request<any[]>(`/temporary-chats/messages/${tempSessionId}`)

// OAuth - Google
export const googleAuthUrl = `${API_BASE_URL}/auth/google`

// Admin Chat Endpoints
export const getAdminChatListApi = () => request<any[]>("/chats/admin/list", { needsAuth: true })

// Reservation Project Endpoints
// The payload is FormData, so an interface is for documentation/guidance
export interface CreateReservationProjectPayloadFields {
  title: string
  description: string
  celebrityId: string // FormData sends numbers as strings
  startDate: string
  endDate: string
  pricePerSlot: string // FormData sends numbers as strings
  slotDurationMinutes: string // FormData sends numbers as strings
  slotIntervalMinutes?: string
  // projectImages: File[] // This will be handled by appending files to FormData
}

export const createReservationProjectApi = (
  formData: FormData, // Changed data type to FormData
) =>
  request<any>("/reservations", {
    // Assuming endpoint is /api/reservations
    method: "POST",
    body: formData, // Pass FormData directly
    needsAuth: true,
    isFormData: true, // Signal that this is a FormData request
  })

export const getReservationProjectByIdApi = (projectId: number) =>
  request<any>(`/reservations/${projectId}`, { needsAuth: true })

export const getReservationSlotsApi = (projectId: number) =>
  request<Array<{ start: string; end: string }>>(`/reservations/${projectId}/slots`, {
    needsAuth: true, // Or false if fans can see slots before login
  })

export interface BookReservationSlotPayload {
  slotStartTime: string // ISO string
  // Potentially other details like numberOfGuests if maxGuestsPerSlot > 1
}

export const bookReservationSlotApi = (projectId: number, data: BookReservationSlotPayload) =>
  request<any>(`/reservations/${projectId}/book`, {
    method: "POST",
    body: JSON.stringify(data),
    needsAuth: true,
  })

// Subscription Endpoints
export const getMembershipsByCelebrityApi = (celebrityId: number) =>
  request<any[]>(`/celebrities/${celebrityId}/memberships`)

export const subscribeToMembershipApi = (formData: FormData) =>
  request("/subscriptions/subscribe", {
    method: "POST",
    body: formData,
    needsAuth: true,
    isFormData: true,
  })

export const getMySubscriptionsApi = () => request<any[]>("/subscriptions/my-subscriptions", { needsAuth: true })

// Admin Payment Endpoints
export const getPendingPaymentsApi = () => request<any[]>("/payments/pending", { needsAuth: true })

export const approvePaymentApi = (paymentId: number) =>
  request(`/payments/${paymentId}/approve`, {
    method: "POST",
    needsAuth: true,
  })

export const checkActiveSubscriptionApi = (celebrityId: number, tier?: string) => {
  let url = `/subscriptions/check/${celebrityId}`
  if (tier) {
    url += `?tier=${encodeURIComponent(tier)}`
  }
  return request<{ hasActiveSubscription: boolean }>(url, { needsAuth: true })
}
