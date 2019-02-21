const localhost_and_port = 'http://localhost:3000';
const cladeID = '55d5cb8f343108110a2d6f70';

describe('Can view clade info page when', function() {
  it('logs in, visits /clades/info/... and return to tree', function() {
    cy.login('admin', 'adminadmin');
    cy.url().should('eq', localhost_and_port + '/clades');

    cy.visit(localhost_and_port + '/clades/info/' + cladeID);
    cy.url().should('eq', localhost_and_port + '/clades/info/' + cladeID);

    cy.get('#returnToTreeButton').click();
    cy.url().should('eq', localhost_and_port + '/clades');
  });
});
