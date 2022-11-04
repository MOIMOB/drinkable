describe('Ingredients', () => {
    it('My Inventory, Search, Add and Remove Ingredient', () => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Metric');
        cy.visit('#/ingredients');

        cy.getByDataAttribute('ingredient-list').find('div').should('have.length', 0);
        cy.getByDataAttribute('add-ingredients-search').type('Vodka');
        cy.getByDataAttribute('tag-vodka').click();
        cy.getByDataAttribute('close-x-button').click();

        cy.getByDataAttribute('ingredient-list')
            .find('div')
            .should('have.length', 1)
            .first()
            .should('contain', 'Vodka');

        cy.getByDataAttribute('remove-vodka').click();

        cy.getByDataAttribute('ingredient-list').find('div').should('have.length', 0);
    });

    it('My Inventory, Navigate to "All Ingredients" to Add', () => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Metric');
        cy.visit('#/ingredients');
        cy.getByDataAttribute('ingredient-list').find('div').should('have.length', 0);

        cy.visit('#/ingredients/list');
        cy.getByDataAttribute('ingredient-vodka').click();

        cy.visit('#/ingredients');

        cy.getByDataAttribute('ingredient-list')
            .find('div')
            .should('have.length', 1)
            .first()
            .should('contain', 'Vodka');
    });

    it('My Inventory, Add All ingredients', () => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Metric');
        cy.visit('#/ingredients');

        cy.getByDataAttribute('ingredient-list').find('div').should('have.length', 0);

        cy.getByDataAttribute('add-ingredients-search').type('a').clear();

        cy.getByDataAttribute('ingredient-tags-container').children().should('have.length', 94);

        cy.getByDataAttribute('ingredient-tags-container')
            .children()
            .each(el => {
                let value = el.attr('data-cy');
                cy.getByDataAttribute(`${value}`).click();
            });

        cy.getByDataAttribute('ingredient-tags-container')
            .children()
            .should('have.length', 1)
            .first()
            .should('contain', 'All ingredients selected');
    });

    it('Manage, Add, Update and Delete', () => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Metric');
        cy.visit('#/ingredients/manage');

        cy.getByDataAttribute('created-ingredients-container').children().should('have.length', 0);

        cy.getByDataAttribute('add-ingredient').click();

        cy.getByDataAttribute('ingredient-dialog-ok').click();
        cy.getByDataAttribute('ingredient-dialog').should('contain', 'Name is required');
        cy.getByDataAttribute('ingredient-name-input').should('have.class', 'input-error');

        cy.getByDataAttribute('ingredient-name-input').type('Test Ingredient');
        cy.getByDataAttribute('ingredient-dialog-ok').click();

        cy.getByDataAttribute('created-ingredients-container')
            .children()
            .should('have.length', 1)
            .first()
            .should('contain', 'Test Ingredient');

        cy.visit('#/ingredients');
        cy.getByDataAttribute('add-ingredients-search').type('Test Ingredient');
        cy.getByDataAttribute('ingredient-tags-container').children().should('have.length', 1);
        cy.getByDataAttribute('close-x-button').click();

        cy.visit('#/ingredients/list');
        cy.getByDataAttribute('ingredient-').should('contain', 'Test Ingredient');

        cy.visit('#/ingredients/manage');
        cy.getByDataAttribute('created-ingredients-container').children().first().click();
        cy.getByDataAttribute('ingredient-name-input').clear().type('Ingredient Test');
        cy.getByDataAttribute('ingredient-dialog-ok').click();

        cy.getByDataAttribute('created-ingredients-container')
            .children()
            .should('have.length', 1)
            .first()
            .should('contain', 'Ingredient Test');

        cy.visit('#/ingredients');
        cy.getByDataAttribute('add-ingredients-search').type('Ingredient Test');
        cy.getByDataAttribute('ingredient-tags-container').children().should('have.length', 1);
        cy.getByDataAttribute('close-x-button').click();

        cy.visit('#/ingredients/list');
        cy.getByDataAttribute('ingredient-').should('contain', 'Ingredient Test');

        cy.visit('#/ingredients/manage');
        cy.getByDataAttribute('created-ingredients-container').children().first().click();
        cy.getByDataAttribute('delete-ingredient').click();

        cy.getByDataAttribute('created-ingredients-container').children().should('have.length', 0);

        cy.visit('#/ingredients');
        cy.getByDataAttribute('add-ingredients-search').type('Ingredient Test');
        cy.getByDataAttribute('ingredient-tags-container').children().should('have.length', 0);
        cy.getByDataAttribute('close-x-button').click();

        cy.visit('#/ingredients/list');
        cy.getByDataAttribute('ingredient-').should('not.exist');
    });
});
