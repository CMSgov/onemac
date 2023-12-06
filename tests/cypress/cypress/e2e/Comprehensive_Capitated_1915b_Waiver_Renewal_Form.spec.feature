Feature: Waiver Renewal in Package Dashboard
    Background: Reoccurring steps
        Given I am on Login Page
        When Clicking on Development Login
        When Login with "an Active" "State Submitter" user
        Then click on New Submission
        Then Click on Waiver Action
        Then click on 1915b Waiver Actions
        Then click on 1915b Comprehensive Capitated Waiver Authority

    Scenario: Screen Enhance - Waiver Renewal
        Then verify 1915b Comprehensive Capitated Renewal Waiver is a clickable option
        Then click on 1915b Comprehensive Capitated Renewal Waiver
        Then verify user is on new waiver renewal page
        Then verify the attachment info descriptiion
        Then verify the attachment info link is for "1915b Waiver"

    Scenario: Existing Waiver Number Input Field format
        Then click on 1915b Comprehensive Capitated Renewal Waiver
        Then verify Waiver Authority contains "All other 1915(b) Waivers"
        Then verify the "Existing Waiver Number to Renew" hint text is "Enter the existing waiver number in the format it was approved, using a dash after the two character state abbreviation."
        Then into "Existing Waiver Number to Renew" type "MD"
        Then into "1915(b) Waiver Renewal Number" type "MD-5533.R02.00"
        Then into "1915(b) Waiver Renewal Number" type "MD-5533.R02.00"
        Then set "Proposed Effective Date of 1915(b) Waiver Renewal" to 3 months from today
        Then attach "excel.xlsx" file to attachment 1
        Then attach "excel.xlsx" file to attachment 2
        Then verify the "Existing Waiver Number to Renew" error message is "The waiver number entered does not appear to match our records. Please enter an approved initial or renewal waiver number, using a dash after the two character state abbreviation."
        Then verify the submit button is disabled
        Then clear "Existing Waiver Number to Renew" input field
        Then into "Existing Waiver Number to Renew" type "MD-2200.R00.00"
        Then verify Parent ID error message is not present
        Then verify the submit button is not disabled
        Then clear "Existing Waiver Number to Renew" input field
        Then into "Existing Waiver Number to Renew" type "MD"
        Then verify the "Existing Waiver Number to Renew" error message is "The waiver number entered does not appear to match our records. Please enter an approved initial or renewal waiver number, using a dash after the two character state abbreviation."
        Then verify the submit button is disabled
        Then clear "Existing Waiver Number to Renew" input field

    Scenario: 1915b Waiver Renewal Number Input Field format
        Then click on 1915b Comprehensive Capitated Renewal Waiver
        Then verify Waiver Authority contains "All other 1915(b) Waivers"
        Then into "Existing Waiver Number to Renew" type "MD-2200.R00.00"
        Then into "1915(b) Waiver Renewal Number" type "MD"
        Then set "Proposed Effective Date of 1915(b) Waiver Renewal" to 3 months from today
        Then attach "excel.xlsx" file to attachment 1
        Then attach "excel.xlsx" file to attachment 2
        Then verify the "1915(b) Waiver Renewal Number" error message is "The 1915(b) Waiver Renewal Number must be in the format of SS-####.R##.00 or SS-#####.R##.00"
        Then verify the "1915(b) Waiver Renewal Number" error message line 2 is "For renewals, the “R##” starts with ‘01’ and ascends."
        Then verify the submit button is disabled
        Then clear "1915(b) Waiver Renewal Number" input field
        Then into "1915(b) Waiver Renewal Number" type "MD-5533.R02.00"
        Then verify ID error message is not present
        Then verify the submit button is not disabled
        Then clear "1915(b) Waiver Renewal Number" input field
        Then into "1915(b) Waiver Renewal Number" type "MD"
        Then verify the "1915(b) Waiver Renewal Number" error message is "The 1915(b) Waiver Renewal Number must be in the format of SS-####.R##.00 or SS-#####.R##.00"
        Then verify the "1915(b) Waiver Renewal Number" error message line 2 is "For renewals, the “R##” starts with ‘01’ and ascends."
        Then verify the submit button is disabled
        Then clear "1915(b) Waiver Renewal Number" input field

    Scenario: Verify pre-print and spreadsheet are both required
        Then click on 1915b Comprehensive Capitated Renewal Waiver
        Then verify Waiver Authority contains "All other 1915(b) Waivers"
        Then into "Existing Waiver Number to Renew" type "MD-2200.R00.00"
        Then into "1915(b) Waiver Renewal Number" type "MD-5533.R02.00"
        Then set "Proposed Effective Date of 1915(b) Waiver Renewal" to 3 months from today
        Then attach "excel.xlsx" file to attachment 2
        Then verify the submit button is disabled
        #Then Remove file for 1915b Comprehensive Capitated Waiver Cost Effectiveness Spreadsheets
        Then attach "excel.xlsx" file to attachment 1
        Then verify the submit button is disabled
        Then attach "excel.xlsx" file to attachment 2
        Then verify the submit button is not disabled

    Scenario: create waiver renewal from package dashboard and search it
        Then click on 1915b Comprehensive Capitated Renewal Waiver
        Then verify Waiver Authority contains "All other 1915(b) Waivers"
        Then into "Existing Waiver Number to Renew" type "MD-2200.R00.00"
        Then into "1915(b) Waiver Renewal Number" type "MD-5533.R03.00"
        Then set "Proposed Effective Date of 1915(b) Waiver Renewal" to 3 months from today
        Then attach "excel.xlsx" file to attachment 1
        Then attach "excel.xlsx" file to attachment 2
        Then into "Additional Information" type "This is just a test."
        Then Click on Submit Button
        Then verify submission successful message in the alert bar
        Then verify the Waivers tab is selected
        Then search for new waiver renewal number "3"
        Then verify id number in the first row matches new waiver renewal number "3"