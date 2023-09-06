describe('Ingredients', () => {
    it('My Inventory, Search, Add and Remove Ingredient', () => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Metric');
        cy.visit('#/ingredients');

        cy.dataCy('selected-bar-component').should('not.exist');
        cy.dataCy('ingredient-list').find('div').should('have.length', 0);
        cy.dataCy('add-ingredients-search').type('Vodka');
        cy.dataCy('tag-vodka').click();
        cy.dataCy('close-x-button').click();

        cy.dataCy('ingredient-list').find('div').should('have.length', 1).first().should('contain', 'Vodka');

        cy.dataCy('remove-vodka').click();

        cy.dataCy('ingredient-list').find('div').should('have.length', 0);
    });

    it('My Inventory, Navigate to "All Ingredients" to Add', () => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Metric');
        cy.visit('#/ingredients');
        cy.dataCy('ingredient-list').find('div').should('have.length', 0);

        navigateToAllIngredients();

        cy.dataCy('ingredient-vodka').click();

        navigateToInventory();

        cy.dataCy('ingredient-list').find('div').should('have.length', 1).first().should('contain', 'Vodka');
    });

    it('My Inventory, Add All ingredients', () => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Metric');

        const highestIngredientId = 300;
        window.localStorage.setItem(
            'CapacitorStorage.saved-ingredients',
            JSON.stringify(Array.from(Array(highestIngredientId + 1).keys()).slice(1))
        );

        cy.visit('#/ingredients');

        cy.dataCy('add-ingredients-search').type('a');
        cy.dataCy('add-ingredients-search').clear();

        cy.dataCy('ingredient-tags-container')
            .children()
            .should('have.length', 1)
            .first()
            .should('contain', 'All ingredients selected');
    });

    it('My inventory - Navigate to selected bar', () => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Metric');
        window.localStorage.setItem(
            'CapacitorStorage.ingredient-lists',
            JSON.stringify([
                { name: 'My Bar', ingredients: [] },
                { name: 'Test', ingredients: [] }
            ])
        );

        cy.visit('#/ingredients');

        cy.dataCy('selected-bar-component').should('exist');
        cy.dataCy('selected-bar-name').should('include.text', 'My Bar');

        cy.get('header').should('contain.text', 'Ingredients');
        cy.url().should('include', `ingredients`);

        cy.dataCy('selected-bar-name').first().click();

        cy.get('header').should('contain.text', 'Profile');
        cy.url().should('include', `user`);
    });

    it('All ingredients - Navigate to selected bar', () => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Metric');
        window.localStorage.setItem(
            'CapacitorStorage.ingredient-lists',
            JSON.stringify([
                { name: 'My Bar', ingredients: [] },
                { name: 'Test', ingredients: [] }
            ])
        );

        cy.visit('#/ingredients');
        navigateToAllIngredients();

        cy.dataCy('selected-bar-component').should('exist');
        cy.dataCy('selected-bar-name').should('include.text', 'My Bar');

        cy.get('header').should('contain.text', 'Ingredients');
        cy.url().should('include', `ingredients`);

        cy.dataCy('selected-bar-name').last().click();

        cy.get('header').should('contain.text', 'Profile');
        cy.url().should('include', `user`);
    });
});

function navigateToInventory() {
    cy.dataCy('nav-0').click();
}

function navigateToAllIngredients() {
    cy.dataCy('nav-1').click();
}
