// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('extractEndpoints', (api, version) => {
  const endpoints = [];
  cy.visit('https://realwavesaas.zup.me/api-manager/#/')
    .get('#apis').click()
    .get('#search-field').type(api)
    .get('div.search-form button.zp-btn').click()
    .wait(1500)
    .get('div.card-list')
    .find('div.card h3 a')
    .then((cards) => {
      cards.toArray().forEach((card) => {
        if (card.innerText === api) {
          cy.wrap(card).click();
        }
      })
    })
    .wait(1500)
    .get("div.zp-select[label='Versão']").click()
    .find('li')
    .then((opts) => {
      opts.toArray().forEach((opt) => {
        if (opt.innerText === version) {
          cy.wrap(opt).click();
        }
      });
    })
    .wait(1500)
    .get('table.zp-table tbody')
    .find('tr')
    .then((rows) => {
      rows.toArray().forEach((row) => {
        const name = row.cells.item(0).innerText.trim();
        const path = row.cells.item(1).innerText.trim();
        const methods = row.cells.item(2).children[0].children;
        cy.log(methods[0].innerText)
        for (let i = 0; i < methods.length; i++) {
          endpoints.push(`${name}\t${path}\t${methods[i].innerText}`)
        }
      });
    });
    return cy.wrap(endpoints);
});

Cypress.Commands.add('login', () => {
  cy.visit('https://realwavesaas.zup.me/')
    .get('#uid').type('victor.guerra@zup.com.br')
    .get('#password').type('Vpg@296041')
    .wait(15000)
    .get('#btn-login').click()
    .wait(1500)
    .visit('https://realwavesaas.zup.me/api-manager/#/')
});