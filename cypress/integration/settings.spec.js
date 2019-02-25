describe('Can view settings page when', function() {
  it('visits /profile/settings', function() {
    cy.login('admin', 'adminadmin');
    cy.location('pathname').should('eq', '/clades');

    cy.visit('http://localhost:3000/profile/settings');
    cy.location('pathname').should('eq', '/profile/settings');
  });
});
