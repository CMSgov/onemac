Feature: OY2_8618_CMS_System_Admin
    Scenario: CMS System Admin user can see the text, profile information
        Given I am on Login Page
        When Clicking on Development Login
        When Login with "an Active" "CMS System Admin" user
        Then Click on User Management Tab
        Then i am on User Management Page
        Then Click on My Account
        Then Click on Manage Profile
        When I am on My Profile Page
        Then verify Profile Information is Displayed
        Then Full Name text is Displayed
        Then Actual Full Name is Displayed
        Then Role text is Displayed
        Then Actual Role is Displayed
        Then Email text is Displayed
        Then Actual Email is Displayed
        Then Phone Number text is Displayed
        Then Phone Number Add Button is Displayed