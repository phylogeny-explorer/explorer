describe('Use the explorer main page', function() {
  it('Open main page', function() {
    cy.visit('http://localhost:3000')
  })
  it('Log in using admin user', function() {
    cy.visit('http://localhost:3000')
    cy.get('#username').type('admin')
    cy.get('#password').type('adminadmin')
    cy.get('.Login_loginButton_3M8.btn.btn-default.btn-block').click()
  })
  it('Open profile page', function() {
    cy.visit('http://localhost:3000/profile')
  })
  

})
