Feature: Waiver Package Details View: 1915 b Waiver Amendment for a State User
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on the Waivers tab
        Then Click on Filter Button
        Then click on Type
        Then uncheck all of the type checkboxes
        Then click 1915b Waiver Amendment check box
        Then click on Type
        Then click on Status
        Then uncheck all of the status checkboxes

    Scenario: Screen Enhance: 1915 b Waiver Amendment Details View - Submitted
        Then click Submitted checkbox
        Then click the Waiver Number link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "Submitted"
        Then verify package actions header is visible
        Then verify there are no package actions available
        Then verify the details section exists
        Then verify there is a Type header in the details section
        Then verify the type is 1915b Waiver Amendment
        Then verify there is a State header in the details section
        Then verify a state exists for the State
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify there is a Proposed Effective Date header in the details section
        Then verify subject is not visible in the details section
        Then verify description is not visible in the details section
        Then verify there is a CPOC header in the details section
        Then verify the CPOC has a value displayed in the details section
        Then verify Review Team SRT is not visible in the details section
        Then verify there is a Final Disposition Date header in the details section
        Then verify there is an Approved Effective Date in the details section
        #Then verify the Initial Submission caret button exists
        #Then expand the Initial Submission caret
        #Then verify the Initial Submission download all button exists
        #Then verify the additional information section exists

    Scenario: Screen Enhance: 1915 b Waiver Amendment Details View - Under Review
        Then click Under Review checkbox
        Then click the Waiver Number link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "Under Review"
        Then verify package actions header is visible
        Then verify withdraw package action exists
        Then verify the details section exists
        Then verify there is a Type header in the details section
        Then verify the type is 1915b Waiver Amendment
        Then verify there is a State header in the details section
        Then verify a state exists for the State
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify there is a Proposed Effective Date header in the details section
        Then verify subject is not visible in the details section
        Then verify description is not visible in the details section
        Then verify there is a CPOC header in the details section
        Then verify the CPOC has a value displayed in the details section
        Then verify Review Team SRT is not visible in the details section
        Then verify there is a Final Disposition Date header in the details section
        Then verify there is an Approved Effective Date in the details section
        #Then verify the Initial Submission caret button exists
        #Then expand the Initial Submission caret
        #Then verify the Initial Submission download all button exists
        #Then verify the additional information section exists

    Scenario: Screen Enhance: 1915 b Waiver Amendment Details View - RAI Issued
        Then click RAI Issued checkbox
        Then click the Waiver Number link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "RAI Issued"
        Then verify package actions header is visible
        Then verify withdraw package action exists
        Then verify Respond to RAI action exists
        Then verify the details section exists
        Then verify there is a Type header in the details section
        Then verify the type is 1915b Waiver Amendment
        Then verify there is a State header in the details section
        Then verify a state exists for the State
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify there is a Proposed Effective Date header in the details section
        Then verify subject is not visible in the details section
        Then verify description is not visible in the details section
        Then verify there is a CPOC header in the details section
        Then verify the CPOC has a value displayed in the details section
        Then verify Review Team SRT is not visible in the details section
        Then verify there is a Final Disposition Date header in the details section
        Then verify there is an Approved Effective Date in the details section
        #Then verify the Initial Submission caret button exists
        #Then expand the Initial Submission caret
        #Then verify the Initial Submission download all button exists
        #Then verify the additional information section exists

    Scenario: Screen Enhance: 1915 b Waiver Amendment Details View - Approved
        Then click Approved checkbox
        Then click the Waiver Number link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "Approved"
        Then verify package actions header is visible
        Then verify there are no package actions available
        Then verify the details section exists
        Then verify there is a Type header in the details section
        Then verify the type is 1915b Waiver Amendment
        Then verify there is a State header in the details section
        Then verify a state exists for the State
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify there is a Proposed Effective Date header in the details section
        Then verify subject is not visible in the details section
        Then verify description is not visible in the details section
        Then verify there is a CPOC header in the details section
        Then verify the CPOC has a value displayed in the details section
        Then verify Review Team SRT is not visible in the details section
        Then verify there is a Final Disposition Date header in the details section
        Then verify there is an Approved Effective Date in the details section
        Then verify the Proposed Effective Date is a date formatted like Mon dd yyyy
        #Then verify the Initial Submission caret button exists
        #Then expand the Initial Submission caret
        #Then verify the Initial Submission download all button exists
        #Then verify the additional information section exists

    Scenario: Screen Enhance: 1915 b Waiver Amendment Details View - Disapproved
        Then click Disapproved checkbox
        Then click the Waiver Number link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "Disapproved"
        Then verify package actions header is visible
        Then verify there are no package actions available
        Then verify the details section exists
        Then verify there is a Type header in the details section
        Then verify the type is 1915b Waiver Amendment
        Then verify there is a State header in the details section
        Then verify a state exists for the State
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify there is a Proposed Effective Date header in the details section
        Then verify subject is not visible in the details section
        Then verify description is not visible in the details section
        Then verify there is a CPOC header in the details section
        Then verify the CPOC has a value displayed in the details section
        Then verify Review Team SRT is not visible in the details section
        Then verify there is a Final Disposition Date header in the details section
        Then verify there is an Approved Effective Date in the details section
        #Then verify the Initial Submission caret button exists
        #Then expand the Initial Submission caret
        #Then verify the Initial Submission download all button exists
        #Then verify the additional information section exists

    Scenario: Screen Enhance: 1915 b Waiver Amendment Details View - Withdrawal Requested
        Then click the Withdrawal Requested checkbox
        Then click the Waiver Number link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "Withdrawal Requested"
        Then verify package actions header is visible
        Then verify there are no package actions available
        Then verify the details section exists
        Then verify there is a Type header in the details section
        Then verify the type is 1915b Waiver Amendment
        Then verify there is a State header in the details section
        Then verify a state exists for the State
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify there is a Proposed Effective Date header in the details section
        Then verify subject is not visible in the details section
        Then verify description is not visible in the details section
                Then verify there is a CPOC header in the details section
        Then verify the CPOC has a value displayed in the details section
        Then verify Review Team SRT is not visible in the details section
        Then verify there is a Final Disposition Date header in the details section
        Then verify there is an Approved Effective Date in the details section

    Scenario: Screen Enhance: 1915 b Waiver Amendment Details View - Package Withdrawn
        Then click the Package Withdrawn checkbox
        Then click the Waiver Number link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "Package Withdrawn"
        Then verify package actions header is visible
        Then verify there are no package actions available
        Then verify the details section exists
        Then verify there is a Type header in the details section
        Then verify the type is 1915b Waiver Amendment
        Then verify there is a State header in the details section
        Then verify a state exists for the State
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify there is a Proposed Effective Date header in the details section
        Then verify subject is not visible in the details section
        Then verify description is not visible in the details section
        Then verify there is a CPOC header in the details section
        Then verify the CPOC has a value displayed in the details section
        Then verify Review Team SRT is not visible in the details section
        Then verify there is a Final Disposition Date header in the details section
        Then verify there is an Approved Effective Date in the details section
        #Then verify the Initial Submission caret button exists
        #Then expand the Initial Submission caret
        #Then verify the Initial Submission download all button exists
        #Then verify the additional information section exists

    Scenario: Screen Enhance: 1915 b Waiver Amendment Details View - RAI Response Withdraw Enabled
        Then click the RAI Response Withdraw Enabled checkbox
        Then click the Waiver Number link in the first row
        Then verify the package details page is visible
        Then verify 2 action cards exist
        Then verify the status on the card is "RAI Response Withdraw Enabled"
        Then verify package actions header is visible
        Then verify withdraw package action exists
        Then verify Withdraw Formal RAI Response package action exists
        Then verify the details section exists
        Then verify there is a Type header in the details section
        Then verify the type is 1915b Waiver Amendment
        Then verify there is a State header in the details section
        Then verify a state exists for the State
        Then verify there is an Initial Submission Date header in the details section
        Then verify a date exists for the Initial Submission Date
        Then verify there is a Proposed Effective Date header in the details section
        Then verify subject is not visible in the details section
        Then verify description is not visible in the details section
        Then verify there is a CPOC header in the details section
        Then verify the CPOC has a value displayed in the details section
        Then verify Review Team SRT is not visible in the details section
        Then verify there is a Final Disposition Date header in the details section
        Then verify there is an Approved Effective Date in the details section
        #Then verify the Initial Submission caret button exists
        #Then expand the Initial Submission caret
        #Then verify the Initial Submission download all button exists
        #Then verify the additional information section exists

Scenario: Screen Enhance: 1915 b Waiver Amendment Details View - Withdraw RAI Response
        Then click the RAI Response Withdraw Enabled checkbox
        Then search for "MD-22204.R00.02"
        Then click the Waiver Number link in the first row
        Then verify the package details page is visible
        Then verify the status on the card is "RAI Response Withdraw Enabled"
        Then click Withdraw Formal RAI Response package action
        Then type "Automated test to withdraw the RAI Response." in additional info textarea
        Then Click the Submit Button without waiting
        Then verify Yes, withdraw response button exists
        Then click Yes, withdraw response button
        Then verify the success message is "Withdraw Formal RAI Response request has been submitted."
        Then verify the status on the card is "Formal RAI Response - Withdrawal Requested"
        Then verify package actions header is visible
        Then verify there are no package actions available
