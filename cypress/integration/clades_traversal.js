const first_traversal = '560107c7343108b718179cd9';
const second_traversal = '579b64003431087401dc5428';
describe('Use the explorer main page', function() {
  it('Open clade info page and get back to cladogdram after clicking Return To Tree', function() {
    cy.login('admin', 'adminadmin');
    cy.location('pathname').should('eq', '/clades');
    cy.get('#' + first_traversal).click();
    cy.location('pathname').should('contains', first_traversal);
    cy.get('#' + second_traversal).click();
    cy.location('pathname').should('contains', second_traversal);
  });
});
