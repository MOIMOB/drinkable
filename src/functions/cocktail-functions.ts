import { DrinkCategory } from 'enums/drink-category';
import { Unit } from 'enums/unit';
import { Cocktail, CocktailWithMissingIngredients } from 'models/cocktail';
import { Ingredient } from 'models/ingredient';
import { getIngredientsByIds } from './ingredient-functions';

export function getCocktails() {
    return [...cocktails].sort((a, b) => a.name.localeCompare(b.name));
}

export function getCocktailsByIngredientIds(ingredientIds: number[]): Cocktail[] {
    const validCocktails = [];

    [...cocktails].forEach(element => {
        const ids = element.ingredientGroups.map(x => x.ingredientId);
        if (ids.every(x => ingredientIds.includes(x))) {
            validCocktails.push(element);
        }
    });

    return validCocktails;
}

export function getCocktailsByIngredientIds2(ingredientIds: number[], missingIngredients: number) {
    const validCocktails: CocktailWithMissingIngredients[] = [];

    [...cocktails].forEach(element => {
        const ids = element.ingredientGroups.map(x => x.ingredientId);

        let validIds = 0;
        const missingIngredientIds = [];

        ids.forEach(element => {
            if (ingredientIds.includes(element)) {
                validIds++;
            } else {
                missingIngredientIds.push(element);
            }
        });

        if (validIds === ids.length - missingIngredients) {
            const cocktailWithMissingIngredients = toCocktailWithMissingIngredients(
                element,
                getIngredientsByIds(missingIngredientIds)
            );
            validCocktails.push(cocktailWithMissingIngredients);
        }
    });

    return validCocktails;
}

export function toCocktailWithMissingIngredients(
    cocktail: Cocktail,
    ingredients: Ingredient[]
): CocktailWithMissingIngredients {
    return {
        category: cocktail.category,
        id: cocktail.id,
        imageSrc: cocktail.imageSrc,
        ingredientGroups: cocktail.ingredientGroups,
        instructions: cocktail.instructions,
        missingIngredients: ingredients,
        name: cocktail.name,
    };
}

export function getCocktailsByIds(ids: number[]) {
    return [...cocktails].filter(x => ids.includes(x.id));
}

export function getRandomCocktails(amount: number) {
    return [...cocktails].sort(() => 0.5 - Math.random()).slice(0, amount);
}

const cocktails: Cocktail[] = [
    {
        id: 1,
        imageSrc: 'mojito.jpg',
        name: 'Mojito',
        category: DrinkCategory.Cocktail,
        instructions:
            'Muddle mint leaves with sugar and lime juice. Add a splash of soda water and fill the glass with cracked ice. Pour the rum and top with soda water. Garnish and serve with straw.',
        ingredientGroups: [
            { amount: '4', ingredientId: 1, unit: Unit.CL },
            { amount: '3', ingredientId: 2, unit: Unit.CL },
            { amount: '3', ingredientId: 3, unit: Unit.CL },
            { amount: '4', ingredientId: 4, unit: Unit.CL },
            { amount: '', ingredientId: 5, unit: '' },
        ],
    },
    {
        id: 2,
        imageSrc: 'gin_tonic.jpg',
        name: 'Gin & Tonic',
        category: DrinkCategory.Cocktail,
        instructions: 'Pour the gin and tonic into a highball glass over ice cubes. Add the lime wedge and serve.',
        ingredientGroups: [
            { amount: '4', ingredientId: 6, unit: Unit.CL },
            { amount: '', ingredientId: 7, unit: Unit.CL },
        ],
    },
    {
        id: 3,
        imageSrc: 'bloody_mary.jpg',
        name: 'Bloody Mary',
        category: DrinkCategory.Cocktail,
        instructions: '',
        ingredientGroups: [
            { amount: '4', ingredientId: 8, unit: Unit.CL },
            { amount: '12', ingredientId: 9, unit: Unit.CL },
            { amount: '2', ingredientId: 10, unit: Unit.CL },
            { amount: '1', ingredientId: 3, unit: Unit.CL },
            { amount: '', ingredientId: 11, unit: '' },
            { amount: '', ingredientId: 12, unit: '' },
            { amount: '', ingredientId: 13, unit: '' },
            { amount: '', ingredientId: 14, unit: '' },
            { amount: '', ingredientId: 15, unit: '' },
        ],
    },
    {
        id: 4,
        imageSrc: 'cosmopolitan.jpg',
        name: 'Cosmopolitan',
        category: DrinkCategory.Cocktail,
        instructions: '',
        ingredientGroups: [
            { amount: '3', ingredientId: 8, unit: Unit.CL },
            { amount: '2', ingredientId: 16, unit: Unit.CL },
            { amount: '2', ingredientId: 17, unit: Unit.CL },
            { amount: '1.5', ingredientId: 2, unit: Unit.CL },
        ],
    },
    {
        id: 5,
        imageSrc: 'margarita.jpg',
        name: 'Margarita',
        category: DrinkCategory.Cocktail,
        instructions: '',
        ingredientGroups: [
            { amount: '4', ingredientId: 18, unit: Unit.CL },
            { amount: '2', ingredientId: 19, unit: Unit.CL },
            { amount: '2', ingredientId: 2, unit: Unit.CL },
        ],
    },
];
