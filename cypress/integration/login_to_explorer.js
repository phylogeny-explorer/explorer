const localhost_and_port = 'http://localhost:3000'
describe('Use the explorer main page', function() {
  it('Log in using admin user', function() {
    cy.visit('http://localhost:3000')
    cy.get('#username').type('admin')
    cy.get('#password').type('adminadmin')
    cy.get('#loginButton').click()
    cy.url().should('eq', localhost_and_port+'/clades')
    cy.visit('http://localhost:3000/profile')
    cy.url().should('eq', localhost_and_port+'/profile') 
  })
})
