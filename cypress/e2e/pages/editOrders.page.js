export default class editOrdersPage {
    getLocators = {

    getDropdownProduct: () => cy.get('#ctl00_MainContent_fmwOrder_ddlProduct'),
    
    getFieldQuantity: () => cy.get('#ctl00_MainContent_fmwOrder_txtQuantity'),
    getFieldName: () => cy.get('#ctl00_MainContent_fmwOrder_txtName'),
    getFieldPrice: () => cy.get('#ctl00_MainContent_fmwOrder_txtUnitPrice'),
    getFieldDiscount: () => cy.get('#ctl00_MainContent_fmwOrder_txtDiscount'),
    getFieldTotal: () => cy.get('#ctl00_MainContent_fmwOrder_txtTotal'),
    getFieldName: () => cy.get('#ctl00_MainContent_fmwOrder_txtName'),
    getFieldStreet: () => cy.get('#ctl00_MainContent_fmwOrder_TextBox2'),
    getFieldCity: () => cy.get('#ctl00_MainContent_fmwOrder_TextBox3'),
    getFieldState: () => cy.get('#ctl00_MainContent_fmwOrder_TextBox4'),
    getFieldZip: () => cy.get('#ctl00_MainContent_fmwOrder_TextBox5'),
    getFieldCardNumber: () => cy.get('#ctl00_MainContent_fmwOrder_TextBox6'),
    getFieldExpiry: () => cy.get('#ctl00_MainContent_fmwOrder_TextBox1'),

    getOptionsCardType: () => cy.get('#ctl00_MainContent_fmwOrder_cardList_0, #ctl00_MainContent_fmwOrder_cardList_1, #ctl00_MainContent_fmwOrder_cardList_2')
    
    }
}
    