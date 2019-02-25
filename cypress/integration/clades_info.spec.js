const cladeID = '55d5cb8f343108110a2d6f70';

describe('Can view clade info page when', function() {
  it('visits /clades/info/... and return to tree', function() {
    cy.login('admin', 'adminadmin');
    cy.location('pathname').should('eq', '/clades');

    cy.visit('http://localhost:3000/clades/info/' + cladeID);
    cy.location('pathname').should('eq', '/clades/info/' + cladeID);

    cy.get('#returnToTreeButton').click();
    cy.location('pathname').should('eq', '/clades');
  });
});
