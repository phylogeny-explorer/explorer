const localhost_and_port = 'http://localhost:3000';

describe('Can view settings page when', function() {
  it('logs in and visits /profile/settings', function() {
    cy.login('admin', 'adminadmin');
    cy.url().should('eq', localhost_and_port + '/clades');
    cy.visit(localhost_and_port + '/profile/settings');
    cy.url().should('eq', localhost_and_port + '/profile/settings');
  });
});
