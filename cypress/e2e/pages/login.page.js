export default class LoginPage {
    getLocators = {
    getFieldUsername: () => cy.get('#ctl00_MainContent_username'),
    getFieldPassword: () => cy.get('#ctl00_MainContent_password'),
    }
}
    