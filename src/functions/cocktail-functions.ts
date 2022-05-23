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
        isImagePortrait: cocktail.isImagePortrait,
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
        isImagePortrait: false,
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
        isImagePortrait: false,
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
        isImagePortrait: false,
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
        isImagePortrait: true,
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
        isImagePortrait: true,
        name: 'Margarita',
        category: DrinkCategory.Cocktail,
        instructions: '',
        ingredientGroups: [
            { amount: '4', ingredientId: 18, unit: Unit.CL },
            { amount: '2', ingredientId: 19, unit: Unit.CL },
            { amount: '2', ingredientId: 2, unit: Unit.CL },
        ],
    },
    {
        id: 6,
        imageSrc: 'strawberry_daiquiri.jpg',
        isImagePortrait: false,
        name: 'Frozen Strawberry Daiquiri',
        category: DrinkCategory.Cocktail,
        instructions: '',
        ingredientGroups: [
            { amount: '5', ingredientId: 1, unit: Unit.CL },
            { amount: '3', ingredientId: 2, unit: Unit.CL },
            { amount: '3', ingredientId: 3, unit: Unit.CL },
            { amount: '150', ingredientId: 20, unit: Unit.G },
        ],
    },
    {
        id: 7,
        imageSrc: 'placeholder.jpg',
        isImagePortrait: false,
        name: 'Amaretto Sour',
        category: DrinkCategory.Cocktail,
        instructions: 'Shake and strain. Garnish with a cherry and an orange slice.',
        ingredientGroups: [
            { amount: '5', ingredientId: 22, unit: Unit.CL },
            { amount: '3', ingredientId: 10, unit: Unit.CL },
            { amount: '2', ingredientId: 3, unit: Unit.CL },
            { amount: '2', ingredientId: 23, unit: Unit.CL },
        ],
    },
    {
        id: 8,
        imageSrc: 'moscow_mule.jpg',
        isImagePortrait: false,
        name: 'Moscow Mule',
        category: DrinkCategory.Cocktail,
        instructions:
            'Combine vodka and ginger beer in a highball glass filled with ice. Add lime juice. Stir gently. Garnish.',
        ingredientGroups: [
            { amount: '4', ingredientId: 8, unit: Unit.CL },
            { amount: '2', ingredientId: 2, unit: Unit.CL },
            { amount: '10', ingredientId: 24, unit: Unit.CL },
        ],
    },
    {
        id: 9,
        imageSrc: 'pina_colada.jpg',
        isImagePortrait: true,
        name: 'Pina Colada',
        category: DrinkCategory.OrdinaryDrink,
        instructions: 'Mix with crushed ice in a shaker. Pour into chilled glass, garnish and serve.',
        ingredientGroups: [
            { amount: '4.5', ingredientId: 1, unit: Unit.CL },
            { amount: '6', ingredientId: 25, unit: Unit.CL },
            { amount: '6', ingredientId: 26, unit: Unit.CL },
        ],
    },
    {
        id: 10,
        imageSrc: 'whiskey_sour.jpg',
        isImagePortrait: false,
        name: 'Whiskey Sour',
        category: DrinkCategory.OrdinaryDrink,
        instructions:
            "Shake with ice. Strain into chilled glass, garnish and serve. If served 'On the rocks', strain ingredients into old-fashioned glass filled with ice.",
        ingredientGroups: [
            { amount: '5', ingredientId: 28, unit: Unit.CL },
            { amount: '3', ingredientId: 10, unit: Unit.CL },
            { amount: '2', ingredientId: 3, unit: Unit.CL },
            { amount: '2', ingredientId: 23, unit: Unit.CL },
            { amount: '', ingredientId: 27, unit: '' },
        ],
    },
    {
        id: 11,
        imageSrc: 'placeholder.jpg',
        isImagePortrait: false,
        name: 'Pink Lady',
        category: DrinkCategory.OrdinaryDrink,
        instructions: 'Shake with ice. Strain into chilled glass and serve.',
        ingredientGroups: [
            { amount: '3', ingredientId: 6, unit: Unit.CL },
            { amount: '2', ingredientId: 19, unit: Unit.CL },
            { amount: '2', ingredientId: 10, unit: Unit.CL },
            { amount: '2', ingredientId: 30, unit: Unit.CL },
            { amount: '2', ingredientId: 23, unit: Unit.CL },
        ],
    },
    {
        id: 12,
        imageSrc: 'gin_sour.jpg',
        isImagePortrait: false,
        name: 'Gin Sour',
        category: DrinkCategory.OrdinaryDrink,
        instructions:
            'In a shaker half-filled with ice cubes, combine the ingredients. Shake well. Strain into a sour glass and garnish with an orange slice',
        ingredientGroups: [
            { amount: '6', ingredientId: 6, unit: Unit.CL },
            { amount: '3', ingredientId: 10, unit: Unit.CL },
            { amount: '2', ingredientId: 3, unit: Unit.CL },
            { amount: '2', ingredientId: 23, unit: '' },
        ],
    },
    {
        id: 13,
        imageSrc: 'dry_martini.jpg',
        isImagePortrait: false,
        name: 'Dry Martini',
        category: DrinkCategory.Cocktail,
        instructions:
            'Straight: Pour all ingredients into mixing glass with ice cubes. Stir well. Strain in chilled martini cocktail glass. Garnish with olive.',
        ingredientGroups: [
            { amount: '6', ingredientId: 6, unit: Unit.CL },
            { amount: '1', ingredientId: 31, unit: Unit.CL },
            { amount: '', ingredientId: 32, unit: '' },
        ],
    },
    {
        id: 14,
        imageSrc: 'placeholder.jpg',
        isImagePortrait: false,
        name: 'Hot Shot',
        category: DrinkCategory.Shot,
        instructions: '',
        ingredientGroups: [
            { amount: '2', ingredientId: 33, unit: Unit.CL },
            { amount: '2', ingredientId: 34, unit: Unit.CL },
            { amount: '2', ingredientId: 35, unit: Unit.CL },
        ],
    },
    {
        id: 15,
        imageSrc: 'placeholder.jpg',
        isImagePortrait: false,
        name: 'Frozen Margarita',
        category: DrinkCategory.Cocktail,
        instructions:
            'Combine all ingredients in an electric blender and blend at a low speed for five seconds, then blend at a high speed until firm. Pour contents into a highball glass, garnish with lime slice, and serve.',
        ingredientGroups: [
            { amount: '3', ingredientId: 18, unit: Unit.CL },
            { amount: '2', ingredientId: 16, unit: Unit.CL },
            { amount: '3', ingredientId: 2, unit: Unit.CL },
            { amount: '2', ingredientId: 3, unit: Unit.CL },
        ],
    },
];
