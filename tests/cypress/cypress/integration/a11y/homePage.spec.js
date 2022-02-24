describe("HomePage 508 test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#devloginBtn");
    cy.get("#email").type("statesubmitter@nightwatch.test");
    cy.get("#password").type("Passw0rd!");
    cy.get("#loginDevUserBtn").click();
  });

  it("Check a11y on Home Page", () => {
    cy.checkA11yOfPage();
  });
});
