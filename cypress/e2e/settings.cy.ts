describe('General Settings', () => {
    beforeEach(() => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Imperial');
    });

    it('Set Theme to light', () => {
        cy.visit('#/settings');

        cy.get('html').invoke('attr', 'data-theme').should('eq', 'myTheme');

        cy.getByDataAttribute('select-theme').select('Light');
        cy.get('html').invoke('attr', 'data-theme').should('eq', 'autumn');
    });

    it('Change Language - Should display translation status', () => {
        cy.visit('#/settings');

        cy.getByDataAttribute('translation-status-basic').should('not.exist');
        cy.getByDataAttribute('translation-status-ingredient').should('not.exist');

        cy.getByDataAttribute('select-language').select('Svenska');

        cy.getByDataAttribute('translation-status-basic').should('exist');
        cy.getByDataAttribute('translation-status-ingredient').should('exist');
    });

    it('Contact', () => {
        cy.visit('#/settings');
        cy.getByDataAttribute('nav-1').click().wait(200);

        cy.getByDataAttribute('submit').click();

        cy.getByDataAttribute('input-email').should('have.class', 'input-error');
        cy.getByDataAttribute('textarea').should('have.class', 'input-error');

        cy.getByDataAttribute('input-email').type('test@email.com').blur();
        cy.getByDataAttribute('textarea').type('message').blur();

        cy.getByDataAttribute('input-email').should('not.have.class', 'input-error');
        cy.getByDataAttribute('textarea').should('not.have.class', 'input-error');

        cy.getByDataAttribute('submit').click();

        cy.getByDataAttribute('error-message-div').should('contain', 'Something went wrong, please try again later');
    });
});
