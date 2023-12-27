export type ValidateCocktailRequest = {
    name: string;
    category: string;
    tags: string[];
    abv: string;
    ingredients: { name: string; amount: string }[];
    isEditedText: boolean;
};

export function validateCocktail(cocktail: ValidateCocktailRequest) {
    const { name, category, isEditedText, tags, ingredients, abv } = cocktail;

    cy.dataCy('cocktail-name').should('have.text', name);
    cy.dataCy('cocktail-category').should('have.text', category);

    if (isEditedText) {
        cy.dataCy('cocktail-edited-text').should('exist');
    } else {
        cy.dataCy('cocktail-edited-text').should('not.exist');
    }

    cy.get('[data-cy=cocktail-tags] > p').should('have.length', tags.length);
    tags.forEach(tag => {
        cy.get('[data-cy=cocktail-tags] > p').should('include.text', tag);
    });

    for (let i = 0; i < ingredients.length; i++) {
        const element = ingredients[i];
        cy.get(`[data-cy=ingredient-group-${i}] [data-cy=ingredient-name]`).should('include.text', element.name);
        cy.get(`[data-cy=ingredient-group-${i}] [data-cy=ingredient-amount]`).should('include.text', element.amount);
    }

    cy.dataCy('cocktail-abv').should('include.text', abv);
}
