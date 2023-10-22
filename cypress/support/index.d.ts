declare namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/consistent-type-definitions
    interface Chainable<Subject> {
        dataCy(value: string | string[]): Chainable<unknown>;
    }
}
