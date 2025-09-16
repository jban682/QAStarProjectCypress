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
import orderPageObject from "../e2e/pages/login.page";


Cypress.Commands.add('login', (username, password) => {
  const getLogin = new orderPageObject();
  getLogin.login(username, password);
});

Cypress.Commands.add('verifyErrorMessage', (id, expectedText) => {
  cy.get(`${id}`)
    .invoke('text')
    .then((text) => {
      expect(text.trim()).to.equal(expectedText);
    });
});