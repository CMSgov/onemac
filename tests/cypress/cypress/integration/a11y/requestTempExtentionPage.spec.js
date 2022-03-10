describe("Request Temporary Extention Page 508 test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#devloginBtn").click();
    cy.get("#email").type("statesubmitter@nightwatch.test");
    cy.get("#password").type("Passw0rd!");
    cy.get("#loginDevUserBtn").click();
    cy.xpath("//a[@id='new-submission-button']").click();
    cy.xpath("//h4[contains(text(),'Waiver Action')]").click();
    cy.xpath("//h4[contains(text(),'Request Temporary Extension')]").click();
  });

  it("Check a11y on Request Temporary Extention Page", () => {
    cy.checkA11yOfPage();
  });
});
