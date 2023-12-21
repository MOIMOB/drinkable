describe('Edit Base Cocktails', () => {
    beforeEach(() => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Imperial');
    });

    describe('Edit unedited base cocktail with Category, Tags and new ingredient amount', () => {
        it('Should be included in list', () => {
            cy.visit('#/cocktails');

            // Id 2 is Mojito
            cy.get('#all-cocktails-2').click();

            cy.dataCy('cocktail-edited-text').should('not.exist');
            cy.dataCy('cocktail-category').should('have.text', 'Cocktail');
            cy.get('[data-cy=cocktail-tags] > p').should('have.length', 0);

            cy.dataCy('cocktail-dialog-dropdown-content').should('not.be.visible');

            cy.dataCy('cocktail-dialog-dropdown').click();
            cy.dataCy('cocktail-dialog-dropdown-content').should('be.visible');
            cy.dataCy('dropdown-edit-cocktail').click();

            cy.dataCy('cocktail-dialog-dropdown-content').should('not.be.visible');

            cy.dataCy('cocktail-category-select').select('Other');

            cy.dataCy('edit-tags').click();

            cy.dataCy('tag-1').click();
            cy.dataCy('edit-tags-drawer-close').click();

            cy.dataCy(['ingredient-group-0', 'amount-input']).clear();
            cy.dataCy(['ingredient-group-0', 'amount-input']).type('60');
            cy.dataCy(['ingredient-group-0', 'amount-input']).blur();

            cy.dataCy('save-cocktail').click();

            cy.dataCy('cocktail-edited-text').should('exist');
            cy.dataCy('cocktail-category').should('have.text', 'Other');
            cy.get('[data-cy=cocktail-tags] > p').should('have.length', 1);
            cy.get('[data-cy=cocktail-tags] > p').should('include.text', 'IBA');
        });
    });
});
