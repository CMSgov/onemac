Feature: Package Dashboard - Filter by Formal RAI Received
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with "an Active" "CMS System Admin" user

    Scenario: Filter by Initial Submission Date - Date picker
        Then Click on Filter Button
        Then click on Initial Submission Date filter dropdown
        Then click on Initial Submission Date date picker filter
        Then click on quarter to date date picker button
        Then Click on Filter Button
        Then verify Initial Submission Date column one date is this quarter
        Then Click on My Account
        Then click the logout button

    Scenario: Filter by Formal RAI Received - Date picker
        Then Click on Filter Button
        Then click on Formal RAI Received dropdown filter
        Then click on Formal RAI Received date picker filter
        Then click on quarter to date date picker button
        Then Click on Filter Button
        Then Click on My Account
        Then click the logout button
    
    Scenario: Filter by Final Disposition - Date picker
        Then Click on Filter Button
        Then click on Final Disposition dropdown filter
        Then click on Final Disposition date picker filter
        Then click on quarter to date date picker button
        Then Click on Filter Button
        Then Click on My Account
        Then click the logout button

    Scenario: Filter by Latest Package Activity - Date picker
        Then Click on Filter Button
        Then click on Latest Package Activity dropdown filter
        Then click on Latest Package Activity date picker filter
        Then click on quarter to date date picker button
        Then Click on Filter Button
        Then verify Latest Package Activity column one date is this quarter
        Then Click on My Account
        Then click the logout button

    Scenario: Change Initial Submission Date filter. Verify no results. Then reset filter
        Then click on the Waivers tab
        Then Click on Filter Button
        Then click on Initial Submission Date filter dropdown
        Then click on Initial Submission Date date picker filter
        Then click on quarter to date date picker button
        Then click on Initial Submission Date filter dropdown
        Then click on reset button
        Then Click on Filter Button
        Then verify package row one exists
        Then Click on My Account
        Then click the logout button

    Scenario: Change Formal RAI Received date filter. Verify results. Then reset filter
        Then click on the Waivers tab
        Then Click on Filter Button
        Then click on Formal RAI Received dropdown filter
        Then click on Formal RAI Received date picker filter
        Then click on quarter to date date picker button
        Then click on Formal RAI Received dropdown filter
        Then click on reset button
        Then Click on Filter Button
        Then verify package row one exists
        Then Click on My Account
        Then click the logout button
    
    Scenario: Change Latest Package Activity date filter. Verify results. Then reset filter
        Then click on the Waivers tab
        Then Click on Filter Button
        Then click on Latest Package Activity dropdown filter
        Then click on Latest Package Activity date picker filter
        Then click on quarter to date date picker button
        Then click on Latest Package Activity filter dropdown
        Then click on reset button
        Then Click on Filter Button
        Then verify package row one exists
        Then Click on My Account
        Then click the logout button