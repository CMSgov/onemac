const pageHeader =
  "//h1[contains(text(),'Formal Request for Additional Information Response')]";
const backArrow = "#back-button";
//Element is Xpath use cy.xpath instead of cy.get
const leaveAnywaysBtn = "//button[text()='Leave Anyway']";
const yesSubmitBtn = "//button[text()='Yes, Submit']";
const prepopulatedWaiverNumber =
  "//h3[text()='Waiver Number']/following-sibling::div";
const prepopulatedWaiverAmendmentNumber =
  "//h3[text()='Waiver Amendment Number']/following-sibling::div";
const modalContainer = "#react-aria-modal-dialog";
const modalTitle = "#dialog-title";
const modalText = "#dialog-content";

export class oneMacRespondToRAIPage {
  verifyPageHeader() {
    cy.xpath(pageHeader).should("be.visible");
  }

  verifyModalContainerExists() {
    cy.get(modalContainer).should("be.visible");
  }
  verifyModalTitleIs(s) {
    cy.get(modalTitle).contains(s);
  }
  verifyModalTextIs(s) {
    cy.get(modalText).contains(s);
  }

  clickBackArrow() {
    cy.get(backArrow).click();
  }

  clickLeaveAnyway() {
    cy.xpath(leaveAnywaysBtn).click();
  }

  clickYesSubmitBTN() {
    cy.xpath(yesSubmitBtn).click();
    cy.wait(8000);
  }
  verifyWaiverNumberMatchesID(s) {
    cy.xpath(prepopulatedWaiverNumber).should("have.text", s);
  }
  verifyAppKMatchesID(s) {
    cy.xpath(prepopulatedWaiverAmendmentNumber).should("have.text", s);
  }
}
export default oneMacRespondToRAIPage;
