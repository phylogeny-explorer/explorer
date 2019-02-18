const localhost_and_port = 'http://localhost:3000'
const first_traversal = '560107c7343108b718179cd9'
const second_traversal = '579b64003431087401dc5428'
describe('Use the explorer main page', function() {
  it('Open main page', function() {
    cy.visit('http://localhost:3000')
  })
  it('Open clade info page and get back to cladogdram after clicking Return To Tree', function() {
    cy.visit('http://localhost:3000')
    cy.get('#username').type('admin')
    cy.get('#password').type('adminadmin')
    cy.get('#loginButton').click()
    cy.url().should('eq', localhost_and_port+'/clades')
    cy.get('#'+first_traversal).click()
    cy.url().should('eq', localhost_and_port+'/clades/'+first_traversal+'/depth/3')
    cy.get('#'+second_traversal).click()
    cy.url().should('eq', localhost_and_port+'/clades/'+second_traversal+'/depth/3')  
})
})
