const localhost_and_port = 'http://localhost:3000';
describe('Can view clade info page when', function() {
  it('logs in and visits /clades/info/...', function() {
    cy.login('admin', 'adminadmin');
    cy.url().should('eq', localhost_and_port + '/clades');
    cy.visit(localhost_and_port + '/clades/info/55d5cb8f343108110a2d6f70/');
    cy.get('#returnToTreeButton').click();
    cy.url().should('eq', localhost_and_port + '/clades');
  });
});
