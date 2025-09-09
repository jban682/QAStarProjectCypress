/// <reference types="cypress" />

import orderPageObject from '../pages/login.page'
import 'cypress-plugin-steps'


describe ('loginPageTesting', () => {
    const getLogin = new orderPageObject().getLoginPageLocators

    beforeEach(() => {
        cy.visit('http://secure.smartbearsoftware.com/samples/TestComplete12/WebOrders/Login.aspx')

    }),

    it('[TC001] Validate unable to login with empty fields', () => {
        cy.section('unable to login with empty fields')
        cy.step('1. Verify that username field is empty')
        getLogin.getUserNameLabel()
        .should('be.visible')
        .should('have.text', 'Username:');

        getLogin.getUserNameField()
        .should('be.visible')
        .should('be.enabled');

        cy.step('2. Verify that password field is empty')
        getLogin.getPasswordLabel()
        .should('be.visible')
        .should('have.text', 'Password:');

        getLogin.getPasswordField()
        .should('be.visible')
        .and('be.enabled');

        cy.step('3. Click Login button')
         getLogin.getLoginButton()
         .should('be.visible')
         .should('be.enabled')
         .and('have.attr', 'value', 'Login')
         .click();
       
        cy.step('Expect "Invalid Login or Password" error message')
        getLogin.getErrorMessage()
        .should('have.text', 'Invalid Login or Password.');
    }),

    it('[TC002] Validate unable to login via invalid username', () => {
        cy.section('unable to login via invalid username')
        cy.step('1. Input invalid username in username field (e.g, jean test)')
        cy.step('2. Input password in password field (e.g, jeantesting)')
        cy.login('jean test', 'jeantesting');
        //* Verify that password field will be empty
        getLogin.getPasswordField()
        .should('be.empty')
        //* Expect "Invalid Login or Password" error message 
        getLogin.getErrorMessage()
        .should('have.text', 'Invalid Login or Password.');
        //* Verify that username field is focus
        getLogin.getUserNameField()
        .should('to.be.focused')
    }),

    it('[TC003] Validate unable to login via incorrect credentials', () => {
        cy.section('unable to login via incorrect credentials')
        cy.step('1. Input incorrect username in username field (e.g, username)')
        cy.step('2. Input incorrect password in password field (e.g, password)')
        cy.login('username', 'password')
      //* Verify that password field will be empty
        getLogin.getPasswordField()
        .should('be.empty')
        //* Expect "Invalid Login or Password" error message 
        getLogin.getErrorMessage()
        .should('have.text', 'Invalid Login or Password.');
        //* Verify that username field is focus
        getLogin.getUserNameField()
        .should('to.be.focused')
    })

    it('[TC004] Validate unable to login via incorrect username', () => {
        cy.section('unable to login via incorrect username')
        cy.step('1. Input incorrect username in username field (e.g, username)')
        cy.step('2. Input correct password in password field (e.g, test)')
        cy.login('username', 'test')
        //* Verify that password field will be empty
        getLogin.getPasswordField()
        .should('be.empty')
        //* Expect "Invalid Login or Password" error message 
        getLogin.getErrorMessage()
        .should('have.text', 'Invalid Login or Password.');
        //* Verify that username field is focus
        getLogin.getUserNameField()
        .should('to.be.focused')
    }),

    it('[TC005] Validate unable to login via incorrect password', () => {
        cy.section('unable to login via incorrect password')
        cy.step('1. Input correct username in username field (e.g, tester)')
        cy.step('2. Input incorrect password in password field (e.g, testing)')
        cy.login('tester', 'testing')
        //* Verify that password field will be empty
        getLogin.getPasswordField()
        .should('be.empty')
        //* Expect "Invalid Login or Password" error message 
        getLogin.getErrorMessage()
        .should('have.text', 'Invalid Login or Password.');
        //* Verify that username field is focus
        getLogin.getUserNameField()
        .should('to.be.focused')
    }),

   it.only('[TC006] Verify to login using valid credentials', () => {
        cy.section('login using valid credentials')
        cy.step('1. Input correct username in username field')
        cy.step('2. Input correct password in password field')
        //cy.login('tester', 'test')
       cy.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD'));
        //cy.log(Cypress.env('USERNAME'));
        //cy.log(Cypress.env('PASSWORD'));
        //* Verify that user login successfully
      /*  cy.url()
        .should('include', '/weborders');
        cy.get('tr > td > h1')
        .should('be.visible')
        .and('contain', 'Web Orders');*/
    }) 

})