const { defineConfig } = require("cypress");

require('dotenv').config()

module.exports = defineConfig({
  env: {
    BASE_URL: process.env.BASE_URL,
    APP_USERNAME: process.env.APP_USERNAME,
    APP_PASSWORD: process.env.APP_PASSWORD,
    ORDER_URL: process.env.ORDER_URL,
  },

  reporter: 'cypress-mochawesome-reporter',

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      require('@cypress/grep/src/plugin')(config);
      return config;
    },
    watchForFileChanges: false,
  },
});