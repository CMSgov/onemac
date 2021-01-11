import { territoryList } from "../libs/territoryLib";

/**
 * Validate SPA Id Transmittal Number Format
 * @return
 *
 */
export function validateSpaId(spaId) {

    let errorMessage = undefined
    let SpaTransmittalNumberFormatErrorMessage = "SS-YY-NNNN or SS-YY-NNNN-xxxx"
    let RegexFormatString = "(^[A-Z]{2}-[0-9]{2}-[0-9]{4}-[a-zA-Z0-9]{4}$)|(^[A-Z]{2}-[0-9]{2}-[0-9]{4}$)"

    if (!spaId) {
        errorMessage = 'SPA ID Required !';
    }  else if (!isValidStateCode(spaId)) {
        errorMessage = `The SPA ID must contain valid Territory/State Code`
    }  else if (!isValidFieldFormat(spaId, RegexFormatString)) {
        errorMessage = `The SPA ID must be in the format of ${SpaTransmittalNumberFormatErrorMessage} !`;
    }
    return errorMessage
}

/**
 * Validate Waiver Id Transmittal Number Format
 * @return
 */
export function validateWaiverId(waiverId) {

    let errorMessage = undefined
    let RegexFormatString = "(^[A-Z]{2}[.][0-9]{2}[.]R[0-9]{2}[.]M[0-9]{2}$)|(^[A-Z]{2}[.][0-9]{4}[.]R[0-9]{2}[.][0-9]{2}$)"

    let WaiverTransmittalNumberFormatErrorMessage = "SS.##.R##.M## or SS.####.R##.##"

    if (!waiverId) {
        errorMessage = 'Waiver Number Required !';
    }  else if (!isValidStateCode(waiverId)) {
        errorMessage = `The SPA ID must contain valid Territory/State Code`
    } else if (!isValidFieldFormat(waiverId, RegexFormatString)) {
        errorMessage = `The Waiver Number must be in the format of ${WaiverTransmittalNumberFormatErrorMessage} !`;
    }
    return errorMessage
}

/**
 * Validate Field
 * @param {value} Transmittal Number Field Entered on Change Event.
 */
export function isValidFieldFormat(fieldValue, regexFormatString) {

    let fieldValidationRegEx = new RegExp(regexFormatString)
    let result = false;

    if (fieldValue && fieldValue.match(fieldValidationRegEx)) {
        result = true
    } else {
        result = false
    }

    return result;

};


/**
 * Validate Field Territory/State Code
 * @param {value} Transmittal Number Field Entered on Change Event.
 */
export function isValidStateCode(fieldValue) {

    let result = false;

    function findState(states) {
        if (states.value === fieldValue.substring(0,2))
           return true
        return false;
    }

    const foundState = territoryList.find(findState)

    if (foundState === undefined  ) {
        result = false
    } else {
        result = true
    }

    return result;

};
