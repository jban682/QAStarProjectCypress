/// <reference types="cypress" />

import orderPageObject from '../pages/login.page.js'
import loginData from '../../fixtures/login.json'
import 'cypress-plugin-steps'



describe('loginPageTesting', () => {
    const getLogin = new orderPageObject().getLoginPageLocators

    beforeEach(() => {
        cy.visit(Cypress.env('BASE_URL'));
    }),

        it('[TC001] Validate unable to login with empty fields', () => {
            cy.section('unable to login with empty fields');
            getLogin.getLabelUserName().should('be.visible').should('have.text', 'Username:');
            getLogin.getFieldUserName().should('be.visible').should('be.enabled');
            getLogin.getLabelPassword().should('be.visible').should('have.text', 'Password:');
            getLogin.getFieldPassword().should('be.visible').and('be.enabled');
            getLogin.getButtonLogin().should('be.visible').should('be.enabled').and('have.attr', 'value', 'Login').click();
            getLogin.getErrorMessage().should('have.text', 'Invalid Login or Password.');
        }),

        it('[TC002] Validate unable to login via invalid username', () => {
            cy.section('unable to login via invalid username');
            cy.login(loginData.TC002.username, loginData.TC002.password);
            getLogin.getFieldPassword().should('be.empty');
            getLogin.getErrorMessage().should('have.text', 'Invalid Login or Password.');
            getLogin.getFieldUserName().should('to.be.focused');
        }),

        it('[TC003] Validate unable to login via incorrect credentials', () => {
            cy.section('unable to login via incorrect credentials');
            cy.login(loginData.TC003.username, loginData.TC003.password);
            getLogin.getFieldPassword().should('be.empty');
            getLogin.getErrorMessage().should('have.text', 'Invalid Login or Password.');
            getLogin.getFieldUserName().should('to.be.focused');
        }),

        it('[TC004] Validate unable to login via incorrect username', () => {
            cy.section('unable to login via incorrect username');
            cy.login(loginData.TC004.username, loginData.TC004.password);
            getLogin.getFieldPassword().should('be.empty');
            getLogin.getErrorMessage().should('have.text', 'Invalid Login or Password.');
            getLogin.getFieldUserName().should('to.be.focused');
        }),

        it('[TC005] Validate unable to login via incorrect password', () => {
            cy.section('unable to login via incorrect password');
            cy.login(loginData.TC005.username, loginData.TC005.password);
            getLogin.getFieldPassword().should('be.empty');
            getLogin.getErrorMessage().should('have.text', 'Invalid Login or Password.');
            getLogin.getFieldUserName().should('to.be.focused');
        }),

        it('[TC006] Verify to login using valid credentials', { tags: '@smoke' }, () => {
            cy.section('login using valid credentials');
            cy.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD'));
        })
})