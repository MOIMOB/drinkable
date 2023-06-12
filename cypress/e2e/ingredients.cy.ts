describe('Ingredients', () => {
    it('My Inventory, Search, Add and Remove Ingredient', () => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Metric');
        cy.visit('#/ingredients');

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

        cy.dataCy('add-ingredients-search').type('a').clear();

        cy.dataCy('ingredient-tags-container')
            .children()
            .should('have.length', 1)
            .first()
            .should('contain', 'All ingredients selected');
    });
});

function navigateToInventory() {
    cy.dataCy('nav-0').click().wait(200);
}

function navigateToAllIngredients() {
    cy.dataCy('nav-1').click().wait(200);
}
