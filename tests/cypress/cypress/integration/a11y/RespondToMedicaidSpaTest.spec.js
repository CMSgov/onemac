describe("Respond To Medicaid SPA Page 508 test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#devloginBtn").click();
    cy.get("#email").type("statesubmitter@nightwatch.test");
    cy.get("#password").type("Passw0rd!");
    cy.get("#loginDevUserBtn").click();
    cy.xpath(
      "//p[contains(text(),'Submit a new Medicaid & CHIP State Plan Amendments')]"
    ).click();
    cy.xpath("//h4[contains(text(),'Respond to Medicaid SPA RAI')]").click();
  });

  it("Check a11y on Respond to Medicaid SPA Page", () => {
    cy.checkA11yOfPage();
  });
});
