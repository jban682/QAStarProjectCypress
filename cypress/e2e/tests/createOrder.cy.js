/// <reference types="cypress" />

import createOrder from '../pages/createOrder.page.js'
import orderData from '../../fixtures/createOrder.json'
import 'cypress-plugin-steps'



describe('OrderPage', () => {
    const getLocatorsCreateOrder = new createOrder().getLocators

    beforeEach(() => {
        cy.visit(Cypress.env('BASE_URL'));
        cy.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD'));
        cy.url().should('include', '/weborders');

        getLocatorsCreateOrder.getOrderTab().should('have.text', 'Order').click();
        cy.url().should('include', '/Process.aspx');
    }),

        it('[TC001] Verify Order page initial status', () => {
            cy.section('[TC001] Verify Order page initial status');
            cy.contains('h2', 'Order').should('be.visible');
            cy.contains('h3', 'Product Information').should('be.visible');

            getLocatorsCreateOrder.getProductInfo().within(() => {
                cy.get('li').should('have.length', 5);
                cy.get('li').eq(0).should('contain', 'Product:*');
                getLocatorsCreateOrder.getDropdownProduct().invoke('val').should('eq', orderData.product1.productName);

                cy.get('li').eq(1).should('contain', 'Quantity:*');
                getLocatorsCreateOrder.getFieldQuantity().should('have.value', '0');

                cy.get('li').eq(2).should('contain', 'Price per unit:');
                getLocatorsCreateOrder.getFieldPrice().should('have.value', orderData.product1.price);

                cy.get('li').eq(3).should('contain', 'Discount:');
                getLocatorsCreateOrder.getFieldDiscount().should('have.value', orderData.product1.discount);

                cy.get('li').eq(4).should('contain', 'Total:');
                getLocatorsCreateOrder.getFieldTotal().should('have.value', '0');

                getLocatorsCreateOrder.getButtonCalculate().should('be.visible').and('be.enabled');
            });

            cy.contains('h3', 'Address Information').should('be.visible');
            getLocatorsCreateOrder.getAddressInfo().within(() => {
                cy.get('li').should('have.length', 5);
                cy.get('li').eq(0).should('contain', 'Customer name:*');
                getLocatorsCreateOrder.getFieldName().should('be.visible').and('be.empty');

                cy.get('li').eq(1).should('contain', 'Street:*');
                getLocatorsCreateOrder.getFieldStreet().should('be.visible').and('be.empty');

                cy.get('li').eq(2).should('contain', 'City:*');
                getLocatorsCreateOrder.getFieldCity().should('be.visible').and('be.empty');

                cy.get('li').eq(3).should('contain', 'State:');
                getLocatorsCreateOrder.getFieldState().should('be.visible').and('be.empty');

                cy.get('li').eq(4).should('contain', 'Zip:*');
                getLocatorsCreateOrder.getFieldZip().should('be.visible').and('be.empty');
            });

            cy.contains('h3', 'Payment Information').should('be.visible');
            getLocatorsCreateOrder.getPaymentInfo().within(() => {
                cy.get('li').should('have.length', 3);
                cy.get('li').eq(0).should('contain', 'Card:*');
                getLocatorsCreateOrder.getOptionsCardType().should('be.visible').and('not.be.checked');
                getLocatorsCreateOrder.getOptionsCardType().eq(0).should('have.attr', 'value', 'Visa');
                getLocatorsCreateOrder.getOptionsCardType().eq(1).should('have.attr', 'value', 'MasterCard');
                getLocatorsCreateOrder.getOptionsCardType().eq(2).should('have.attr', 'value', 'American Express');

                cy.get('li').eq(1).should('contain', 'Card Nr:*');
                getLocatorsCreateOrder.getFieldCardNumber().should('be.visible').and('be.empty');

                cy.get('li').eq(2).should('contain', 'Expire date (mm/yy):*');
                getLocatorsCreateOrder.getFieldExpiry().should('be.visible').and('be.empty');
            });
            getLocatorsCreateOrder.getButtonProcess().should('have.text', 'Process').and('be.visible');
            getLocatorsCreateOrder.getButtonReset().should('have.value', 'Reset').and('be.visible');
        }),

        it('[TC002] Verify that order wont proceed without input', () => {
            cy.section('[TC002] Verify that order wont proceed without input');
            getLocatorsCreateOrder.getButtonProcess().click();

            cy.verifyErrorMessage('#ctl00_MainContent_fmwOrder_RegularExpressionValidator1', "Quantity must be greater than zero.");
            cy.verifyErrorMessage('#ctl00_MainContent_fmwOrder_RequiredFieldValidator2', "Field 'Customer name' cannot be empty.");
            cy.verifyErrorMessage('#ctl00_MainContent_fmwOrder_RequiredFieldValidator3', "Field 'Street' cannot be empty.");
            cy.verifyErrorMessage('#ctl00_MainContent_fmwOrder_RequiredFieldValidator4', "Field 'City' cannot be empty.");
            cy.verifyErrorMessage('#ctl00_MainContent_fmwOrder_RequiredFieldValidator5', "Field 'Zip' cannot be empty.");
            cy.verifyErrorMessage('#ctl00_MainContent_fmwOrder_CustomValidator1', "Select a card type.");
            cy.verifyErrorMessage('#ctl00_MainContent_fmwOrder_RequiredFieldValidator6', "Field 'Card Nr' cannot be empty.");
            cy.verifyErrorMessage('#ctl00_MainContent_fmwOrder_RequiredFieldValidator7', "Field 'Expire date' cannot be empty.");
        }),

        it('[TC003] Verify that order will proceed with required information only', () => {
            cy.section('[TC003] Verify that order will proceed with required information only');
            getLocatorsCreateOrder.getDropdownProduct().select(orderData.product1.productName);
            getLocatorsCreateOrder.getFieldQuantity().clear().type(orderData.validQuantity.quantity1);
            getLocatorsCreateOrder.getFieldPrice().invoke('val').should('eq', orderData.product1.price.toString());
            getLocatorsCreateOrder.getFieldDiscount().invoke('val').should('eq', orderData.product1.discount.toString());
            getLocatorsCreateOrder.getButtonCalculate().click();

            getLocatorsCreateOrder.getFieldQuantity().invoke('val').then((quantityVal) => {
                const quantity = parseFloat(quantityVal);

                getLocatorsCreateOrder.getFieldPrice().invoke('val').then((priceVal) => {
                    const price = parseFloat(priceVal);

                    getLocatorsCreateOrder.getFieldDiscount().invoke('val').then((discountVal) => {
                        const discount = parseFloat(discountVal);
                        const discountAmount = (quantity * price) * (discount / 100);
                        const expectedTotal = (quantity * price) - discountAmount;

                        getLocatorsCreateOrder.getFieldTotal().should('have.value', expectedTotal);
                    });
                });
            });

            getLocatorsCreateOrder.getOptionsCardType().eq(0).check();
            getLocatorsCreateOrder.processOrder({
                name: orderData.validInputData.customerName,
                street: orderData.validInputData.street,
                city: orderData.validInputData.city,
                zip: orderData.validInputData.zip,
                cardNumber: orderData.validInputData.cardNr,
                exp: orderData.validInputData.expireDate
            });

            cy.reload();
            cy.url().should('include', '/Process.aspx');
            cy.contains('strong', 'New order has been successfully added.').should('be.visible');
        }),

        it('[TC004] Verify that order will proceed with required and optional information', () => {
            cy.section('Required and optional fields input is acceptable');
            getLocatorsCreateOrder.getDropdownProduct().select(orderData.product3.productName);
            getLocatorsCreateOrder.getFieldQuantity().clear().type(orderData.validQuantity.quantity3);
            getLocatorsCreateOrder.getFieldPrice().invoke('val').should('eq', orderData.product3.price.toString());
            getLocatorsCreateOrder.getFieldDiscount().invoke('val').should('eq', orderData.product3.discount.toString());
            getLocatorsCreateOrder.getButtonCalculate().click();

            getLocatorsCreateOrder.getFieldQuantity().invoke('val').then((quantityVal) => {
                const quantity = parseFloat(quantityVal);

                getLocatorsCreateOrder.getFieldPrice().invoke('val').then((priceVal) => {
                    const price = parseFloat(priceVal);

                    getLocatorsCreateOrder.getFieldDiscount().invoke('val').then((discountVal) => {
                        const discount = parseFloat(discountVal);
                        const discountAmount = (quantity * price) * (discount / 100);
                        const expectedTotal = (quantity * price) - discountAmount;

                        getLocatorsCreateOrder.getFieldTotal().should('have.value', expectedTotal);
                    });
                });
            });

            getLocatorsCreateOrder.getOptionsCardType().eq(1).check();

            getLocatorsCreateOrder.processOrder({
                name: orderData.validInputData.customerName,
                street: orderData.validInputData.street,
                city: orderData.validInputData.city,
                state: orderData.validInputData.state,
                zip: orderData.validInputData.zip,
                cardNumber: orderData.validInputData.cardNr,
                exp: orderData.validInputData.expireDate
            });
            cy.reload();
            cy.url().should('include', '/Process.aspx');
            cy.contains('strong', 'New order has been successfully added.').should('be.visible');
        }),

        it('[TC005] Verify that order will not proceed with optional information only', () => {
            cy.section('Order will not created without required details');
            getLocatorsCreateOrder.getFieldState().type(orderData.validInputData.state1);
            getLocatorsCreateOrder.getButtonProcess().click();
            cy.verifyErrorMessage('#ctl00_MainContent_fmwOrder_RegularExpressionValidator1', "Quantity must be greater than zero.");
            cy.verifyErrorMessage('#ctl00_MainContent_fmwOrder_RequiredFieldValidator2', "Field 'Customer name' cannot be empty.");
            cy.verifyErrorMessage('#ctl00_MainContent_fmwOrder_RequiredFieldValidator3', "Field 'Street' cannot be empty.");
            cy.verifyErrorMessage('#ctl00_MainContent_fmwOrder_RequiredFieldValidator4', "Field 'City' cannot be empty.");
            cy.verifyErrorMessage('#ctl00_MainContent_fmwOrder_RequiredFieldValidator5', "Field 'Zip' cannot be empty.");
            cy.verifyErrorMessage('#ctl00_MainContent_fmwOrder_CustomValidator1', "Select a card type.");
            cy.verifyErrorMessage('#ctl00_MainContent_fmwOrder_RequiredFieldValidator6', "Field 'Card Nr' cannot be empty.");
            cy.verifyErrorMessage('#ctl00_MainContent_fmwOrder_RequiredFieldValidator7', "Field 'Expire date' cannot be empty.");
        }),

        it('[TC006] Verify calculate button functionality', () => {
            cy.section('test the calculate button using valid and invalid Quantity value')
            getLocatorsCreateOrder.getFieldQuantity().clear().type(orderData.validQuantity.quantity2);
            getLocatorsCreateOrder.getButtonCalculate().click();

            getLocatorsCreateOrder.getFieldQuantity().invoke('val').then((quantityVal) => {
                const quantity = parseFloat(quantityVal);

                getLocatorsCreateOrder.getFieldPrice().invoke('val').then((priceVal) => {
                    const price = parseFloat(priceVal);

                    getLocatorsCreateOrder.getFieldDiscount().invoke('val').then((discountVal) => {
                        const discount = parseFloat(discountVal);
                        const discountAmount = (quantity * price) * (discount / 100);
                        const expectedTotal = (quantity * price) - discountAmount;

                        getLocatorsCreateOrder.getFieldTotal().should('have.value', expectedTotal);
                    });
                });
            });
            getLocatorsCreateOrder.getFieldQuantity().clear().type(orderData.invalidQnt.qnt1);
            getLocatorsCreateOrder.getButtonCalculate().click();
            getLocatorsCreateOrder.getFieldQuantity().should('have.value', '0');

            getLocatorsCreateOrder.getFieldQuantity().clear().type(orderData.invalidQnt.qnt2);
            getLocatorsCreateOrder.getButtonCalculate().click();
            getLocatorsCreateOrder.getFieldQuantity().should('have.value', '0');

            getLocatorsCreateOrder.getFieldQuantity().clear().type(orderData.invalidQnt.qnt3);
            getLocatorsCreateOrder.getButtonCalculate().click();
            getLocatorsCreateOrder.getFieldQuantity().should('have.value', '0');
        }),

        it('[TC007] Validate if Address Information and Payment Information textbox fields accept special characters', () => {
            cy.section('special characters input to all text field test');
            getLocatorsCreateOrder.processOrder({
                name: orderData.specialCharInput.customerName,
                street: orderData.specialCharInput.street,
                city: orderData.specialCharInput.city,
                state: orderData.specialCharInput.state,
                zip: orderData.specialCharInput.zip,
                cardNumber: orderData.specialCharInput.cardNr,
                exp: orderData.specialCharInput.expireDate
            });
            cy.verifyErrorMessage('#ctl00_MainContent_fmwOrder_RegularExpressionValidator1', "Quantity must be greater than zero.");
            cy.verifyErrorMessage('#ctl00_MainContent_fmwOrder_rev1', "Invalid format. Only digits allowed.");
            cy.verifyErrorMessage('#ctl00_MainContent_fmwOrder_CustomValidator1', "Select a card type.");
            cy.verifyErrorMessage('#ctl00_MainContent_fmwOrder_RegularExpressionValidator2', "Invalid format. Only digits allowed.");
            cy.verifyErrorMessage('#ctl00_MainContent_fmwOrder_RegularExpressionValidator3', "Invalid format. Required format is mm/yy.");
        }),

        it('[TC008] Validate if Address Information and Payment Information textbox fields accept number', () => {
            cy.section('number input to all text field test');
            getLocatorsCreateOrder.processOrder({
                name: orderData.numberInput.customerName,
                street: orderData.numberInput.street,
                city: orderData.numberInput.city,
                state: orderData.numberInput.state,
                zip: orderData.numberInput.zip,
                cardNumber: orderData.numberInput.cardNr,
                exp: orderData.numberInput.expireDate
            });

            cy.verifyErrorMessage('#ctl00_MainContent_fmwOrder_RegularExpressionValidator1', "Quantity must be greater than zero.");
            cy.verifyErrorMessage('#ctl00_MainContent_fmwOrder_rev1', "Invalid format. Only digits allowed.");
            cy.verifyErrorMessage('#ctl00_MainContent_fmwOrder_CustomValidator1', "Select a card type.");
            cy.verifyErrorMessage('#ctl00_MainContent_fmwOrder_RegularExpressionValidator2', "Invalid format. Only digits allowed.");
            cy.verifyErrorMessage('#ctl00_MainContent_fmwOrder_RegularExpressionValidator3', "Invalid format. Required format is mm/yy.");
        });

        it('[TC009] Validate that Address Information and Payment Information textbox fields has no limit', () => {
            cy.section('256 char input to all text field')
            getLocatorsCreateOrder.processOrder({
                name: orderData.limit256CharInput.customerName,
                street: orderData.limit256CharInput.street,
                city: orderData.limit256CharInput.city,
                state: orderData.limit256CharInput.state,
                zip: orderData.limit256CharInput.zip,
                cardNumber: orderData.limit256CharInput.cardNr,
                exp: orderData.limit256CharInput.expireDate
            });
            cy.verifyErrorMessage('#ctl00_MainContent_fmwOrder_RegularExpressionValidator1', "Quantity must be greater than zero.");
            cy.verifyErrorMessage('#ctl00_MainContent_fmwOrder_rev1', "Invalid format. Only digits allowed.");
            cy.verifyErrorMessage('#ctl00_MainContent_fmwOrder_CustomValidator1', "Select a card type.");
            cy.verifyErrorMessage('#ctl00_MainContent_fmwOrder_RegularExpressionValidator2', "Invalid format. Only digits allowed.");
            cy.verifyErrorMessage('#ctl00_MainContent_fmwOrder_RegularExpressionValidator3', "Invalid format. Required format is mm/yy.");
        }),

        it('[TC010] Verify reset button functionality', () => {
            getLocatorsCreateOrder.getButtonReset().click();
            getLocatorsCreateOrder.getDropdownProduct().select(orderData.product2.productName);
            getLocatorsCreateOrder.getFieldQuantity().clear().type(orderData.validQuantity.quantity2);
            getLocatorsCreateOrder.getFieldPrice().invoke('val').should('eq', orderData.product2.price);
            getLocatorsCreateOrder.getFieldDiscount().invoke('val').should('eq', orderData.product2.discount.toString());
            getLocatorsCreateOrder.getButtonCalculate().click();

            getLocatorsCreateOrder.getFieldQuantity().invoke('val').then((quantityVal) => {
                const quantity = parseFloat(quantityVal);

                getLocatorsCreateOrder.getFieldPrice().invoke('val').then((priceVal) => {
                    const price = parseFloat(priceVal);

                    getLocatorsCreateOrder.getFieldDiscount().invoke('val').then((discountVal) => {
                        const discount = parseFloat(discountVal);
                        const discountAmount = (quantity * price) * (discount / 100);
                        const expectedTotal = (quantity * price) - discountAmount;

                        getLocatorsCreateOrder.getFieldTotal().should('have.value', expectedTotal);
                    });
                });
            });

            getLocatorsCreateOrder.getFieldName().type(orderData.numberInput.customerName);
            getLocatorsCreateOrder.getFieldStreet().type(orderData.numberInput.street);
            getLocatorsCreateOrder.getFieldCity().type(orderData.numberInput.city);
            getLocatorsCreateOrder.getFieldState().type(orderData.numberInput.state);
            getLocatorsCreateOrder.getFieldZip().type(orderData.numberInput.zip);
            getLocatorsCreateOrder.getOptionsCardType().eq(2).check();
            getLocatorsCreateOrder.getFieldCardNumber().type(orderData.numberInput.cardNr);
            getLocatorsCreateOrder.getFieldExpiry().type(orderData.numberInput.expireDate);

            getLocatorsCreateOrder.getButtonReset().click();

            getLocatorsCreateOrder.getDropdownProduct().invoke('val').should('eq', orderData.product1.productName);
            getLocatorsCreateOrder.getFieldQuantity().should('have.value', '0');
            getLocatorsCreateOrder.getFieldPrice().invoke('val').should('eq', orderData.product1.price);
            getLocatorsCreateOrder.getFieldDiscount().invoke('val').should('eq', orderData.product1.discount);
            getLocatorsCreateOrder.getFieldTotal().should('have.value', '0');
            getLocatorsCreateOrder.getFieldName().invoke('val').should('be.empty')
            getLocatorsCreateOrder.getFieldStreet().invoke('val').should('be.empty')
            getLocatorsCreateOrder.getFieldCity().invoke('val').should('be.empty')
            getLocatorsCreateOrder.getFieldState().invoke('val').should('be.empty')
            getLocatorsCreateOrder.getFieldZip().invoke('val').should('be.empty')
            getLocatorsCreateOrder.getOptionsCardType().should('be.visible').and('not.be.checked');
            getLocatorsCreateOrder.getFieldCardNumber().invoke('val').should('be.empty')
            getLocatorsCreateOrder.getFieldExpiry().invoke('val').should('be.empty')
        }),

        it('[TC011] Verify that product name is visible and each can be selected', () => {
            getLocatorsCreateOrder.getDropdownProduct().select(orderData.product3.productName);
            getLocatorsCreateOrder.getFieldPrice().invoke('val').should('equal', orderData.product3.price);
            getLocatorsCreateOrder.getFieldDiscount().invoke('val').should('equal', orderData.product3.discount);

            getLocatorsCreateOrder.getDropdownProduct().select(orderData.product1.productName);
            getLocatorsCreateOrder.getFieldPrice().invoke('val').should('equal', orderData.product1.price);
            getLocatorsCreateOrder.getFieldDiscount().invoke('val').should('equal', orderData.product1.discount);

            getLocatorsCreateOrder.getDropdownProduct().select(orderData.product2.productName);
            getLocatorsCreateOrder.getFieldPrice().invoke('val').should('equal', orderData.product2.price);
            getLocatorsCreateOrder.getFieldDiscount().invoke('val').should('equal', orderData.product2.discount);

            getLocatorsCreateOrder.getButtonReset().click();

            getLocatorsCreateOrder.getDropdownProduct().invoke('val').should('eq', orderData.product1.productName);
            getLocatorsCreateOrder.getFieldPrice().invoke('val').should('eq', orderData.product1.price);
            getLocatorsCreateOrder.getFieldDiscount().invoke('val').should('eq', orderData.product1.discount);
        }),

        it('[TC012] Payment Information: Verify that radio button can be selected', () => {
            getLocatorsCreateOrder.getOptionsCardType().should('be.visible').and('not.be.checked');
            getLocatorsCreateOrder.getOptionsCardType().eq(1).check();
            getLocatorsCreateOrder.getOptionsCardType().eq(2).check();
            getLocatorsCreateOrder.getOptionsCardType().eq(0).check();
            getLocatorsCreateOrder.getButtonReset().click();
            getLocatorsCreateOrder.getOptionsCardType().should('be.visible').and('not.be.checked');
        }),

        it('[TC013] SideBar: Navigation test', () => {
            cy.get('#ctl00_menu > :nth-child(2)').should('have.text', 'View all products').click();
            cy.url().should('include', '/Products.aspx');
            cy.get('#ctl00_menu > :nth-child(1)').should('have.text', 'View all orders').click();
            cy.url().should('include', '/Default.aspx');
            getLocatorsCreateOrder.getOrderTab().should('have.text', 'Order').click();
            cy.url().should('include', '/Process.aspx');
            cy.go('back');
            cy.go('forward');
            cy.go(-1);
            cy.go(1);
            cy.go(-1);
        })
})