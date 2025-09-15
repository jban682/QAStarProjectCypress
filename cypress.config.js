const { defineConfig } = require("cypress");

require('dotenv').config()

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  
  env: {
    BASE_URL: process.env.BASE_URL,
    USERNAME: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    ORDER_URL: process.env.ORDER_URL,
  },

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      require('@cypress/grep/src/plugin')(config);
      return config;
    },
  },
});