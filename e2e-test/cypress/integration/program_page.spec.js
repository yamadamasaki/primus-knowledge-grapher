describe('Program Page', () => {
  it('show programs list', () => {
    // ログイン
    cy.login('admin@foo.com', 'changeme')
    // /programs
    cy.contains('プログラム').click()
    cy.contains('一覧').click()
    cy.url().should('include', 'programs')
    // add program
    cy.contains('追加する').click()
    cy.get('input[name="title"]').type('test123')
    cy.get('select').select('Test01')
    cy.get('textarea').type('{{}"title":"test123", "indexComponent":"/imports/ui/copernicusForum/CFHomePage"}')
    cy.contains('送信').click()
    // list program
    cy.get('h2').should('have.text','プログラム')
    cy.get('table').should('contain', 'test123')
  })
})
