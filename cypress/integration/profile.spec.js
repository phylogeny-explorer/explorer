describe('Can view profile page when', function() {
  it('visits /profile', function() {
    cy.login('admin', 'adminadmin');
    cy.location('pathname').should('eq', '/clades');

    cy.visit('http://localhost:3000/profile');
    cy.location('pathname').should('eq', '/profile');
  });

  it('clicks on profile in nav', function() {
    cy.login('admin', 'adminadmin');
    cy.location('pathname').should('eq', '/clades');

    cy.get('.dropdown').click();
    cy.contains('Profile').click();
    cy.location('pathname').should('eq', '/profile');
  });
});
