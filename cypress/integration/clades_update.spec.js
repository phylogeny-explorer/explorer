const localhost_and_port = 'http://localhost:3000';
const cladeID = '55d5cb8f343108110a2d6f70';

describe('Can view clade info page when', function() {
  it('logs in, visits /clades/update/... and goes back to clade view', function() {
    cy.login('admin', 'adminadmin');
    cy.location('pathname').should('eq', '/clades');

    cy.visit(localhost_and_port + '/clades/update/' + cladeID);
    cy.location('pathname').should('eq', '/clades/update/' + cladeID);

    cy.get('#backToViewButton').click();
    cy.location('pathname').should('eq', '/clades/info/' + cladeID);
  });

  it('visits /clades/view/..., clicks edit button and then the cancel button', function() {
    cy.login('admin', 'adminadmin');
    cy.location('pathname').should('eq', '/clades');

    cy.visit(localhost_and_port + '/clades/info/' + cladeID);
    cy.location('pathname').should('eq', '/clades/info/' + cladeID);

    cy.get('#editButton').click();
    cy.location('pathname').should('eq', '/clades/update/' + cladeID);

    cy.get('#cancelButton').click();
    cy.location('pathname').should('eq', '/clades/info/' + cladeID);
  });
});
