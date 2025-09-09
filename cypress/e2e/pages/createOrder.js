export default class createOrder {
    getOrderLocators = {
        getOrderTab: () => cy.get('#ctl00_menu > :nth-child(3)'),
        //cy.get('li[class="selected"]')
        getOrderPageTitle: () => cy.get('h2'),

        getProductInfo: () => cy.get('[colspan="2"] > :nth-child(3)'),
        getAddressLabel: () => cy.get('[colspan="2"] > :nth-child(4)'),
        getAddressInfo: () => cy.get('[colspan="2"] > :nth-child(5)'),

        getProductName: () => cy.get('#ctl00_MainContent_fmwOrder_ddlProduct'),
        getProductQnt: () => cy.get('#ctl00_MainContent_fmwOrder_txtQuantity'),
        getPrice: () => cy.get('#ctl00_MainContent_fmwOrder_txtUnitPrice'),
        getDiscount: () => cy.get('#ctl00_MainContent_fmwOrder_txtDiscount'),
        getTotal: () => cy.get('#ctl00_MainContent_fmwOrder_txtTotal'),
        getCalculate: () => cy.get('input[type="submit"]'),
        //Address information
        getCustomerName: () => cy.get('#ctl00_MainContent_fmwOrder_txtName'),
        getStreet: () => cy.get('#ctl00_MainContent_fmwOrder_TextBox2'),
        getCity: () => cy.get('#ctl00_MainContent_fmwOrder_TextBox3'),
        getState: () => cy.get('#ctl00_MainContent_fmwOrder_TextBox4'),
        getZip: () => cy.get('#ctl00_MainContent_fmwOrder_TextBox5'),
        //Payment information
        getCard: () => cy.get('#ctl00_MainContent_fmwOrder_cardList'),
        getCardNr: () => cy.get('#ctl00_MainContent_fmwOrder_TextBox6'),
        getExpirationDate: () => cy.get('#ctl00_MainContent_fmwOrder_TextBox1'),

        //Buttons
        getProcessButton: () => cy.get('.buttons_process'),
        getResetButton: () => cy.get('input[type="reset"')


    }

    address = () => {
        this.getOrderLocators.getCustomerName().should('be.empty'),
            this.getOrderLocators.getStreet().should('be.empty'),
            this.getOrderLocators.getCity().should('be.empty'),
            this.getOrderLocators.getState().should('be.empty'),
            this.getOrderLocators.getZip().should('be.empty')
    }

}
