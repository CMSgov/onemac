Feature: Helpdesk User

    Scenario: Verify that there are Dashboard and User Management tabs
        Given I am on Login Page
        When Clicking on Development Login
        When Login with "an Active" "Help Desk" user
        Then i am on Dashboard Page
        Then verify the SPAs tab is selected
        Then verify Export to Excel CSV is Displayed
        Then verify IDNumber column exists
        Then verify type column exists
        Then verify state column does not exist
        Then verify submitted by column exists
        Then Click on User Management Tab
        Then I am on the User Management Page
        Then verify User Management is Displayed
        Then verify Export to Excel CSV is Displayed
        Then verify Name is Displayed
        Then verify State is Displayed
        Then verify Status is Displayed
        Then verify Role is Displayed
        Then verify Last Modified is Displayed
        Then verify Modified By is Displayed