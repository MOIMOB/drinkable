Cypress.Commands.add('dataCy', input => {
    if (typeof input === 'string') {
        return cy.get(`[data-cy=${input}]`);
    }

    const dataCySelectorArray = input.map(x => `[data-cy=${x}]`);
    const stringValue = dataCySelectorArray.join(' ');
    return cy.get(stringValue);
});
