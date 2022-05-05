Feature: OY2_4807_Validate_Waiver_Form_Logic
    Background: Reoccuring Steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with state submitter user
        Then click on New Submission
        And Click on Waiver Action

    Scenario: Validate Waiver Form Logic for New Waiver and 1915(c)
        And Click on Waiver Action under Waiver Type
        And Click on New Waiver under Action type
        And Click on All other 1915 b Waivers under Waiver Authority
        And type in invalid Waiver Number
        And verify error message is present on New Waiver Page
        And Return to dashboard Page

    Scenario: Validate Waiver Form Logic for New Waiver and All other
        And Click on Waiver Action under Waiver Type
        And Click on New Waiver under Action type
        And Click on All other 1915 b Waivers under Waiver Authority
        And type in invalid Waiver Number
        And Type "This is just a comment" in Summary Box
        And verify error message is present on New Waiver Page
        And Return to dashboard Page

    Scenario: Validate Waiver Form Logic for Waiver Amendment and 1915(b)
        And Click on Waiver Action under Waiver Type
        And Click on Waiver Amendment under Action type
        And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        And type in invalid Waiver Number
        And verify error message is present on New Waiver Page
        And Return to dashboard Page

    Scenario: Validate Waiver Form Logic for Waiver Amendment and All other
        And Click on Waiver Action under Waiver Type
        And Click on Waiver Amendment under Action type
        And Click on All other 1915 b Waivers under Waiver Authority
        And type in invalid Waiver Number
        And verify error message is present on New Waiver Page
        And Return to dashboard Page

    Scenario: Validate Waiver Form Logic for Waiver Renewal and 1915(b)
        And Click on Waiver Action under Waiver Type
        And Click on Request for waiver renewal from Action Type
        And Click on 1915 b 4 FFS Selective Contracting waivers under Waiver Authority
        And type in Existing Waiver Number
        And verify error message is present on New Waiver Page
        And Return to dashboard Page

    Scenario: Validate Waiver Form Logic for Waiver Renewal and All other
        And Click on Waiver Action under Waiver Type
        And Click on Request for waiver renewal from Action Type
        And Click on All other 1915 b Waivers under Waiver Authority
        And type in Existing Waiver Number
        And verify error message is present on New Waiver Page
        And Return to dashboard Page

    Scenario: Verify the Waiver Number format on Submit New Waiver Action
        And Click on Waiver Action under Waiver Type
        And Click on New Waiver under Action type
        And type in a correct Waiver Number with 4 characters
        And verify error message is not present on New Waiver Page
        And clear Waiver Number Input box
        And type in a correct Waiver Number with 5 characters
        And verify error message is not present on New Waiver Page
        And clear Waiver Number Input box
        And type in invalid Waiver Number
        And verify error message is present on New Waiver Page
        And Return to dashboard Page

    Scenario: Verify the Waiver Number format on Appendix K Form
        And Click on Appendix K Amendment
        And type in Waiver Number with 5 characters On Appendix K Amendment Page
        And verify error message is not present On Appendix K Amendment Page
        And clear Waiver Number Input box On Appendix K Amendment Page
        And type in invalid Waiver Number On Appendix K Amendment Page
        And verify that error message for incorrect Waiver Number is Displayed On Appendix K Amendment Page
        And Return to dashboard Page