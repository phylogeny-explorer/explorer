describe('Can use the explorer main page when', function() {
  it('logs in using admin user', function() {
    cy.login('admin', 'adminadmin');
    cy.url().should('eq', 'http://localhost:3000/clades');
  });
});
