import loginPage from "../pages/login.page"
import viewAllOrdersPage from "../pages/viewAllOrders.page"
import 'cypress-plugin-steps'

describe('View ALL Orders Page', () => {
    const getLocatorsLogin = new loginPage().getLocators
    const getLocatorsAllOrders = new viewAllOrdersPage().getLocators

    beforeEach(() => {
        cy.visit('http://secure.smartbearsoftware.com/samples/TestComplete12/WebOrders/Login.aspx')
        getLocatorsLogin.getFieldUsername().type('Tester')
        getLocatorsLogin.getFieldPassword().type('test')
        getLocatorsLogin.getButtonLogin().click()

        cy.contains('View all orders').click()
    })

    it('[TC001] Verify that user can logout', () => {
        cy.contains('View all products').should('be.visible')
        getLocatorsAllOrders.getLinkLogout().click()
        cy.url().should('include', 'Login.aspx')
        getLocatorsLogin.getButtonLogin().should('be.visible')
    })

    it('[TC002] View all orders, Initial state', () => {
        cy.contains('Web Orders').should('be.visible')
        getLocatorsAllOrders.getButtonCheckAll().should('be.visible')
        getLocatorsAllOrders.getButtonUncheckAll().should('be.visible')
        getLocatorsAllOrders.getTableHeader().should('have.length', 13)
        getLocatorsAllOrders.getButtonDelete().should('be.visible')
    })

    it('[TC003] Validate the columns of View all orders table', () => {
        
        const headers = ['\u00A0', 'Name', 'Product', '#', 'Date',
                        'Street', 'City', 'State', 'Zip', 'Card', 
                        'Card Number', 'Exp', '\u00A0']
                        
        getLocatorsAllOrders.getTableHeader().each(($el, index) => {
            cy.wrap($el).should('have.text', headers[index])
        })
    })

    it('[TC004] Verify Check All and Uncheck All buttons', () => {
        
        getLocatorsAllOrders.getButtonCheckAll().click()
        getLocatorsAllOrders.getTableCheckbox().each(($cb) => {
            cy.wrap($cb).should('be.checked')
        })

        getLocatorsAllOrders.getButtonUncheckAll().click()
        getLocatorsAllOrders.getTableCheckbox().each(($cb) => {
            cy.wrap($cb).should('not.be.checked')
        })
    })

    it('[TC005] Verify Edit image functionality', () => {
        getLocatorsAllOrders.getIconEdit().first().click()
        cy.contains('Edit Order').should('be.visible')
    })

    it('[TC006] Verify Delete Selected button', () => {
        getLocatorsAllOrders.getTableCheckbox().first().check()
        getLocatorsAllOrders.getButtonDelete().click()
        cy.on('window:confirm', () => true)
        getLocatorsAllOrders.getTableCheckbox().first().should('not.be.checked')
    })

    it('[TC007] Verify edited info reflects on the table', () => {
        getLocatorsAllOrders.getIconEdit().first().click()
        getLocatorsAllOrders.updateOrder({
            name: ' test',
            street: ' test',
            city: ' test',
            state: '123',
            zip: '12',
            cardNumber: '1',
            exp: '12/30'
        })
        cy.contains('List of All Orders').should('be.visible')
        getLocatorsAllOrders.getTableOrder().should('contain', 'test').and('contain', '123').and('contain', '12/30')
    })
})