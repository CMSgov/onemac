const myAccountDropDown = "#myAccountLink";
const manageProfileBTN = "#manageAccountLink";
//Element is Xpath use cy.xpath instead of cy.get
const userManagmentHeader = '//h1[contains(text(),"User Management")]';
const nameHeader = "#nameColHeader";
const stateHeader = "#stateColHeader";
const statusHeader = "#statusColHeader";
const roleHeader = "#roleColHeader";
const lastModifiedHeader = "#lastModifiedColHeader";
const modifiedByHeader = "#doneByNameColHeader";
//Element is Xpath use cy.xpath instead of cy.get
const homeTab = '//a[contains(text(),"Home")]';
const dashboardTab = "#dashboardLink";
//Element is Xpath use cy.xpath instead of cy.get
const FAQTab = '//a[contains(text(),"FAQ")]';
const actionsHeader = "#personnelActionsColHeader";

export class oneMacUserManagmentPage {
  clickMyAccountDropDown() {
    cy.get(myAccountDropDown).click();
  }
  clickmanageProfileBTN() {
    cy.get(manageProfileBTN).click();
  }

  verifyWeAreOnUserManagmentPage() {
    cy.url().should("include", "/usermanagement");
  }

  verifyUserManagmentHeaderIsDisplayed() {
    cy.xpath(userManagmentHeader).should("be.visible");
  }
  verifyNameHeaderIsDisplayed() {
    cy.get(nameHeader).should("be.visible");
  }
  verifyStateHeaderIsDisplayed() {
    cy.get(stateHeader).should("be.visible");
  }
  verifyStatusHeaderIsDisplayed() {
    cy.get(statusHeader).should("be.visible");
  }
  verifyRoleHeaderIsDisplayed() {
    cy.get(roleHeader).should("be.visible");
  }
  verifyLastModifiedHeaderIsDisplayed() {
    cy.get(lastModifiedHeader).should("be.visible");
  }
  verifyModifiedByHeaderIsDisplayed() {
    cy.get(modifiedByHeader).should("be.visible");
  }
  verifyHomeTabIsDisplayed() {
    cy.xpath(homeTab).should("be.visible");
  }
  verifyDashboardTabIsDisplayed() {
    cy.get(dashboardTab).should("be.visible");
  }
  verifyFAQTabIsDisplayed() {
    cy.xpath(FAQTab).should("be.visible");
  }
  verifyActionsHeaderIsDisplayed() {
    cy.get(actionsHeader).should("be.visible");
  }
}
export default oneMacUserManagmentPage;
