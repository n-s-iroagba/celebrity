import { describe, beforeEach, it, expect } from "cypress"

// Assuming these interfaces are defined in commands.ts or a shared types file
// For brevity, I'm not redeclaring them here if they are in commands.ts
// interface SeededUser { id: number; email: string; role: string; }
// interface SeededMessage { id: number; content: string; }
// interface SeededChat { id: number; }
// interface SeededShoutout { chatId: number; messageId: number; content: string; celebrityEmail: string; }
// interface SeededDataResults { fan: { user: SeededUser }; celebrities: Array<{ user: SeededUser }>; shoutouts: Array<SeededShoutout>; }

describe("Fan Dashboard", () => {
  const testUser = {
    email: "verifiedfan@example.com",
    password: "password123",
    role: "FAN",
    whatsAppNumber: "1234567890",
    isVerified: true,
  }

  beforeEach(() => {
    // Ensure the user exists and is verified in the database before each test
    cy.task("ensureUserInDb", testUser).then((result) => {
      // console.log('Task ensureUserInDb result:', result);
    })

    // Now log in via API
    cy.loginViaApi(testUser.email, testUser.password)

    // Visit the fan dashboard page
    cy.visit("/fan/dashboard") // Adjust if your fan dashboard path is different
  })

  it("should display the fan dashboard with a welcome message", () => {
    // Check for a general dashboard heading
    cy.contains("h1", /Dashboard/i).should("be.visible") // Case-insensitive match for "Dashboard"

    // Check for a personalized welcome message
    // This assumes your dashboard displays something like "Welcome, user@example.com!"
    // You might need to adjust the selector and text based on your actual implementation.
    cy.contains(`Welcome, ${testUser.email}`, { matchCase: false }).should("be.visible")
    // Or, if the welcome message is in a specific element:
    // cy.get('[data-cy="welcome-message"]').should('contain.text', testUser.email);
  })

  it("should have a link/button to request a new shoutout and navigate correctly", () => {
    // Assume there's a button or link with this data-cy attribute
    cy.get('[data-cy="request-shoutout-button"]').should("be.visible").click()

    // Assert that the URL changes to the shoutout request page
    // Adjust '/shoutout/new' or '/search-celebrity' to your actual path
    cy.url().should("include", "/shoutout/new") // Or your relevant path
    cy.contains("h1", /Request a Shoutout/i).should("be.visible") // Or similar heading
  })

  it("should have a link to profile settings and navigate correctly", () => {
    // Assume there's a link with this data-cy attribute
    cy.get('[data-cy="profile-settings-link"]').should("be.visible").click()

    // Assert that the URL changes to the profile settings page
    // Adjust '/profile/settings' to your actual path
    cy.url().should("include", "/profile/settings")
    cy.contains("h1", /Profile Settings/i).should("be.visible") // Or similar heading
  })

  it("should display a section for shoutout history or existing requests", () => {
    // This test checks for the presence of a section.
    // More detailed tests would involve seeding shoutouts and verifying their display.
    cy.get('[data-cy="shoutout-history-section"]').should("be.visible")

    // You might also check for a title within this section
    cy.get('[data-cy="shoutout-history-section"]')
      .contains("h2", /My Shoutouts/i) // Or "Request History", etc.
      .should("be.visible")

    // If the list is initially empty, you might check for an "empty state" message
    // cy.get('[data-cy="shoutout-history-section"]').contains('You have no shoutout requests yet.').should('be.visible');
  })

  it("should have a logout button that logs the user out and redirects to login", () => {
    cy.get('[data-cy="logout-button"]').should("be.visible").click()

    // After logout, the user should typically be redirected to the login page
    cy.url().should("include", "/login")
    cy.contains("h1", /Login/i).should("be.visible") // Check for login page heading

    // Also, verify that the authToken is cleared from localStorage (or cookie)
    cy.window().its("localStorage.authToken").should("be.undefined") // Or .should('not.exist')
  })

  // New describe block for tests that require seeded data
  describe("with multiple seeded shoutout requests", () => {
    const fanData = {
      email: "superfan_nav@example.com", // Using a unique email for this test block
      password: "password123",
      role: "FAN" as const,
      isVerified: true,
    }
    const celebritiesData = [
      { email: "nav_celeb1@example.com", role: "CELEBRITY" as const, isVerified: true },
      { email: "nav_celeb2@example.com", role: "CELEBRITY" as const, isVerified: true },
    ]
    const shoutoutsData = [
      { celebrityEmail: celebritiesData[0].email, content: "Nav test: Click me for Celeb 1!" },
      { celebrityEmail: celebritiesData[1].email, content: "Nav test: No, click me for Celeb 2!" },
    ]

    let seededEntities: any // Use the actual SeededDataResults type here

    beforeEach(() => {
      cy.seedUsersAndShoutouts({
        fan: fanData,
        celebrities: celebritiesData,
        shoutouts: shoutoutsData,
      }).then((results) => {
        seededEntities = results
      })

      cy.loginViaApi(fanData.email, fanData.password)
      // No cy.visit() here initially, the test will navigate
    })

    it("should display all seeded shoutout requests in the history section on the dashboard", () => {
      cy.visit("/fan/dashboard")
      cy.get('[data-cy="shoutout-history-section"]').should("be.visible")

      cy.get('[data-cy="shoutout-history-section"]')
        .find('[data-cy="shoutout-item"]')
        .should("have.length", shoutoutsData.length)

      shoutoutsData.forEach((shoutout) => {
        cy.get('[data-cy="shoutout-history-section"]').contains(shoutout.content).should("be.visible")
      })
    })

    it("should navigate to a shoutout detail page and display its content", () => {
      // This test was from the previous step, kept for completeness
      cy.visit("/fan/dashboard") // Ensure we are on the dashboard first
      expect(seededEntities).to.not.be.undefined
      expect(seededEntities.shoutouts).to.have.length.greaterThan(0)

      const firstSeededShoutout = seededEntities.shoutouts[0]
      const shoutoutMessageId = firstSeededShoutout.messageId
      const shoutoutContent = firstSeededShoutout.content
      const expectedCelebrityEmail = firstSeededShoutout.celebrityEmail

      cy.visit(`/fan/shoutouts/${shoutoutMessageId}`)

      cy.url().should("include", `/fan/shoutouts/${shoutoutMessageId}`)
      cy.get('[data-cy="shoutout-detail-content"]').should("be.visible").and("contain.text", shoutoutContent)
      cy.get('[data-cy="shoutout-detail-celebrity-info"]')
        .should("be.visible")
        .and("contain.text", expectedCelebrityEmail)
      cy.get('[data-cy="shoutout-detail-status"]').should("be.visible").and("contain.text", "Pending")
    })

    it("should click on a shoutout item in the dashboard list and navigate to its detail page", () => {
      cy.visit("/fan/dashboard") // Start on the dashboard

      expect(seededEntities).to.not.be.undefined
      expect(seededEntities.shoutouts).to.have.length.greaterThan(0)

      // Let's target the second shoutout for this test to make it distinct
      const targetShoutoutIndex = 1
      const targetShoutout = seededEntities.shoutouts[targetShoutoutIndex]
      const targetMessageId = targetShoutout.messageId
      const targetContent = targetShoutout.content
      const targetCelebrityEmail = targetShoutout.celebrityEmail

      // Find the specific shoutout item in the list by its content and click it.
      // This assumes the content text itself is within the clickable area,
      // or that `data-cy="shoutout-item"` is the clickable element.
      cy.get('[data-cy="shoutout-history-section"]')
        .find(`[data-cy="shoutout-item"]:contains("${targetContent}")`) // More specific: find item containing the text
        .should("be.visible")
        .click() // Click the item

      // Alternative: If there's a specific "View Details" button within each item:
      // cy.get(`[data-cy="shoutout-item"]:contains("${targetContent}")`)
      //   .find('[data-cy="view-shoutout-details-button"]')
      //   .click();

      // Assert navigation to the correct detail page URL
      cy.url().should("include", `/fan/shoutouts/${targetMessageId}`)

      // Assert content on the detail page
      cy.get('[data-cy="shoutout-detail-content"]').should("be.visible").and("contain.text", targetContent)
      cy.get('[data-cy="shoutout-detail-celebrity-info"]')
        .should("be.visible")
        .and("contain.text", targetCelebrityEmail)
      cy.get('[data-cy="shoutout-detail-status"]').should("be.visible").and("contain.text", "Pending")
    })
  })
})
