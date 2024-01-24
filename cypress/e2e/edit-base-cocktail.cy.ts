import { ValidateCocktailRequest, validateCocktail } from './validation-helpers/validate-cocktail';

describe('Edit Base Cocktails', () => {
    beforeEach(() => {
        window.localStorage.clear();
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Imperial');
    });

    it('Edit base cocktail with new values', () => {
        cy.visit('#/cocktails');

        const cocktailId = '2';
        cy.get(`#all-cocktails-${cocktailId}`).click();

        validateCocktail({
            name: 'Gin & Tonic',
            category: 'Cocktail',
            tags: [],
            abv: '9.38%',
            ingredients: [
                { name: 'Gin', amount: '1 1/3 fl oz' },
                { name: 'Tonic', amount: '4 fl oz' }
            ],
            isEditedText: false
        });

        cy.dataCy('cocktail-dialog-dropdown-content').should('not.be.visible');

        cy.dataCy('cocktail-dialog-dropdown').click();
        cy.dataCy('cocktail-dialog-dropdown-content').should('be.visible');
        cy.dataCy('dropdown-edit-cocktail').click();

        cy.dataCy('cocktail-dialog-dropdown-content').should('not.be.visible');

        cy.dataCy('cocktail-category-select').select('Other');

        cy.dataCy('edit-tags').click();

        cy.dataCy('tag-1').click();
        cy.dataCy('edit-tags-drawer-close').click();

        cy.dataCy(['ingredient-group-0', 'amount-input']).clear();
        cy.dataCy(['ingredient-group-0', 'amount-input']).type('2');
        cy.dataCy(['ingredient-group-0', 'amount-input']).blur();

        cy.dataCy('save-cocktail').click();

        const validateCocktailRequest: ValidateCocktailRequest = {
            name: 'Gin & Tonic',
            category: 'Other',
            tags: ['IBA'],
            ingredients: [
                { name: 'Gin', amount: '2 fl oz' },
                { name: 'Tonic', amount: '4 fl oz' }
            ],
            abv: '12.5%',
            isEditedText: true
        };

        validateCocktail(validateCocktailRequest);

        // Validate that when dialog is reopened, the latest values are still there
        cy.dataCy('close-dialog').click();
        cy.get(`#all-cocktails-${cocktailId}`).click();
        validateCocktail(validateCocktailRequest);
    });

    it('Restore Cocktail', () => {
        window.localStorage.setItem(
            'CapacitorStorage.cocktail-information',
            JSON.stringify([
                {
                    id: '2',
                    category: 2,
                    ingredientGroups: [
                        {
                            amount: '2',
                            ingredientId: '6',
                            unit: 'fl oz'
                        },
                        {
                            amount: '4',
                            ingredientId: '7',
                            unit: 'fl oz'
                        }
                    ],
                    tags: ['1']
                }
            ])
        );

        cy.visit('#/cocktails');

        const cocktailId = '2';
        cy.get(`#all-cocktails-${cocktailId}`).click();

        validateCocktail({
            name: 'Gin & Tonic',
            category: 'Other',
            tags: ['IBA'],
            ingredients: [
                { name: 'Gin', amount: '2 fl oz' },
                { name: 'Tonic', amount: '4 fl oz' }
            ],
            abv: '12.5%',
            isEditedText: true
        });

        cy.dataCy('cocktail-dialog-dropdown-content').should('not.be.visible');

        cy.dataCy('cocktail-dialog-dropdown').click();
        cy.dataCy('cocktail-dialog-dropdown-content').should('be.visible');
        cy.dataCy('dropdown-restore-cocktail').click();

        cy.dataCy('cocktail-dialog-dropdown-content').should('not.be.visible');

        const validateCocktailRequest = {
            name: 'Gin & Tonic',
            category: 'Cocktail',
            tags: [],
            abv: '9.38%',
            ingredients: [
                { name: 'Gin', amount: '1 1/3 fl oz' },
                { name: 'Tonic', amount: '4 fl oz' }
            ],
            isEditedText: false
        };

        validateCocktail(validateCocktailRequest);

        // Validate that when dialog is reopened, the latest values are still there
        cy.dataCy('close-dialog').click();
        cy.get(`#all-cocktails-${cocktailId}`).click();
        validateCocktail(validateCocktailRequest);
    });
});
