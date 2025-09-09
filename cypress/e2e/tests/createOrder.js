/// <reference types="cypress" />

import createOrder from '../pages/createOrder.page'
import 'cypress-plugin-steps'

describe('OrderPage', () => {
    const getOrderPage = new createOrder().getOrderLocators

    beforeEach(() => {
        cy.visit('http://secure.smartbearsoftware.com/samples/TestComplete12/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2fTestComplete12%2fWebOrders%2fDefault.aspx')
        cy.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD'));
        cy.url()
            .should('include', '/weborders');

        //Navigate to Orders page
        getOrderPage.getOrderTab()
            .should('have.text', 'Order')
            .click();

        cy.url()
            .should('include', '/Process.aspx');

        getOrderPage.getOrderTab()
            .should('have.class', 'selected');

    }),

    it('[TC001] Verify Order page initial status', () => {
        cy.section('[TC001] Verify Order page initial status');
            //1. Verify the page title
        getOrderPage.getOrderPageTitle()
        .should('have.text', '\n                        \nOrder\n\n                    ');

            //2. Verify Product Information label and buttons
            //3. Verify that Product MyMoney is selected by default
            //4. Verify that Quantity is 0
            //5. Verify that Price per unit field has 100
            //6. Verify that Discount field has 0
            //7. Verify that total field has 0
            //8. Verify that calculated button is visible and clickable
        cy.contains('h3', 'Product Information').should('be.visible');

        getOrderPage.getAddressInfo()
        .within(() => {
            cy.get('li').should('have.length', 5);
                    // Verify the Product Information label
            cy.get('li').eq(0).should('contain', 'Product:*');
            getOrderPage.getProductName()
            .should('not.be.empty').select('MyMoney');

            cy.get('li').eq(1).should('contain', 'Quantity:*');
            getOrderPage.getProductQnt()
            .should('have.value', '0');

            cy.get('li').eq(2).should('contain', 'Price per unit:');
            getOrderPage.getPrice()
            .should('have.value', '100');

            cy.get('li').eq(3).should('contain', 'Discount:');
            getOrderPage.getDiscount()
            .should('have.value', '0');

            cy.get('li').eq(4).should('contain', 'Total:');
            getOrderPage.getTotal()
            .should('have.value', '0');
            
            getOrderPage.getCalculate()
            .should('be.visible')
            .and('be.enabled');
        });

            //9. Verify All address Information fields are empty
            //- Customer name
            //- Street
            //- City
            //- State
            //- Zip
        //cy.contains('h3', 'Address Information').should('be.visible');
        //getOrderPage.getProductInfo()
        getOrderPage.getAddressLabel()
        .contains('h3', 'Address Information')
        .should('be.visible');
       
        getOrderPage.getProductInfo()
        .within(() => {
            cy.get('li').should('have.length', 5);
            // Verify the Product Information label
            cy.get('li').eq(0).should('contain', 'Customer name:*');
            getOrderPage.getCustomerName()
            .should('be.visible')
            .and('be.empty');
            
            cy.get('li').eq(1).should('contain', 'Street:*');
            getOrderPage.getStreet()
            .should('be.visible')
            .and('be.empty');

            cy.get('li').eq(2).should('contain', 'City:*');
            getOrderPage.getCity()
            .should('be.visible')
            .and('be.empty');

            cy.get('li').eq(3).should('contain', 'State:');
            getOrderPage.getState()
            .should('be.visible')
            .and('be.empty');

            cy.get('li').eq(4).should('contain', 'Zip:*');
            getOrderPage.getZip()
            .should('be.visible')
            .and('be.empty');

        });




    });





    //10. Verify that all Payment information fields are empty
    //- Card
    //- Card Nr
    //- Expire date
    //11. Verify that Process button is visible and clickable
    //12. Verify that Reset button is visible and clickable

})
