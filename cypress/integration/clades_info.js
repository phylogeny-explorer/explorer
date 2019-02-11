const localhost_and_port = 'http://localhost:3000'
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
    cy.visit('http://localhost:3000/clades/info/55d5cb8f343108110a2d6f70/')
    cy.get('#returnToTreeButton').click()
    cy.url().should('eq', localhost_and_port+'/clades')
  })
  

})
