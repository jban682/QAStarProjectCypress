export default class createOrder {
    getLocators = {
        getButtonCalculate: () => cy.get('input[type="submit"]'),
        getButtonProcess: () => cy.get('#ctl00_MainContent_fmwOrder_InsertButton'),
        getButtonReset: () => cy.get('input[type="reset"'),

        getDropdownProduct: () => cy.get('#ctl00_MainContent_fmwOrder_ddlProduct'),
        getFieldQuantity: () => cy.get('#ctl00_MainContent_fmwOrder_txtQuantity'),
        getFieldPrice: () => cy.get('#ctl00_MainContent_fmwOrder_txtUnitPrice'),
        getFieldDiscount: () => cy.get('#ctl00_MainContent_fmwOrder_txtDiscount'),
        getFieldTotal: () => cy.get('#ctl00_MainContent_fmwOrder_txtTotal'),

        getFieldName: () => cy.get('#ctl00_MainContent_fmwOrder_txtName'),
        getFieldStreet: () => cy.get('#ctl00_MainContent_fmwOrder_TextBox2'),
        getFieldCity: () => cy.get('#ctl00_MainContent_fmwOrder_TextBox3'),
        getFieldState: () => cy.get('#ctl00_MainContent_fmwOrder_TextBox4'),
        getFieldZip: () => cy.get('#ctl00_MainContent_fmwOrder_TextBox5'),

        getOptionsCardType: () => cy.get('#ctl00_MainContent_fmwOrder_cardList_0, #ctl00_MainContent_fmwOrder_cardList_1, #ctl00_MainContent_fmwOrder_cardList_2'),
        getFieldCardNumber: () => cy.get('#ctl00_MainContent_fmwOrder_TextBox6'),
        getFieldExpiry: () => cy.get('#ctl00_MainContent_fmwOrder_TextBox1'),

        processOrder({ name, street, city, state, zip, cardNumber, exp }) {
            if (name) this.getFieldName().type(name);
            if (street) this.getFieldStreet().type(street);
            if (city) this.getFieldCity().type(city);
            if (state) this.getFieldState().type(state);
            if (zip) this.getFieldZip().type(zip);
            if (cardNumber) this.getFieldCardNumber().clear().type(cardNumber);
            if (exp) this.getFieldExpiry().clear().type(exp);

            this.getButtonProcess().click();
        }
    }

}

