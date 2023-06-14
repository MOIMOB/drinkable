describe('Tags', () => {
    it('Create', () => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Metric');
        cy.visit('#/user');
        cy.dataCy('menu-user-tags').click();

        cy.dataCy('created-tags-container').children().should('have.length', 0);

        cy.dataCy('add-tag').click();
        cy.dataCy('drawer-ok').click();

        cy.dataCy('user-tag-drawer').should('contain.text', 'Name is required');

        cy.dataCy('name-input').type('My New Tag #1');
        cy.dataCy('drawer-ok').click();

        cy.dataCy('created-tags-container').children().should('have.length', 1);
    });

    it('Edit', () => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Metric');
        window.localStorage.setItem('CapacitorStorage.tags', JSON.stringify([{ name: 'My New Tag #1', id: 'x-1' }]));
        cy.visit('#/user');
        cy.dataCy('menu-user-tags').click();

        cy.dataCy('created-tags-container')
            .children()
            .should('have.length', 1)
            .first()
            .should('contain.text', 'My New Tag #1')
            .click();

        cy.dataCy('name-input').clear();
        cy.dataCy('name-input').type('My New Tag #2');

        cy.dataCy('drawer-ok').click();

        cy.dataCy('created-tags-container')
            .children()
            .should('have.length', 1)
            .first()
            .should('contain.text', 'My New Tag #2');
    });

    it('Delete', () => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Metric');
        window.localStorage.setItem('CapacitorStorage.tags', JSON.stringify([{ name: 'My New Tag #1', id: 'x-1' }]));
        cy.visit('#/user');
        cy.dataCy('menu-user-tags').click();

        cy.dataCy('created-tags-container')
            .children()
            .should('have.length', 1)
            .first()
            .should('contain.text', 'My New Tag #1')
            .click();

        cy.dataCy('tag-delete').click();

        cy.dataCy('created-tags-container').children().should('have.length', 0);
    });
});
