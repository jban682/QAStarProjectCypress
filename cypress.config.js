const { defineConfig } = require("cypress");

require('dotenv').config()

module.exports = defineConfig({
  env: {
    // SITE_BASE_URL: 'http://secure.smartbearsoftware.com/samples/TestComplete12/WebOrders/Login.aspx',
    BASE_URL: process.env.BASE_URL,
    USERNAME: process.env.USER,
    PASSWORD: process.env.PASSWORD,
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});