/// <reference types="Cypress" />



describe('Export Endpoints', () => {
  let endpoints = [];
  
  beforeEach(() => {
    cy.login()
    .get('div.modal-content button.close').click();
  });

  afterEach(() => {
    let content = '';
    endpoints.forEach((endpoint) => {
      content += `${endpoint}\n`;
    });

    cy.writeFile(`${Cypress.currentTest.title}.txt`, content, 'utf8');
    endpoints = [];
  });

  it('Customer v1', () => {
    cy.extractEndpoints('RW 3.0 - Customer', 'v1')
    .then((res) => {
      endpoints = res;
    });
  });

  it('Customer v2', () => {
    cy.extractEndpoints('RW 3.0 - Customer', 'v2')
    .then((res) => {
      endpoints = res;
    });
  });

  it('Customer Inventory v1', () => {
    cy.extractEndpoints('RW 3.0 - Customer Inventory', 'v1')
    .then((res) => {
      endpoints = res;
    });
  });

  it('Customer Search v1', () => {
    cy.extractEndpoints('RW 3.0 - Customer Search', 'v1')
    .then((res) => {
      endpoints = res;
    });
  });

  it('Customer Search v2', () => {
    cy.extractEndpoints('RW 3.0 - Customer Search', 'v2')
    .then((res) => {
      endpoints = res;
    });
  });

  it('Customer Backoffice v1', () => {
    cy.extractEndpoints('RW 3.0 - Customer Backoffice', 'v1')
    .then((res) => {
      endpoints = res;
    });
  });
})