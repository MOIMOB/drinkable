describe('Shopping Lists', () => {
    it('Add Ingredients to list and Mark one as Shopped', () => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Metric');
        window.localStorage.setItem(
            'CapacitorStorage.shopping-lists',
            JSON.stringify([{ name: 'New Shopping List', id: 1, ingredients: [] }])
        );
        cy.visit('#/user');
        cy.dataCy('menu-user-shopping-lists').click();

        cy.dataCy('shopping-list-container').children().first().click();

        cy.dataCy('unshopped-ingredient-list').should('not.exist');
        cy.dataCy('shopped-ingredient-list').should('not.exist');

        cy.dataCy('add-ingredients-search')
            .type('Vodka')
            .dataCy('ingredient-tags-container')
            .children()
            .first()
            .click()
            .dataCy('close-x-button')
            .click();

        cy.dataCy('add-ingredients-search')
            .type('Tonic')
            .dataCy('ingredient-tags-container')
            .children()
            .first()
            .click()
            .dataCy('close-x-button')
            .click();

        cy.dataCy('add-ingredients-search')
            .type('Lime')
            .dataCy('ingredient-tags-container')
            .children()
            .first()
            .click()
            .dataCy('close-x-button')
            .click();

        cy.dataCy('unshopped-ingredient-list')
            .children()
            .filter('[data-cy="shopping-list-ingredient"]')
            .should('have.length', 3);
        cy.dataCy('shopped-ingredient-list').should('not.exist');

        cy.dataCy('unshopped-ingredient-list')
            .children()
            .filter('[data-cy="shopping-list-ingredient"]')
            .first()
            .find('input')
            .check();

        cy.dataCy('unshopped-ingredient-list')
            .children()
            .filter('[data-cy="shopping-list-ingredient"]')
            .should('have.length', 2);
        cy.dataCy('shopped-ingredient-list')
            .children()
            .filter('[data-cy="shopping-list-ingredient"]')
            .should('have.length', 1);
    });

    it('Delete Shopped Items', () => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Metric');
        window.localStorage.setItem(
            'CapacitorStorage.shopping-lists',
            JSON.stringify([
                {
                    name: 'New Shopping List',
                    id: 1,
                    ingredients: [
                        { id: '8', shopped: false },
                        { id: '7', shopped: false },
                        { id: '2', shopped: true }
                    ]
                }
            ])
        );
        cy.visit('#/user');
        cy.dataCy('menu-user-shopping-lists').click();

        cy.dataCy('shopping-list-container').children().first().click();

        cy.dataCy('unshopped-ingredient-list')
            .children()
            .filter('[data-cy="shopping-list-ingredient"]')
            .should('have.length', 2);
        cy.dataCy('shopped-ingredient-list')
            .children()
            .filter('[data-cy="shopping-list-ingredient"]')
            .should('have.length', 1);

        cy.dataCy('delete-shopped').click();

        cy.dataCy('unshopped-ingredient-list')
            .children()
            .filter('[data-cy="shopping-list-ingredient"]')
            .should('have.length', 2);

        cy.dataCy('shopped-ingredient-list').should('not.exist');
    });

    it('Restore Shopped Items', () => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Metric');
        window.localStorage.setItem(
            'CapacitorStorage.shopping-lists',
            JSON.stringify([
                {
                    name: 'New Shopping List',
                    id: 1,
                    ingredients: [
                        { id: '8', shopped: false },
                        { id: '7', shopped: false },
                        { id: '2', shopped: true }
                    ]
                }
            ])
        );
        cy.visit('#/user');
        cy.dataCy('menu-user-shopping-lists').click();

        cy.dataCy('shopping-list-container').children().first().click();

        cy.dataCy('unshopped-ingredient-list')
            .children()
            .filter('[data-cy="shopping-list-ingredient"]')
            .should('have.length', 2);
        cy.dataCy('shopped-ingredient-list')
            .children()
            .filter('[data-cy="shopping-list-ingredient"]')
            .should('have.length', 1);

        cy.dataCy('restore-shopped').click();

        cy.dataCy('unshopped-ingredient-list')
            .children()
            .filter('[data-cy="shopping-list-ingredient"]')
            .should('have.length', 3);

        cy.dataCy('shopped-ingredient-list').should('not.exist');
    });
});
