declare namespace Cypress {
    interface Chainable<Subject> {
        getByDataAttribute(value: string): Chainable<any>;
    }
}
