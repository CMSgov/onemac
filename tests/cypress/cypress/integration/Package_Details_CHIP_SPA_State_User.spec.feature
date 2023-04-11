Feature: CHIP SPA State Details View - Card View with Actions 
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And Click on Filter Button
        And click on Type
        And uncheck all of the type checkboxes
        And click CHIP SPA check box
        And click on Type
        And click on Status
        And uncheck all of the status checkboxes

    Scenario: Screen Enhance - Approved SPA
        And click Approved checkbox
        And Click on Filter Button
        And click the SPA ID link in the first row
        And verify the package details page is visible
        And verify 2 action cards exist
        And verify the status on the card is "Approved"
        And verify there is not a 90th day date on the card
        And verify package actions header is visible
        And verify there are no package actions available
        And verify the details section exists
        And verify there is a Type header in the details section
        And verify a type containing SPA exists for the Type
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section
        And verify the Proposed Effective Date is a date formated like Mon dd yyyy
        And verify the attachments section exists
        And verify the download all button exists
        And verify the additional information section exists

    # Need seed data / reset data update
    # Scenario: Screen Enhance - Withdrawal Requested SPA
    #     And click the Withdrawal Requested checkbox
    #     And Click on Filter Button
    #     And click the SPA ID link in the first row
    #     And verify the package details page is visible
    #     And verify 2 action cards exist
    #     And verify the status on the card is "Withdrawal Requested"
    #     And verify package actions header is visible
    #     And verify there are no package actions available
    #     And verify the details section exists
    #     And verify there is a Type header in the details section
    #     And verify a type containing SPA exists for the Type
    #     And verify there is a State header in the details section
    #     And verify a state exists for the State
    #     And verify there is an Initial Submission Date header in the details section
    #     And verify a date exists for the Initial Submission Date
    #     And verify there is a Proposed Effective Date header in the details section
    #     And verify the attachments section exists
    #     And verify the download all button exists
    #     And verify the additional information section exists

    Scenario: Screen Enhance - Withdrawn SPA
        And click the Package Withdrawn checkbox
        And Click on Filter Button
        And click the SPA ID link in the first row
        And verify the package details page is visible
        And verify 2 action cards exist
        And verify the status on the card is "Withdrawn"
        And verify package actions header is visible
        And verify there are no package actions available
        And verify the details section exists
        And verify there is a Type header in the details section
        And verify a type containing SPA exists for the Type
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section
        And verify the attachments section exists
        And verify the download all button exists
        And verify the additional information section exists

    Scenario: Screen Enhance - Disapproved SPA
        And click Disapproved checkbox
        And Click on Filter Button
        And click the SPA ID link in the first row
        And verify the package details page is visible
        And verify 2 action cards exist
        And verify the status on the card is "Disapproved"
        And verify package actions header is visible
        And verify there are no package actions available
        And verify the details section exists
        And verify there is a Type header in the details section
        And verify a type containing SPA exists for the Type
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section
        And verify the attachments section exists
        And verify the download all button exists
        And verify the additional information section exists


    Scenario: Screen Enhance - Under Review SPA
        And click Under Review checkbox
        And Click on Filter Button
        And click the SPA ID link in the first row
        And verify the package details page is visible
        And verify 2 action cards exist
        And verify the status on the card is "Under Review"
        And verify package actions header is visible
        And verify withdraw package action exists
        And verify the details section exists
        And verify there is a Type header in the details section
        And verify a type containing SPA exists for the Type
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section
        And verify the attachments section exists
        And verify the download all button exists
        And verify the additional information section exists

    Scenario: Screen Enhance - Submitted SPA
        And click Submitted checkbox
        And Click on Filter Button
        And click the SPA ID link in the first row
        And verify the package details page is visible
        And verify 2 action cards exist
        And verify the status on the card is "Submitted"
        And verify package actions header is visible
        And verify there are no package actions available
        And verify the details section exists
        And verify there is a Type header in the details section
        And verify a type containing SPA exists for the Type
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section
        And verify the attachments section exists
        And verify the download all button exists
        And verify the additional information section exists

    Scenario: Screen Enhance - RAI Issued SPA
        And click RAI Issued checkbox
        And Click on Filter Button
        And click the SPA ID link in the first row
        And verify the package details page is visible
        And verify 2 action cards exist
        And verify the status on the card is "RAI Issued"
        And verify package actions header is visible
        And verify withdraw package action exists
        And verify Respond to RAI action exists
        And verify the package details page is visible
        And verify the details section exists
        And verify there is a Type header in the details section
        And verify a type containing SPA exists for the Type
        And verify there is a State header in the details section
        And verify a state exists for the State
        And verify there is an Initial Submission Date header in the details section
        And verify a date exists for the Initial Submission Date
        And verify there is a Proposed Effective Date header in the details section
        And verify the attachments section exists
        #And verify the download all button exists
        And verify the additional information section exists