const SpaIDInput = "#transmittalNumber";
const additionalInformationCommentBox = "#field_2";
const submitBTN = "#form-submission-button";
const SPAIDErrorMessage = "#transmittalNumberStatusMsg";
const cancelBTN = "#form-cancel-button";
const warningText = "//p[@class='submission-message']";
//Element is Xpath use cy.xpath instead of cy.get
const stayOnPageBtn = "//button[contains(text(),'Stay on Page')]";
//Element is Xpath use cy.xpath instead of cy.get
const leaveAnywayBtn = "//button[contains(text(),'Leave Anyway')]";
const uploadedFile =
  "div.header-and-content:nth-child(1) div.form-container div.upload-card:nth-child(4) div.uploader tbody:nth-child(1) tr:nth-child(1) td:nth-child(3) div.uploader-file-items > span:nth-child(1)";
const uploadedSpaFile =
  "div.header-and-content:nth-child(1) div.form-container div.upload-card:nth-child(4) div.uploader tbody:nth-child(1) tr:nth-child(2) td:nth-child(3) div.uploader-file-items > span:nth-child(1)";
const SPAPagesMainElement =
  "div.header-and-content:nth-child(1) div.form-container div.upload-card:nth-child(4) div.uploader tbody:nth-child(1) tr:nth-child(2)";

const deleteForm179File = "//tbody/tr[1]/td[3]/div[1]/button[1]/*[1]";
const deleteSpaPagesFile = "//tbody/tr[2]/td[3]/div[1]/button[1]/*[1]";

//Element is Xpath use cy.xpath instead of cy.get
const CMSForm179AddFileBTN =
  "div.header-and-content:nth-child(1) div.form-container div.upload-card:nth-child(4) div.uploader table:nth-child(1) tbody:nth-child(1) tr:nth-child(1) td.uploader-input-cell:nth-child(2) > label.uploader-input-label-active";
const CMSForm179AddFileUpload = "#uploader-input-0";
//Element is Xpath use cy.xpath instead of cy.get
const SPAPagesAddFileBTN =
  "div.header-and-content:nth-child(1) div.form-container div.upload-card:nth-child(4) div.uploader table:nth-child(1) tbody:nth-child(1) tr:nth-child(2) td.uploader-input-cell:nth-child(2) > label.uploader-input-label-active";
const SPAPAgesAddFileUpload = "#uploader-input-1";
const dashboardTabBTN = "#dashboardLink";
const whatIsMySPAIDLink =
  "//body/reference[1]/div[1]/div[1]/div[4]/div[2]/form[1]/div[1]/div[1]/div[1]/div[2]/a[1]";
const page = "//div[@class='dashboard-container']";

export class oneMacSubmitNewMedicaidSPAPage {
  inputSpaID(s) {
    cy.get(SpaIDInput).type(s);
  }

  uploadCMSForm179AddFile() {
    cy.get(CMSForm179AddFileBTN).click();
    const filePath = "/files/15MB.pdf";
    cy.get(CMSForm179AddFileUpload).attachFile(filePath);
  }

  addFileForForm179(fileName) {
    cy.get(CMSForm179AddFileBTN).click();
    const filePath = "/files/";
    cy.get(CMSForm179AddFileUpload).attachFile(filePath + fileName);
  }

  verifyFileAddedForForm179(fileName) {
    cy.get(uploadedFile).contains(fileName);
  }

  verifyFileNotAddedForForm179(fileName) {
    cy.get(uploadedFile).should("not.exist");
  }

  deleteFileFromForm179() {
    cy.xpath(deleteForm179File).click();
    cy.get(uploadedFile).should("not.exist");
  }

  uploadSPAPagesAddFile() {
    cy.get(SPAPagesAddFileBTN).click();
    const filePath = "/files/adobe.pdf";
    cy.get(SPAPAgesAddFileUpload).attachFile(filePath);
  }

  addFilesToSpaPages(fileName) {
    cy.get(SPAPagesAddFileBTN).click();
    const filePath = "/files/";
    cy.get(SPAPAgesAddFileUpload).attachFile(filePath + fileName);
  }

  verifyFileAddedForSpaPages(fileName) {
    cy.get(SPAPAgesAddFileUpload).contains(fileName);
  }

  verifyFileNameExistsInSpaPages(fileName) {
    cy.get(SPAPagesMainElement).contains(fileName);
  }

  addNoFilesToSpaPages() {
    cy.get(SPAPagesAddFileBTN).click();
  }

  verifyNoFilesAttachedToSpaPages() {
    cy.get(SPAPagesMainElement).should("not.exist");
  }

  AdditionalInformationTypeComment(s) {
    cy.get(additionalInformationCommentBox).type(s);
  }

  clicksubmitBTN() {
    cy.get(submitBTN).click();
    cy.wait(8000);
  }
  verifySubmitBtnExists() {
    cy.get(submitBTN).scrollIntoView().should("be.visible");
  }
  verifyCancelBtnExists() {
    cy.get(cancelBTN).scrollIntoView().should("be.visible");
  }
  clickCancelBtn() {
    cy.get(cancelBTN).scrollIntoView().click();
  }
  clickStayOnPageBtn() {
    cy.xpath(stayOnPageBtn).click();
  }
  clickLeaveAnywayBtn() {
    cy.xpath(leaveAnywayBtn).click();
  }
  verifySubmissionWarningTextIsVisible() {
    cy.xpath(warningText).scrollIntoView().should("be.visible");
  }
  verifySubmissionWarningText() {
    cy.xpath(warningText)
      .scrollIntoView()
      .contains("Once you submit this form");
    cy.xpath(warningText)
      .scrollIntoView()
      .contains("you will lose your progress on this form.");
  }
  verifySPAIDErrorMessageIsNotDisplayed() {
    cy.get(SPAIDErrorMessage).should("not.exist");
  }

  clearSPAIDInputBox() {
    cy.get(SpaIDInput).clear();
  }

  clickOnDashboardTab() {
    cy.get(dashboardTabBTN).click();
  }

  typeIncorrectSPAIDAndFormat() {
    cy.get(SpaIDInput).type("MD-DD-DDDD");
  }

  verifySPAIDErrorMessageIsDisplayed() {
    cy.get(SPAIDErrorMessage).should("be.visible");
  }
  clickWhatIsMySPAIDLink() {
    cy.xpath(whatIsMySPAIDLink)
      .invoke("attr", "href")
      .then((href) => {
        cy.visit(href);
      });
  }
}
export default oneMacSubmitNewMedicaidSPAPage;
