const EmailInput = "#email";
const PasswordInput = "#password";
const LoginBtn = "#loginDevUserBtn";

export class oneMacDevLoginPage {
  loginAsStateSubmiiter() {
    cy.get(EmailInput).type("statesubmitter@nightwatch.test");
    cy.get(PasswordInput).type("Passw0rd!");
    cy.get(LoginBtn).click();
  }

  loginAsCMSRoleApprover() {
    cy.get(EmailInput).type("cmsapprover@nightwatch.test");
    cy.get(PasswordInput).type("Passw0rd!");
    cy.get(LoginBtn).click();
  }

  loginAsCMSSystemAdmin() {
    cy.get(EmailInput).type("systemadmin@nightwatch.test");
    cy.get(PasswordInput).type("Passw0rd!");
    cy.get(LoginBtn).click();
  }

  loginAsHelpDeskUser() {
    cy.get(EmailInput).type("helpdesk@nightwatch.test");
    cy.get(PasswordInput).type("Passw0rd!");
    cy.get(LoginBtn).click();
  }
}
export default oneMacDevLoginPage;
