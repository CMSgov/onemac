// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

before(() => {
  // root-level hook
  // runs once before all tests

  // generate waiver numbers to be used across tests
  cy.task("generateWaiverNumber", {
    filename: "sharedWaiverNumber4",
    digits: 4,
  });
  cy.task("generateWaiverNumber", {
    filename: "sharedWaiverNumber5",
    digits: 5,
  });
  cy.task("generateWaiverNumber", { filename: "raiWaiverNumber4", digits: 4 });
  cy.task("generateWaiverNumber", { filename: "raiWaiverNumber5", digits: 5 });

  // waits up to 5 mins for serverless to boot up all services and web page
  cy.visit("/", { timeout: 60000 * 5 });
});

Cypress.Commands.add("waitForSpinners", () => {
  cy.get(".loader__container", { timeout: 30_000 }).should("not.exist");
});

import "cypress-file-upload";
