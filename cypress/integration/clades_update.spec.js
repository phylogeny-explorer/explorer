const localhost_and_port = 'http://localhost:3000';
const cladeID = '55d5cb8f343108110a2d6f70';

describe('Can view clade info page when', function() {
  it('logs in, visits /clades/update/... and gos back to clade view', function() {
    cy.login('admin', 'adminadmin');
    cy.url().should('eq', localhost_and_port + '/clades');

    cy.visit(localhost_and_port + '/clades/update/' + cladeID);
    cy.url().should('eq', localhost_and_port + '/clades/update/' + cladeID);

    cy.get('#backToViewButton').click();
    cy.url().should('eq', localhost_and_port + '/clades/info/' + cladeID);
  });

  it('visits /clades/view/..., clicks edit button and then the cancel button', function() {
    cy.login('admin', 'adminadmin');
    cy.url().should('eq', localhost_and_port + '/clades');

    cy.visit(localhost_and_port + '/clades/info/' + cladeID);
    cy.url().should('eq', localhost_and_port + '/clades/info/' + cladeID);

    cy.get('#editButton').click();
    cy.url().should('eq', localhost_and_port + '/clades/update/' + cladeID);

    cy.get('#cancelButton').click();
    cy.url().should('eq', localhost_and_port + '/clades/info/' + cladeID);
  });
});
