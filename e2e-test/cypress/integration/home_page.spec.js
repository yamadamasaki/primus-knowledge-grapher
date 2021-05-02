describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/')
    cy.contains('ログイン')
  })
  it('can login as john', () => {
    cy.login('john@foo.com', 'changeme')
    cy.contains('add')
    cy.contains('list')
    cy.contains('john@foo.com')
  })
  it('can login as admin', () => {
    cy.login('admin@foo.com', 'changeme')
    cy.contains('add')
    cy.contains('list')
    cy.contains('Admin')
    cy.contains('admin@foo.com')
  })
})
