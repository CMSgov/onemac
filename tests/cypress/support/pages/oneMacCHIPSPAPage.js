const SPAIDInputBox = "#transmittalNumber";
const errorMessageSPAID = "#transmittalNumberStatusMsg";
//Element is Xpath use cy.xpath instead of cy.get
const addFileBTNCurrentStatePlan = "//tbody/tr[1]/td[2]/label[1]";
const addFileBTNCurrentStatePlanInnerBTN = "#uploader-input-0";
//Element is Xpath use cy.xpath instead of cy.get
const addFileBTNCoverLetter = "//tbody/tr[3]/td[2]/label[1]";
const addFileBTNCoverLetterInnerBTN = "#uploader-input-2";
//Element is Xpath use cy.xpath instead of cy.get
const addFileBTNAmmendedStatePlanLanguage = "//tbody/tr[2]/td[2]/label[1]";
const addFileBTNAmmendedStatePlanLanguageInnerBTN = "#uploader-input-1";

export class oneMacCHIPSPAPage {
  inputSpaID(s) {
    cy.get(SPAIDInputBox).type(s);
  }

  verifyErrorMessageIsNotDisplayed() {
    cy.get(errorMessageSPAID).should("not.exist");
  }

  clearSPAIDInputBox() {
    cy.get(SPAIDInputBox).clear();
  }

  inputIncorrectSPAIDFormat() {
    cy.get(SPAIDInputBox).type("MD-DD-DDDD");
  }

  verifyErrorMessageIsDisplayed() {
    cy.get(errorMessageSPAID).should("be.visible");
  }

  uploadCurrentStatePlanFile() {
    cy.xpath(addFileBTNCurrentStatePlan).click();
    const filePath = "/files/picture.jpg";
    cy.get(addFileBTNCurrentStatePlanInnerBTN).attachFile(filePath);
  }

  uploadCoverLetterFile() {
    cy.xpath(addFileBTNCoverLetter).click();
    const filePath = "/files/adobe.pdf";
    cy.get(addFileBTNCoverLetterInnerBTN).attachFile(filePath);
  }

  uploadAmendedStatePlanLanguageFile() {
    cy.xpath(addFileBTNAmmendedStatePlanLanguage).click();
    const filePath = "/files/adobe.pdf";
    cy.get(addFileBTNAmmendedStatePlanLanguageInnerBTN).attachFile(filePath);
  }
}
export default oneMacCHIPSPAPage;
