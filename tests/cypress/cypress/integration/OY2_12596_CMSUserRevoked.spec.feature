Feature: OY2_12596_CMSUserRevoked
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with cms role approver Revoked

    Scenario: Screen Enhance - Revoked CMS user can see the text and profile information
        Then i am on Dashboard Page
        Then Click on My Account
        Then Click on Manage Profile
        When I am on My Profile Page
        And verify Profile Information is Displayed
        And Full Name text is Displayed
        And Actual Full Name is Displayed
        And Role text is Displayed
        And Actual Role is Displayed
        And Email text is Displayed
        And Actual Email is Displayed
        And Phone Number text is Displayed
        And Phone Number Add Button is Displayed
        And Status text is not displayed

    Scenario: Screen Enhance - Revoked CMS user can request CMS Role Approver
        Then Click on My Account
        And verify that Request a Role Change button exists
        And click on Request a Role Change button
        And verify Select the role for which you are registering is visible
        And verify the CMS Role Approver role is available