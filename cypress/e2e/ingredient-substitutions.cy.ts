describe('Ingredient Substitutions', () => {
    beforeEach(() => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Metric');
    });

    it('Add custom substitution', () => {
        cy.visit('#/user');
        cy.dataCy('menu-ingredient-substitutions').click();

        cy.dataCy('no-user-substitutions').should('be.visible');

        cy.dataCy('add-substitution').click();

        cy.dataCy('substitution-source-select').select('Vodka');

        // Save must stay disabled until at least one substitute is picked - regression guard
        cy.dataCy('save-substitution').should('be.disabled');

        cy.dataCy('substitution-replacement-checkbox-6').check();
        cy.dataCy('substitution-note-input').type('Great in a Vesper');

        cy.dataCy('save-substitution').should('not.be.disabled').click();

        cy.dataCy('no-user-substitutions').should('not.exist');
        cy.dataCy('substitution-row-8')
            .should('contain.text', 'Vodka')
            .should('contain.text', 'Gin')
            .should('contain.text', 'Great in a Vesper');
    });

    it('Edit custom substitution', () => {
        window.localStorage.setItem(
            'CapacitorStorage.user-substitutions',
            JSON.stringify([{ ingredientId: '8', replacementIds: ['6'], note: 'Original note' }])
        );

        cy.visit('#/user');
        cy.dataCy('menu-ingredient-substitutions').click();

        cy.dataCy('substitution-row-8').should('contain.text', 'Original note');

        cy.dataCy('edit-substitution-8').click();

        cy.dataCy('substitution-source-select').should('be.disabled').find(':selected').should('contain.text', 'Vodka');
        cy.dataCy('substitution-replacement-checkbox-6').should('be.checked');

        cy.dataCy('substitution-note-input').clear();
        cy.dataCy('substitution-note-input').type('Updated note');
        cy.dataCy('save-substitution').click();

        cy.dataCy('substitution-row-8').should('contain.text', 'Updated note');
    });

    it('Delete custom substitution', () => {
        window.localStorage.setItem(
            'CapacitorStorage.user-substitutions',
            JSON.stringify([{ ingredientId: '8', replacementIds: ['6'] }])
        );

        cy.visit('#/user');
        cy.dataCy('menu-ingredient-substitutions').click();

        cy.dataCy('substitution-row-8').should('be.visible');

        cy.dataCy('edit-substitution-8').click();
        cy.dataCy('delete-substitution').click();

        cy.dataCy('substitution-row-8').should('not.exist');
        cy.dataCy('no-user-substitutions').should('be.visible');
    });

    it('Built-in substitutions are read-only', () => {
        cy.visit('#/user');
        cy.dataCy('menu-ingredient-substitutions').click();

        cy.dataCy('default-substitutions').click();

        // Ingredient '2' (lime-juice) ships with a built in substitute
        cy.dataCy('default-substitution-row-2').should('contain.text', 'Lime');
        cy.dataCy('default-substitution-row-2').find('button').should('not.exist');
    });
});
