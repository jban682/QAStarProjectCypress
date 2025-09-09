import loginPage from "../pages/login.page"
import viewAllOrdersPage from "../pages/viewAllOrders.page"
import editOrdersPage from "../pages/editOrders.page"
import 'cypress-plugin-steps'

describe('Edit Orders Page', () => {

    const getLocatorsLogin = new loginPage().getLocators
    const getLocatorsAllOrders = new viewAllOrdersPage().getLocators
    const getLocatorsEditOrders = new editOrdersPage().getLocators

    beforeEach(() => {
        cy.visit('http://secure.smartbearsoftware.com/samples/TestComplete12/WebOrders/Login.aspx')
        getLocatorsLogin.getFieldUsername().type('Tester')
        getLocatorsLogin.getFieldPassword().type('test')
        getLocatorsLogin.getButtonLogin().click()
        getLocatorsAllOrders.getIconEdit().first().click()
        cy.contains('Edit Order').should('be.visible')
    })

    it('[TC001] Verify Edit Orders page initial status', () => {
        getLocatorsEditOrders.getDropdownProduct().should('not.be.empty')
        getLocatorsEditOrders.getFieldQuantity().invoke('val').should('not.be.empty')
        getLocatorsEditOrders.getFieldPrice().invoke('val').should('not.be.empty')
        getLocatorsEditOrders.getFieldDiscount().invoke('val').should('not.be.empty')
        getLocatorsEditOrders.getFieldTotal().invoke('val').should('not.be.empty')

        getLocatorsEditOrders.getFieldName().invoke('val').should('not.be.empty')
        getLocatorsEditOrders.getFieldStreet().invoke('val').should('not.be.empty')
        getLocatorsEditOrders.getFieldCity().invoke('val').should('not.be.empty')
        getLocatorsEditOrders.getFieldState().invoke('val').should('not.be.empty')
        getLocatorsEditOrders.getFieldZip().invoke('val').should('not.be.empty')

        getLocatorsEditOrders.getOptionsCardType().filter(':checked').should('exist')
        getLocatorsEditOrders.getFieldCardNumber().invoke('val').should('not.be.empty')
        getLocatorsEditOrders.getFieldExpiry().invoke('val').should('not.be.empty')
    })
})