declare namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
        dataCy(value: string): Chainable<unknown>;
    }
}
