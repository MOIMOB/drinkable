describe('Ingredients', () => {
    beforeEach(() => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Imperial');
    });

    it('Create Cocktail - Should be included in list', () => {
        cy.visit('#/cocktails');

        cy.getByDataAttribute('cocktails-wrapper').should('not.contain', 'Test Cocktail');

        cy.getByDataAttribute('create-cocktail').click();

        cy.getByDataAttribute('save-cocktail').click();

        cy.getByDataAttribute('cocktail-name').should('have.class', 'input-error').type('Test Cocktail').blur();

        cy.getByDataAttribute('cocktail-image').selectFile('static/images/balmoral.jpg', { force: true });

        cy.getByDataAttribute('textarea').type('Test Instructions');

        cy.getByDataAttribute('ingredients-number').should('contain', '1');

        cy.getByDataAttribute('save-cocktail').click();

        cy.getByDataAttribute('ingredients-number').should('contain', '0');
        cy.getByDataAttribute('cocktail-dialog')
            .should('contain', 'Test Cocktail')
            .should('contain', 'Test Instructions')
            .should('contain', 'Submit for review');

        cy.getByDataAttribute('close-dialog').click();

        cy.getByDataAttribute('cocktails-wrapper').should('contain', 'Test Cocktail');
    });
});
