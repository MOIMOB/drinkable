describe('Home', () => {
    it('Navigate to Favorites', () => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Metric');
        cy.visit('#/');

        cy.get('header').should('contain.text', 'Home');
        cy.url().should('include', `home-router`);

        cy.dataCy('navigate-favorites').click();

        cy.get('header').should('contain.text', 'Cocktails');
        cy.url().should('include', `cocktails`);
    });

    it('Navigate to Shopping Lists', () => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Metric');
        cy.visit('#/');

        cy.get('header').should('contain.text', 'Home');
        cy.url().should('include', `home-router`);

        cy.dataCy('navigate-shopping-lists').click();

        cy.get('header').should('contain.text', 'Profile');
        cy.url().should('include', `shopping-lists`);
    });
});
