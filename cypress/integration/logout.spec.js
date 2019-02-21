const localhost_and_port = 'http://localhost:3000';

describe('Returns to main page when', function() {
  it('logs in and logs out', function() {
    cy.login('admin', 'adminadmin');
    cy.url().should('eq', localhost_and_port + '/clades');
    cy.visit(localhost_and_port + '/auth/logout');
    cy.url().should('eq', localhost_and_port + '/auth/logout');
    cy.wait(5000);
    cy.url().should('eq', localhost_and_port + '/');
  });
});
