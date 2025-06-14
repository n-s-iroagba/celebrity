import { defineConfig } from "cypress"
// You might need to install node-fetch if not already: npm install node-fetch
// Or, if your Node version (used by Cypress) supports fetch globally, you might not need it.
// import fetch from 'node-fetch'; // Uncomment if you installed node-fetch and need to import it

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    video: false,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      on("task", {
        async ensureUserInDb(userData: {
          email: string
          password: string
          role?: string
          whatsAppNumber?: string
          isVerified?: boolean
        }) {
          const { email, password, role, whatsAppNumber, isVerified } = userData
          const apiBaseUrl = config.env.apiBaseUrl || "http://localhost:8000/api"

          console.log(
            `[cy.task - ensureUserInDb] Attempting to ensure user: ${email} at ${apiBaseUrl}/test/ensure-user`,
          )

          try {
            const response = await fetch(`${apiBaseUrl}/test/ensure-user`, {
              // Ensure 'fetch' is available
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password, role, whatsAppNumber, isVerified }),
            })

            if (!response.ok) {
              const errorBody = await response.text() // Get more details from the error response
              const errorMessage = `[cy.task - ensureUserInDb] API call to /test/ensure-user failed with status ${response.status} (${response.statusText}): ${errorBody}`
              console.error(errorMessage)
              // Throwing an error here will cause cy.task to fail in the Cypress test
              throw new Error(errorMessage)
            }

            const result = await response.json()
            console.log(
              `[cy.task - ensureUserInDb] User ensured successfully: ${result.user?.email}, Message: ${result.message}`,
            )
            return result // This result is yielded by cy.task in the test
          } catch (error: any) {
            // Catch any other errors (e.g., network issues, JSON parsing errors if response isn't JSON)
            const errorMessage = `[cy.task - ensureUserInDb] Error during task execution for user ${email}: ${error.message}`
            console.error(errorMessage, error.stack)
            // Re-throw to ensure the Cypress test fails
            throw new Error(errorMessage)
          }
        },

        // 👇 NEW TASK FOR SEEDING A SHOUTOUT
        async seedShoutout(shoutoutData: {
          fanEmail: string
          celebrityEmail: string
          content: string
          mediaType?: "text" | "video" | "voice" | "image"
        }) {
          const apiBaseUrl = config.env.apiBaseUrl || "http://localhost:8000/api"
          console.log(
            `[cy.task - seedShoutout] Seeding shoutout from ${shoutoutData.fanEmail} to ${shoutoutData.celebrityEmail}`,
          )

          try {
            const response = await fetch(`${apiBaseUrl}/test/seed-shoutout`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(shoutoutData),
            })

            if (!response.ok) {
              const errorBody = await response.text()
              throw new Error(`API /test/seed-shoutout call failed: ${errorBody}`)
            }
            return await response.json()
          } catch (error: any) {
            console.error(`[cy.task - seedShoutout] Error: ${error.message}`)
            throw new Error(`Error in seedShoutout task: ${error.message}`)
          }
        },
      })
      return config
    },
  },
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
    specPattern: "src/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/component.ts",
  },
  env: {
    apiBaseUrl: "http://localhost:8000/api",
  },
})
