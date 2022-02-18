Feature: OY2-11950 State should not be able to withdraw a package in OneMAC in Specific statuses

    Scenario: Demonstrate that withdraw a package is not available on Package Approved status
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And verify that the 3 dots next to Package Approved status is not clickable

    Scenario: Demonstrate that withdraw a package is not available on Package Disapproved status
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And verify that the 3 dots next to Package Disapproved status is not clickable

    Scenario: Demonstrate that withdraw a package is not available on Package Withdrawn status
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And verify that the 3 dots next to Package Withdrawn status is not clickable

    Scenario: Demonstrate that withdraw a package is not available on Waiver Terminated status
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And click on the Waivers tab
        And verify that the 3 dots next to Waiver Terminated status is not clickable

    Scenario: Demonstrate that withdraw a package is not available on Unsubmitted status
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And click on the Waivers tab
        And verify that the 3 dots next to Unsubmitted status is not clickable