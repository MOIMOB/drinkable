describe('Manage Ingredient Row', () => {
    beforeEach(() => {
        window.localStorage.clear();
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Metric');
    });

    it('Add to Saved Ingredients', () => {
        cy.visit('#/cocktails');

        cy.dataCy('cocktails-wrapper').children().first().click();

        cy.dataCy(['ingredient-group-0', 'ingredient-group-checkmark']).should('not.exist');

        cy.dataCy('ingredient-group-0').trigger('mousedown');
        cy.dataCy('manage-ingredient-row-dialog').should('be.visible');

        cy.dataCy('toggle-ingredient-storage-status-button').should('include.text', 'Add to Bar');
        cy.dataCy('toggle-ingredient-storage-status-button').click();

        cy.dataCy('manage-ingredient-row-dialog').should('not.exist');

        cy.dataCy(['ingredient-group-0', 'ingredient-group-checkmark']).should('be.visible');
    });

    it('Remove from Saved Ingredients', () => {
        window.localStorage.setItem(
            'CapacitorStorage.ingredient-lists',
            JSON.stringify([{ id: 0, ingredients: ['1'], name: 'My Bar' }])
        );

        cy.visit('#/cocktails');

        cy.dataCy('cocktails-wrapper').children().first().click();

        cy.dataCy(['ingredient-group-0', 'ingredient-group-checkmark']).should('be.visible');

        cy.dataCy('ingredient-group-0').trigger('mousedown');
        cy.dataCy('manage-ingredient-row-dialog').should('be.visible');

        cy.dataCy('toggle-ingredient-storage-status-button').should('include.text', 'Remove from Bar');
        cy.dataCy('toggle-ingredient-storage-status-button').click();

        cy.dataCy('manage-ingredient-row-dialog').should('not.exist');

        cy.dataCy(['ingredient-group-0', 'ingredient-group-checkmark']).should('not.exist');
    });
});
