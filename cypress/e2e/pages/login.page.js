export default class orderPageObject{
    getLoginPageLocators = {
        getUserNameLabel: () => cy.get('[for="ctl00_MainContent_username"]'),
        getUserNameField: () => cy.get('input[name="ctl00$MainContent$username"]'),
        getPasswordLabel: () => cy.get('[for="ctl00_MainContent_password"]'),
        getPasswordField: () => cy.get('#ctl00_MainContent_password'),
        getLoginButton: () => cy.get('#ctl00_MainContent_login_button'),
        getErrorMessage: () => cy.get('#ctl00_MainContent_status')

    }

}