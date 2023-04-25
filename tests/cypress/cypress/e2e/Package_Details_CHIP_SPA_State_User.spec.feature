Feature: CHIP SPA State Details View - Card View with Actions 
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then Click on Filter Button
        Then click on Type
        Then uncheck all of the type checkboxes
        Then click CHIP SPA check box
        Then click on Type
        Then click on Status
        Then uncheck all of the status checkboxes

    Scenario: Screen Enhance - Approved SPA
        Then click Approved checkbox
        Then Click on Filter Button
        Then click the SPA ID link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "Approved"
        Then verify there is not a 90th day date on the card
        Then verify package actions header is visible
        Then verify there are no package actions available
        Then verify the details section exists
        Then verify there is a Type header in the details section
        Then verify a type containing SPA exists for the Type
        Then verify there is a State header in the details section
        Then verify a state exists for the State
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify there is a Proposed Effective Date header in the details section
        Then verify the Proposed Effective Date is a date formated like Mon dd yyyy
        Then verify the attachments section exists
        Then verify the download all button exists
        Then verify the additional information section exists

    # Need seed data / reset data update
    # Scenario: Screen Enhance - Withdrawal Requested SPA
    #     Then click the Withdrawal Requested checkbox
    #     Then Click on Filter Button
    #     Then click the SPA ID link in the first row
    #     Then verify the package details page is visible
    #     Then verify 2 action cards exist
    #     Then verify the status on the card is "Withdrawal Requested"
    #     Then verify package actions header is visible
    #     Then verify there are no package actions available
    #     Then verify the details section exists
    #     Then verify there is a Type header in the details section
    #     Then verify a type containing SPA exists for the Type
    #     Then verify there is a State header in the details section
    #     Then verify a state exists for the State
    #     Then verify there is an Initial Submission Date header in the details section
    #     Then verify a date exists for the Initial Submission Date
    #     Then verify there is a Proposed Effective Date header in the details section
    #     Then verify the attachments section exists
    #     Then verify the download all button exists
    #     Then verify the additional information section exists

    Scenario: Screen Enhance - Withdrawn SPA
        Then click the Package Withdrawn checkbox
        Then Click on Filter Button
        Then click the SPA ID link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "Withdrawn"
        Then verify package actions header is visible
        Then verify there are no package actions available
        Then verify the details section exists
        Then verify there is a Type header in the details section
        Then verify a type containing SPA exists for the Type
        Then verify there is a State header in the details section
        Then verify a state exists for the State
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify there is a Proposed Effective Date header in the details section
        Then verify the attachments section exists
        Then verify the download all button exists
        Then verify the additional information section exists

    Scenario: Screen Enhance - Disapproved SPA
        Then click Disapproved checkbox
        Then Click on Filter Button
        Then click the SPA ID link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "Disapproved"
        Then verify package actions header is visible
        Then verify there are no package actions available
        Then verify the details section exists
        Then verify there is a Type header in the details section
        Then verify a type containing SPA exists for the Type
        Then verify there is a State header in the details section
        Then verify a state exists for the State
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify there is a Proposed Effective Date header in the details section
        Then verify the attachments section exists
        Then verify the download all button exists
        Then verify the additional information section exists


    Scenario: Screen Enhance - Under Review SPA
        Then click Under Review checkbox
        Then Click on Filter Button
        Then click the SPA ID link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "Under Review"
        Then verify package actions header is visible
        Then verify withdraw package action exists
        Then verify the details section exists
        Then verify there is a Type header in the details section
        Then verify a type containing SPA exists for the Type
        Then verify there is a State header in the details section
        Then verify a state exists for the State
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify there is a Proposed Effective Date header in the details section
        Then verify the attachments section exists
        Then verify the download all button exists
        Then verify the additional information section exists

    Scenario: Screen Enhance - Submitted SPA
        Then click Submitted checkbox
        Then Click on Filter Button
        Then click the SPA ID link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "Submitted"
        Then verify package actions header is visible
        Then verify there are no package actions available
        Then verify the details section exists
        Then verify there is a Type header in the details section
        Then verify a type containing SPA exists for the Type
        Then verify there is a State header in the details section
        Then verify a state exists for the State
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify there is a Proposed Effective Date header in the details section
        Then verify the attachments section exists
        Then verify the download all button exists
        Then verify the additional information section exists

    Scenario: Screen Enhance - RAI Issued SPA
        Then click RAI Issued checkbox
        Then Click on Filter Button
        Then click the SPA ID link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "RAI Issued"
        Then verify package actions header is visible
        Then verify withdraw package action exists
        Then verify Respond to RAI action exists
        Then verify the package details page is visible
        Then verify the details section exists
        Then verify there is a Type header in the details section
        Then verify a type containing SPA exists for the Type
        Then verify there is a State header in the details section
        Then verify a state exists for the State
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify there is a Proposed Effective Date header in the details section
        Then verify the attachments section exists
        #Then verify the download all button exists
        Then verify the additional information section exists