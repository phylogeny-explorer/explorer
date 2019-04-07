describe('Returns to main page when', function() {
  it('visits /auth/logout', function() {
    cy.login('admin', 'adminadmin');
    cy.location('pathname').should('eq', '/clades');

    cy.visit('http://localhost:3000/auth/logout');
    cy.location('pathname').should('eq', '/auth/logout');
    cy.location('pathname', { timeout: 5000 }).should('eq', '/clades');
  });
});
