describe("Login Functionality", () => {
  beforeEach(() => {
    // This hook is now cleaner. It could be used for things like
    // seeding the database before each test.
    // cy.task('db:seed'); // Example for the future
  })

  it("should allow a fan to log in successfully with valid credentials", () => {
    // Use the custom command to perform the login action
    cy.login("testfan@example.com", "password123")

    // The assertion remains in the test, as it's specific to this test case.
    // The command handles the "how", the test handles the "what".
    cy.url().should("not.include", "/login")
    cy.url().should("include", "/") // Or your fan dashboard URL
    cy.contains("Welcome").should("be.visible") // Example assertion
  })
})
