Feature: OY2_5868_Submission_List_Verification
    Scenario: Submission List Verification > Submit new SPA and Respond to SPA RAI
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission
        And Click on State Plan Amendment SPA
        And click on Medicaid SPA
        And type in SPA ID
        And Add file for CMS Form 179
        And Add file for SPA Pages
        And Type Additonal Information Comments
        And Click on Submit Button
        And verify submission Successful message
        # And verify SPA ID EXISTS
        # And verify submission date
        # And Verify submission type
        And click on spa Respond to RAI
        And Add file for RAI Response
        And Add Additional Comments
        And Click on Submit Button
        And verify submission Successful message after RAI
# And Verify submission typeRAI
# And Verify SPA RAI ID number matches Medical SPA ID number
# And verify submission date

