describe('General Settings', () => {
    beforeEach(() => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Imperial');
    });

    it('Set Theme to light', () => {
        cy.visit('#/user');
        cy.dataCy('menu-settings').click();

        cy.get('html').invoke('attr', 'data-theme').should('eq', 'myTheme');

        cy.dataCy('select-theme').select('Light');
        cy.get('html').invoke('attr', 'data-theme').should('eq', 'autumn');
    });

    it('Change Language - Should display translation status', () => {
        cy.visit('#/user');
        cy.dataCy('menu-settings').click();

        cy.dataCy('translation-status-basic').should('not.exist');
        cy.dataCy('translation-status-ingredient').should('not.exist');

        cy.dataCy('select-language').select('Svenska');

        cy.dataCy('translation-status-basic').should('exist');
        cy.dataCy('translation-status-ingredient').should('exist');
    });

    it('Contact', () => {
        cy.visit('#/user');
        cy.dataCy('menu-contact').click();

        cy.dataCy('submit').click();

        cy.dataCy('input-email').should('have.class', 'input-error');
        cy.dataCy('textarea').should('have.class', 'input-error');

        cy.dataCy('input-email').type('test@email.com').blur();
        cy.dataCy('textarea').type('message').blur();

        cy.dataCy('input-email').should('not.have.class', 'input-error');
        cy.dataCy('textarea').should('not.have.class', 'input-error');

        cy.dataCy('submit').click();

        cy.dataCy('error-message-div').should('contain', 'Something went wrong, please try again later');
    });
});
