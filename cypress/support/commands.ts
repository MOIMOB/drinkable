Cypress.Commands.add('getByDataAttribute', value => {
    return cy.get(`[data-cy=${value}]`);
});
