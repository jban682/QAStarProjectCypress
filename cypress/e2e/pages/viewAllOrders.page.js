export default class viewAllOrdersPage {
    getLocators = {
    getFieldUsername: () => cy.get('#ctl00_MainContent_username'),
    getFieldPassword: () => cy.get('#ctl00_MainContent_password'),
    
    getLinkLogout: () => cy.get('#ctl00_logout'),

    getButtonCheckAll: () => cy.get('#ctl00_MainContent_btnCheckAll'),
    getButtonUncheckAll: () => cy.get('#ctl00_MainContent_btnUncheckAll'),
    getButtonDelete: () => cy.get('#ctl00_MainContent_btnDelete'),

    getTableHeader: () => cy.get('#ctl00_MainContent_orderGrid th'),
    getTableCheckbox: () => cy.get('#ctl00_MainContent_orderGrid input[type="checkbox"]'),
    getTableOrder: () => cy.get('#ctl00_MainContent_orderGrid'),
    
    getIconEdit: () => cy.get('#ctl00_MainContent_orderGrid input[type="image"]'),

    updateOrder({ name, street, city, state, zip, cardNumber, exp }) {
        if (name) cy.get('#ctl00_MainContent_fmwOrder_txtName').type(name)
        if (street) cy.get('#ctl00_MainContent_fmwOrder_TextBox2').type(street)
        if (city) cy.get('#ctl00_MainContent_fmwOrder_TextBox3').type(city)
        if (state) cy.get('#ctl00_MainContent_fmwOrder_TextBox4').type(state)
        if (zip) cy.get('#ctl00_MainContent_fmwOrder_TextBox5').type(zip)
        if (cardNumber) cy.get('#ctl00_MainContent_fmwOrder_TextBox6').clear().type(cardNumber)
        if (exp) cy.get('#ctl00_MainContent_fmwOrder_TextBox1').clear().type(exp)
        
        cy.get('#ctl00_MainContent_fmwOrder_UpdateButton').click()
        }
    }
}
