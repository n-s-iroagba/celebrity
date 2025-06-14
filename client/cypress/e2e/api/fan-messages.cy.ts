describe("Fan Messages API", () => {
  it("allows a celebrity to fetch messages from a chat they are part of", () => {
    const fanData = {
      email: "fan.for.celeb.test@example.com",
      password: "password123",
      role: "FAN" as const,
    }
    const celebrityData = {
      email: "celeb.fetches.messages@example.com",
      password: "password123",
      role: "CELEBRITY" as const,
    }
    const shoutoutData = {
      celebrityEmail: celebrityData.email,
      content: "Hello celebrity, from your fan for API test!",
      mediaType: "text" as const,
    }

    let seededEntities: any // To store results from seeding
    let chatId: number
    let messageId: number

    cy.seedUsersAndShoutouts({
      fan: fanData,
      celebrities: [celebrityData],
      shoutouts: [shoutoutData],
    })
      .then((results) => {
        seededEntities = results
        // Assuming the first shoutout is the one we're interested in
        expect(results.shoutouts.length).to.be.greaterThan(0)
        chatId = results.shoutouts[0].chatId
        messageId = results.shoutouts[0].messageId

        // Log in as the CELEBRITY
        return cy.loginViaApi(celebrityData.email, celebrityData.password)
      })
      .then(() => {
        // Token from loginViaApi is implicitly handled by apiRequest now
        // Celebrity fetches messages for the chat
        return cy.apiRequest({
          method: "GET",
          url: `/api/chats/${chatId}/messages`, // Assuming this is the endpoint
          failOnStatusCode: false,
        })
      })
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.be.an("array")
        expect(response.body.length).to.be.greaterThan(0)

        const foundMessage = response.body.find((msg: any) => msg.id === messageId)
        expect(foundMessage).to.not.be.undefined
        if (foundMessage) {
          expect(foundMessage.content).to.eq(shoutoutData.content)
          // The sender of this initial message is the fan.
          // Your API might return senderId (fan's user ID) or more detailed sender info.
          // Let's assume it returns a senderId that matches the fan's user ID.
          expect(foundMessage.senderId).to.eq(seededEntities.fan.user.id)
          expect(foundMessage.chatId).to.eq(chatId)
        }
      })
  })

  // Test case: Celebrity tries to fetch messages from a chat they are NOT part of (should fail)
  it("prevents a celebrity from fetching messages from a chat they are not part of", () => {
    const fan1Data = { email: "fan1.celebprivacy@example.com", role: "FAN" as const }
    const celeb1Data = { email: "celeb1.privacy@example.com", role: "CELEBRITY" as const }
    const shoutout1Data = { celebrityEmail: celeb1Data.email, content: "Message for Celeb 1" }

    const fan2Data = { email: "fan2.celebprivacy@example.com", role: "FAN" as const }
    const celeb2Data = { email: "celeb2.attacker@example.com", role: "CELEBRITY" as const } // This celeb will try to access celeb1's chat
    // No shoutout needed for celeb2 with fan2 for this specific test, but they need to exist.

    let chat1Id: number

    // Seed chat for Fan1 and Celeb1
    cy.seedUsersAndShoutouts({
      fan: fan1Data,
      celebrities: [celeb1Data],
      shoutouts: [shoutout1Data],
    })
      .then((results1) => {
        expect(results1.shoutouts.length).to.be.greaterThan(0)
        chat1Id = results1.shoutouts[0].chatId

        // Seed Celeb2 (the "attacker" or unauthorized celebrity)
        return cy.task("ensureUserInDb", {
          email: celeb2Data.email,
          password: "password123",
          role: celeb2Data.role,
          isVerified: true,
          whatsAppNumber: "0000000000",
        })
      })
      .then(() => {
        // Log in as Celeb2
        return cy.loginViaApi(celeb2Data.email, "password123")
      })
      .then(() => {
        // Celeb2 tries to fetch messages from Celeb1's chat (chat1Id)
        return cy.apiRequest({
          method: "GET",
          url: `/api/chats/${chat1Id}/messages`,
          failOnStatusCode: false, // Important for checking non-200 responses
        })
      })
      .then((response) => {
        // Expect a 403 Forbidden or 404 Not Found, depending on API implementation
        // A 404 is common to avoid revealing the existence of a resource.
        // A 403 is also acceptable if the resource existence isn't a secret.
        expect(response.status).to.be.oneOf([403, 404])
      })
  })
})
