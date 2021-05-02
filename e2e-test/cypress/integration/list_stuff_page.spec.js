describe('List Stuff Page', () => {
  it('list john\'s Stuff', () => {
    // loginAsJohn(cy)
    cy.login('john@foo.com', 'changeme')
    cy.contains('Stuff').click()
    cy.contains('list').click()
    cy.url().should('include', 'list')
    cy.get('tbody tr')
        .first()
        .find('td')
        .first()
        .should('have.text', 'Basket')
        .next()
        .should('have.text', '3')
        .next()
        .should('have.text', 'excellent')
        .next()
        .should('have.text', 'Edit')
  })
})
