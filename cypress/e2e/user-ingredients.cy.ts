describe('Ingredients', () => {
    it('Create', () => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Metric');
        cy.visit('#/user');
        cy.dataCy('menu-user-ingredients').click();

        cy.dataCy('created-ingredients-container').children().should('have.length', 0);

        cy.dataCy('add-ingredient').click();
        cy.dataCy('drawer-ok').click();

        cy.dataCy('user-ingredient-drawer').should('contain.text', 'Name is required');

        cy.dataCy('ingredient-name-input').type('My New Ingredient #1');
        cy.dataCy('drawer-ok').click();

        cy.dataCy('created-ingredients-container').children().should('have.length', 1);
    });

    it('Edit', () => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Metric');
        window.localStorage.setItem(
            'CapacitorStorage.ingredients',
            JSON.stringify([{ name: 'My New Ingredient #1', id: 'x-1' }])
        );
        cy.visit('#/user');
        cy.dataCy('menu-user-ingredients').click();

        cy.dataCy('created-ingredients-container')
            .children()
            .should('have.length', 1)
            .first()
            .should('contain.text', 'My New Ingredient #1')
            .click();

        cy.dataCy('ingredient-name-input').clear();
        cy.dataCy('ingredient-name-input').type('My New Ingredient #2');

        cy.dataCy('drawer-ok').click();

        cy.dataCy('created-ingredients-container')
            .children()
            .should('have.length', 1)
            .first()
            .should('contain.text', 'My New Ingredient #2');
    });

    it('Delete', () => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Metric');
        window.localStorage.setItem(
            'CapacitorStorage.ingredients',
            JSON.stringify([{ name: 'My New Ingredient #1', id: 'x-1' }])
        );
        cy.visit('#/user');
        cy.dataCy('menu-user-ingredients').click();

        cy.dataCy('created-ingredients-container')
            .children()
            .should('have.length', 1)
            .first()
            .should('contain.text', 'My New Ingredient #1')
            .click();

        cy.dataCy('ingredient-delete').click();

        cy.dataCy('created-ingredients-container').children().should('have.length', 0);
    });
});
