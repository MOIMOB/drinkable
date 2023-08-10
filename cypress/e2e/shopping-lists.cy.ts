describe('Shopping Lists', () => {
    it('Create - Default Name', () => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Metric');
        cy.visit('#/user');
        cy.dataCy('menu-user-shopping-lists').click();

        cy.dataCy('shopping-list-container').children().should('have.length', 0);

        cy.dataCy('add-shopping-list').click();
        cy.dataCy('drawer-ok').click();

        cy.dataCy('shopping-list-container').children().should('have.length', 1).should('contain.text', 'To Shop on ');
    });

    it('Create - Verify Form Validation', () => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Metric');
        cy.visit('#/user');
        cy.dataCy('menu-user-shopping-lists').click();

        cy.dataCy('shopping-list-container').children().should('have.length', 0);

        cy.dataCy('add-shopping-list').click();
        cy.dataCy('name-input').type('  ');
        cy.dataCy('drawer-ok').click();

        cy.dataCy('shopping-list-drawer').should('contain.text', 'Name cannot be empty');

        cy.dataCy('name-input').clear();
        cy.dataCy('name-input').type('New Shopping List');
        cy.dataCy('drawer-ok').click();

        cy.dataCy('shopping-list-container').children().should('have.length', 1);
    });

    it('Edit Name', () => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Metric');
        window.localStorage.setItem(
            'CapacitorStorage.shopping-lists',
            JSON.stringify([{ name: 'New Shopping List', id: 1, ingredients: [] }])
        );
        cy.visit('#/user');
        cy.dataCy('menu-user-shopping-lists').click();

        cy.dataCy('shopping-list-container')
            .children()
            .should('have.length', 1)
            .first()
            .should('contain.text', 'New Shopping List');

        cy.dataCy('open-dropdown').click();
        cy.dataCy('dropdown-edit-name').click();

        cy.dataCy('name-input').clear();
        cy.dataCy('name-input').type('Updated');

        cy.dataCy('drawer-ok').click();

        cy.dataCy('shopping-list-container')
            .children()
            .should('have.length', 1)
            .first()
            .should('contain.text', 'Updated');
    });

    it('Delete ShoppingList', () => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Metric');
        window.localStorage.setItem(
            'CapacitorStorage.shopping-lists',
            JSON.stringify([{ name: 'New Shopping List', id: 1, ingredients: [] }])
        );
        cy.visit('#/user');
        cy.dataCy('menu-user-shopping-lists').click();

        cy.dataCy('shopping-list-container')
            .children()
            .should('have.length', 1)
            .first()
            .should('contain.text', 'New Shopping List');

        cy.dataCy('open-dropdown').click();
        cy.dataCy('dropdown-delete').click();

        cy.dataCy('shopping-list-container').children().should('have.length', 0);
    });
});
