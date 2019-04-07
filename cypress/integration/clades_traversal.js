const first_traversal = '560107c7343108b718179cd9';
const second_traversal = '579b64003431087401dc5428';
describe('Can traverse tree when', function() {
  it('clicking on nodes', function() {
    cy.login('admin', 'adminadmin');
    cy.location('pathname').should('eq', '/clades');

    cy.get('#' + first_traversal).click();
    cy.location('pathname').should('contains', first_traversal);

    cy.get('#' + second_traversal).click();
    cy.location('pathname').should('contains', second_traversal);
    cy.visit('http://localhost:3000/auth/logout');
  });

  it('being a visitor that does not have an account', function() {
    cy.visit('http://localhost:3000');

    cy.get('#' + first_traversal).click();
    cy.location('pathname').should('contains', first_traversal);

    cy.get('#' + second_traversal).click();
    cy.location('pathname').should('contains', second_traversal);

    //cy.get('#edit_button').should('not.exist');
    //cy.get('#delete_button').should('not.exist');
    //cy.get('#evolve_button').should('not.exist');

  });
});
