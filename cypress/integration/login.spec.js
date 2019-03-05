describe('Can use the explorer main page when', function() {
  it('logs in using admin user', function() {
    cy.login('admin', 'adminadmin');
    cy.location('pathname').should('eq', '/clades');
  });
});
