export default class orderPageObject {
    getLoginPageLocators = {
        getLabelUserName: () => cy.get('[for="ctl00_MainContent_username"]'),
        getFieldUserName: () => cy.get('#ctl00_MainContent_username'),
        getLabelPassword: () => cy.get('[for="ctl00_MainContent_password"]'),
        getFieldPassword: () => cy.get('#ctl00_MainContent_password'),
        getButtonLogin: () => cy.get('#ctl00_MainContent_login_button'),
        getErrorMessage: () => cy.get('#ctl00_MainContent_status')

    };

    login(username, password) {
        this.getLoginPageLocators.getFieldUserName().type(username),
        this.getLoginPageLocators.getFieldPassword().type(password),
        this.getLoginPageLocators.getButtonLogin().click()
    }

}