describe('Can view profile page when', function() {
  it('logs in and visits /profile', function() {
    cy.login('admin', 'adminadmin');
    cy.location('pathname').should('eq', '/clades');
    cy.visit('http://localhost:3000/profile');
    cy.location('pathname').should('eq', '/profile');
  });
});
