// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Define interfaces for the data structures our command will use
interface UserSeedData {
  email: string
  password?: string
  role: "FAN" | "CELEBRITY" | "ADMIN"
  isVerified?: boolean
  whatsAppNumber?: string
}

interface ShoutoutSeedData {
  celebrityEmail: string
  content: string
  mediaType?: "text" | "video" | "voice" | "image"
}

interface SeedConfig {
  fan: UserSeedData
  celebrities: UserSeedData[]
  shoutouts: ShoutoutSeedData[]
}

// Define interfaces for the data returned by the command
interface SeededUser {
  id: number
  email: string
  role: string
}

interface SeededMessage {
  id: number
  content: string
  mediaType?: string
}

interface SeededChat {
  id: number
}

interface SeededShoutout {
  chatId: number
  messageId: number
  content: string
  celebrityEmail: string
}

interface SeededDataResults {
  fan: { user: SeededUser }
  celebrities: Array<{ user: SeededUser }>
  shoutouts: Array<SeededShoutout>
}

// Define custom options for apiRequest
interface ApiRequestOptions extends Partial<Cypress.RequestOptions> {
  needsAuth?: boolean
}

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      loginViaApi(email: string, password: string): Chainable<string> // Yields token
      seedUsersAndShoutouts(config: SeedConfig): Chainable<SeededDataResults>
      // ✨ ADDED: apiRequest custom command
      apiRequest(options: ApiRequestOptions): Chainable<Cypress.Response<any>>
    }
  }
}

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login")
  cy.get('input[name="email"]').type(email)
  cy.get('input[name="password"]').type(password)
  cy.get('button[type="submit"]').click()
})

Cypress.Commands.add("loginViaApi", (email, password) => {
  const apiBaseUrl = Cypress.env("apiBaseUrl")
  return cy
    .request({
      method: "POST",
      url: `${apiBaseUrl}/auth/login`,
      body: { email, password },
      failOnStatusCode: false,
    })
    .then((response) => {
      if (response.status === 200 && response.body) {
        window.localStorage.setItem("authToken", response.body)
        return response.body // Yield the token
      } else {
        console.error("API login failed", response)
        throw new Error(`API login failed with status ${response.status}: ${JSON.stringify(response.body)}`)
      }
    })
})

// ✨ ADDED: cy.apiRequest() custom command
Cypress.Commands.add("apiRequest", (options: ApiRequestOptions) => {
  const { needsAuth = true, ...requestOptions } = options // Default needsAuth to true

  // Construct full URL if a relative path is given
  if (requestOptions.url && !requestOptions.url.startsWith("http")) {
    const baseUrl = Cypress.env("apiBaseUrl")
    // Ensure no double slashes between baseUrl and relative path
    const separator = requestOptions.url.startsWith("/") ? "" : "/"
    requestOptions.url = `${baseUrl}${separator}${requestOptions.url}`
  }

  if (needsAuth) {
    // Retrieve token from localStorage (set by loginViaApi or UI login)
    const token = window.localStorage.getItem("authToken")

    if (token) {
      requestOptions.headers = {
        ...requestOptions.headers,
        Authorization: `Bearer ${token}`,
      }
    } else {
      // If auth is needed but no token, log a warning.
      // The request will proceed, and the API should handle the 401/403.
      // This allows testing unauthenticated access to protected routes.
      cy.log("apiRequest: needsAuth is true, but no authToken found in localStorage.")
    }
  }
  return cy.request(requestOptions)
})

Cypress.Commands.add("seedUsersAndShoutouts", (config: SeedConfig) => {
  const { fan, celebrities, shoutouts } = config
  const results: SeededDataResults = {
    fan: {} as { user: SeededUser },
    celebrities: [],
    shoutouts: [],
  }

  cy.task("ensureUserInDb", {
    email: fan.email,
    password: fan.password || "password123",
    role: fan.role,
    isVerified: fan.isVerified === undefined ? true : fan.isVerified,
    whatsAppNumber: fan.whatsAppNumber || "0000000000",
  }).then((fanResult) => {
    results.fan = fanResult as { user: SeededUser }
  })

  let celebrityChain = cy.wrap(null)
  celebrities.forEach((celeb) => {
    celebrityChain = celebrityChain.then(() => {
      return cy
        .task("ensureUserInDb", {
          email: celeb.email,
          password: celeb.password || "password123",
          role: celeb.role,
          isVerified: celeb.isVerified === undefined ? true : celeb.isVerified,
          whatsAppNumber: celeb.whatsAppNumber || "0000000000",
        })
        .then((celebResult) => {
          results.celebrities.push(celebResult as { user: SeededUser })
        })
    })
  })

  let shoutoutChain = celebrityChain
  shoutouts.forEach((shoutout) => {
    shoutoutChain = shoutoutChain.then(() => {
      return cy
        .task("seedShoutout", {
          fanEmail: fan.email,
          celebrityEmail: shoutout.celebrityEmail,
          content: shoutout.content,
          mediaType: shoutout.mediaType || "text",
        })
        .then((shoutoutResult) => {
          results.shoutouts.push(shoutoutResult as SeededShoutout)
        })
    })
  })

  return shoutoutChain.then(() => {
    return cy.wrap(results)
  })
})
