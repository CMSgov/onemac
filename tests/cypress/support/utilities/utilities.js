//Here we can add all common utilities then export and import in other files as we need them.
//We can also move these files to Common package under integration. Both are considered best practices.

export class utilities {
  SPAID(state) {
    let num1 = Math.floor(Math.random() * Math.floor(80)) + 10;
    let num2 = Math.floor(Math.random() * Math.floor(80)) + 10;
    let num3 = Math.floor(Math.random() * Math.floor(80)) + 10;
    // SS-YY-NNNN
    //changed the state to MD
    let spaID = state + "-" + num1 + "-" + num2 + "" + num3;
    return spaID;
  }

  waitForSpinnders() {
    cy.waitForSpinners();
  }

  generateWaiverNumberWith5Characters(state) {
    let num1 = Math.floor(Math.random() * Math.floor(80)) + 10;
    let num2 = Math.floor(Math.random() * Math.floor(80)) + 10;
    let num3 = Math.floor(Math.random());
    // SS.#####
    let waiverNumber = state + "." + num1 + "" + num2 + "" + num3;
    return waiverNumber;
  }
}
export default utilities;
