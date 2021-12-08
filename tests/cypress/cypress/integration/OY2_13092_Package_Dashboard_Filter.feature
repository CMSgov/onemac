Feature: OY2-13092 Package Dashboard - Filter
    Scenario: Screen enhancement
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And Verify Filter button exists
        And Click on Filter Button
        And verify Filter By Exists
        And verify Close Exists
        And verify Type Exists
        And verify Status Exists
        And verify reset Exists

    Scenario: demonstrate that all options match column header and all types of Status columns in the filter
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And Click on Filter Button
        And click on Type
        And verify 1915b waiver exists
        And verify CHIP SPA Exists
        And verify Medicaid SPA Exists
        And click on Status
        And verify package in review exists
        And verify sparai submitted exists

    Scenario: deselect all and verify error message, then select one and verify it exists
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And Click on Filter Button
        And click on Type
        And click 1915b waiver check box
        And click CHIP SPA check box
        And click Medicaid SPA check box
        And verify Error message displayed should be No Results Found
        And verify Error message details is displayed
        And click Medicaid SPA check box


    Scenario: verify one exists, deselct selection then verify error message
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        And click on Packages
        And Click on Filter Button
        And click on Type
        And click 1915b waiver check box
        And click CHIP SPA check box
        And click Medicaid SPA check box
        And verify Error message displayed should be No Results Found
        And verify Error message details is displayed
        And click Medicaid SPA check box
        And click Medicaid SPA check box
        And verify Error message displayed should be No Results Found
        And verify Error message details is displayed