interface DecodedToken {
  userId: number
  email: string
  role: string
  fanId?: number
  // Add other fields present in your JWT payload
  exp: number
  iat: number
}

export class JwtService {
  private static loginKey = "vercelCelebLoginToken"
  static saveLoginToken(token: string): void {
    if (token) {
      localStorage.setItem(this.loginKey, token)
    } else {
      console.error("Invalid token provided")
    }
  }

  static getToken(): string | null {
    return localStorage.getItem("authToken")
  }

  static removeToken(): void {
    localStorage.removeItem("jwtToken")
  }

  static isTokenValid(): boolean {
    const token = this.getToken()
    if (!token) return false

    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      const expirationTime = payload.exp * 1000
      return Date.now() < expirationTime
    } catch (error) {
      console.error("Error decoding token:", error)
      return false
    }
  }

  static decodeToken(token: string): DecodedToken | null {
    try {
      const base64Url = token.split(".")[1]
      if (!base64Url) return null
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join(""),
      )
      return JSON.parse(jsonPayload) as DecodedToken
    } catch (error) {
      console.error("Failed to decode JWT token:", error)
      return null
    }
  }

  static isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token)
    if (!decoded || !decoded.exp) {
      return true // If no exp claim or cannot decode, treat as expired
    }
    const currentTime = Math.floor(Date.now() / 1000) // Convert to seconds
    return decoded.exp < currentTime
  }
}

export default JwtService
