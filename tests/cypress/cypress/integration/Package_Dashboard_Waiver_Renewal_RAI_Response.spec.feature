Feature: RAI Response for Renewal Waiver - Package View

    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And click on the Waivers tab
        And Click on Filter Button
        And click on Status
        And uncheck all of the status checkboxes
        And click RAI Issued checkbox
        And click on Status
        And click on Type
        And uncheck all of the type checkboxes
        And click 1915b Waiver Renewal check box
        And Click on Filter Button

    Scenario: validate response to RAI from package dashboard
        And click the actions button in row one
        And click the Respond to RAI button
        And verify the package ID is prefilled in the form
        And Add file for Waiver RAI Response
        And Click the Submit Button without waiting
        And verify the modal pop-up is visible
        And verify the title of the modal pop-up is Do you want to submit your official formal RAI response
        And verify the detailed text in the modal contains you are submitting your official formal RAI Response to start the 90 day clock review process
        And click modal cancel button
        And verify the modal pop-up is not visible

    Scenario: validate response to RAI from package details page
        And click the Waiver Number link in the first row
        And click on Respond to RAI package action
        And verify the package ID is prefilled in the form
        And Add file for Waiver RAI Response
        And Click the Submit Button without waiting
        And verify the modal pop-up is visible
        And verify the title of the modal pop-up is Do you want to submit your official formal RAI response
        And verify the detailed text in the modal contains you are submitting your official formal RAI Response to start the 90 day clock review process
        And click modal cancel button
        And verify the modal pop-up is not visible