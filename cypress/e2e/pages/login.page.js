export default class loginPage {
    getLocators = {
    getFieldUsername: () => cy.get('#ctl00_MainContent_username'),
    getFieldPassword: () => cy.get('#ctl00_MainContent_password'),

    getButtonLogin: () => cy.get('#ctl00_MainContent_login_button')
    }
}
    