Feature: RAI Response for Medicaid SPA package view
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then Click on Filter Button
        Then click on Type
        Then uncheck all of the type checkboxes
        Then click Medicaid SPA check box
        Then click on Type
        Then click on Status
        Then uncheck all of the status checkboxes
    # Need seed data / reset data update
    #     Then click RAI Issued checkbox
    #     Then Click on Filter Button

    # Scenario: validate response to RAI from package details page
    #     Then copy the ID from the link in the first row
    #     Then click the SPA ID link in the first row
    #     Then verify Respond to RAI action exists
    #     Then click on Respond to RAI package action
    #     Then verify the form is titled Formal Request for Additional Information Response
    #     Then Add file for RAI Response
    #     Then Click the Submit Button without waiting
    #     Then verify the modal pop-up is visible
    #     Then verify the title of the modal pop-up is Do you want to submit your official formal RAI response
    #     Then verify the detailed text in the modal contains you are submitting your official formal RAI Response to start the 90 day clock review process

    # Scenario: validate response to RAI from package dashboard
    #     Then copy the ID from the link in the first row
    #     Then click the actions button in row one
    #     Then verify the Respond to RAI button is displayed
    #     Then click the Respond to RAI button
    #     Then verify the form is titled Formal Request for Additional Information Response
    #     Then Add file for RAI Response
    #     Then Type Additonal Info Comments in new form
    #     Then Click the Submit Button without waiting
    #     Then verify the modal pop-up is visible
    #     Then verify the title of the modal pop-up is Do you want to submit your official formal RAI response
    #     Then verify the detailed text in the modal contains you are submitting your official formal RAI Response to start the 90 day clock review process
