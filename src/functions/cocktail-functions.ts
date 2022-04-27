import { DrinkCategory } from 'enums/drink-category';
import { Unit } from 'enums/unit';
import { Cocktail } from 'models/cocktail';

export function getCocktails() {
    return [...cocktails].sort((a, b) => a.name.localeCompare(b.name));
}

export function getCocktailsByIngredientIds(ingredientIds: number[]) {
    const validCocktails = [];

    [...cocktails].forEach(element => {
        const ids = element.ingredientGroups.map(x => x.ingredientId);
        if (ids.every(x => ingredientIds.includes(x))) {
            validCocktails.push(element);
        }
    });

    return validCocktails;
}

export function getCocktailsByIds(ids: number[]) {
    return [...cocktails].filter(x => ids.includes(x.id));
}

export function getRandomCocktails(amount: number) {
    return [...cocktails].sort(() => 0.5 - Math.random()).slice(0, amount);
}

const cocktails: Cocktail[] = [
    {
        id: 11000,
        imageSrc: 'https://www.thecocktaildb.com/images/media/drink/3z6xdi1589574603.jpg/preview',
        name: 'Mojito',
        category: DrinkCategory.Cocktail,
        instructions:
            'Muddle mint leaves with sugar and lime juice. Add a splash of soda water and fill the glass with cracked ice. Pour the rum and top with soda water. Garnish and serve with straw.',
        ingredientGroups: [
            { amount: '6-9', ingredientId: 305, unit: Unit.CL },
            { amount: '1', ingredientId: 312, unit: '' },
            { amount: '1', ingredientId: 476, unit: Unit.CL },
            { amount: '2-4', ingredientId: 337, unit: '' },
            { amount: '', ingredientId: 455, unit: '' },
        ],
    },
    {
        id: 11007,
        imageSrc: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg/preview',
        name: 'Margarita',
        category: DrinkCategory.OrdinaryDrink,
        instructions:
            'Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.',
        ingredientGroups: [
            { amount: '4.5', ingredientId: 4, unit: Unit.CL },
            { amount: '1.5', ingredientId: 498, unit: Unit.CL },
            { amount: '3', ingredientId: 308, unit: Unit.CL },
            { amount: '', ingredientId: 439, unit: '' },
        ],
    },
    {
        id: 12316,
        imageSrc: 'https://www.thecocktaildb.com/images/media/drink/deu59m1504736135.jpg/preview',
        name: 'Strawberry Daiquiri',
        category: DrinkCategory.OrdinaryDrink,
        instructions: 'Pour all ingredients into shaker with ice cubes. Shake well. Strain in chilled cocktail glass.',
        ingredientGroups: [
            { amount: '1.5', ingredientId: 473, unit: Unit.CL },
            { amount: '3', ingredientId: 305, unit: Unit.CL },
            { amount: '3', ingredientId: 308, unit: Unit.CL },
            { amount: '0.5', ingredientId: 409, unit: Unit.CL },
            { amount: '3', ingredientId: 470, unit: Unit.CL },
        ],
    },
    {
        id: 11403,
        imageSrc: 'https://www.thecocktaildb.com/images/media/drink/z0omyp1582480573.jpg/preview',
        name: 'Gin And Tonic',
        category: DrinkCategory.OrdinaryDrink,
        instructions:
            'Pour the gin and the tonic water into a highball glass almost filled with ice cubes. Stir well. Garnish with the lime wedge.',
        ingredientGroups: [
            { amount: '6', ingredientId: 2, unit: Unit.CL },
            { amount: '15', ingredientId: 497, unit: Unit.CL },
            { amount: '1', ingredientId: 312, unit: '' },
        ],
    },
    {
        id: 11113,
        imageSrc: 'https://www.thecocktaildb.com/images/media/drink/t6caa21582485702.jpg/preview',
        name: 'Bloody Mary',
        category: DrinkCategory.OrdinaryDrink,
        instructions: 'Stirring gently, pour all ingredients into highball glass. Garnish.',
        ingredientGroups: [
            { amount: '4.5', ingredientId: 1, unit: Unit.CL },
            { amount: '9', ingredientId: 492, unit: Unit.CL },
            { amount: '1', ingredientId: 293, unit: '' },
            { amount: '0.25', ingredientId: 529, unit: Unit.CL },
            { amount: '2-3', ingredientId: 483, unit: '' },
            { amount: '1', ingredientId: 312, unit: '' },
        ],
    },
    {
        id: 11117,
        imageSrc: 'https://www.thecocktaildb.com/images/media/drink/5wm4zo1582579154.jpg/preview',
        name: 'Blue Lagoon',
        category: DrinkCategory.OrdinaryDrink,
        instructions:
            'Pour vodka and curacao over ice in a highball glass. Fill with lemonade, top with the cherry, and serve.',
        ingredientGroups: [
            { amount: '3', ingredientId: 1, unit: Unit.CL },
            { amount: '3', ingredientId: 67, unit: Unit.CL },
            { amount: '', ingredientId: 300, unit: '' },
            { amount: '', ingredientId: 106, unit: '' },
        ],
    },
    {
        id: 11147,
        imageSrc: 'https://www.thecocktaildb.com/images/media/drink/dms3io1504366318.jpg/preview',
        name: 'Bourbon Sour',
        category: DrinkCategory.OrdinaryDrink,
        instructions:
            'In a shaker half-filled with ice cubes, combine the bourbon, lemon juice, and sugar. Shake well. Strain into a whiskey sour glass, garnish with the orange slice and cherry.',
        ingredientGroups: [
            { amount: '6', ingredientId: 71, unit: Unit.CL },
            { amount: '3', ingredientId: 293, unit: Unit.CL },
            { amount: '0.25', ingredientId: 476, unit: Unit.CL },
            { amount: '1', ingredientId: 359, unit: '' },
            { amount: '1', ingredientId: 322, unit: '' },
        ],
    },
    {
        id: 11472,
        imageSrc: 'https://www.thecocktaildb.com/images/media/drink/ujoh9x1504882987.jpg/preview',
        name: 'Hawaiian Cocktail',
        category: DrinkCategory.OrdinaryDrink,
        instructions: 'Shake all ingredients with ice, strain into a cocktail glass, and serve.',
        ingredientGroups: [
            { amount: '6', ingredientId: 2, unit: Unit.CL },
            { amount: '1.5', ingredientId: 498, unit: Unit.CL },
            { amount: '1.5', ingredientId: 393, unit: Unit.CL },
        ],
    },
    {
        id: 13621,
        imageSrc: 'https://www.thecocktaildb.com/images/media/drink/quqyqp1480879103.jpg/preview',
        name: 'Tequila Sunrise',
        category: DrinkCategory.Cocktail,
        instructions:
            'Pour the tequila and orange juice into glass over ice. Add the grenadine, which will sink to the bottom. Stir gently to create the sunrise effect. Garnish and serve.',
        ingredientGroups: [
            { amount: '2', ingredientId: 4, unit: '' },
            { amount: '', ingredientId: 352, unit: '' },
            { amount: '', ingredientId: 250, unit: '' },
        ],
    },
    {
        id: 11002,
        imageSrc: 'https://www.thecocktaildb.com/images/media/drink/tppn6i1589574695.jpg/preview',
        name: 'Long Island Tea',
        category: DrinkCategory.OrdinaryDrink,
        instructions:
            'Combine all ingredients (except cola) and pour over ice in a highball glass. Add the splash of cola for color. Decorate with a slice of lemon and serve.',
        ingredientGroups: [
            { amount: '1.5', ingredientId: 1, unit: Unit.CL },
            { amount: '1.5', ingredientId: 305, unit: Unit.CL },
            { amount: '1.5', ingredientId: 2, unit: Unit.CL },
            { amount: '1.5', ingredientId: 4, unit: Unit.CL },
            { amount: '0.5', ingredientId: 299, unit: '' },
            { amount: '1', ingredientId: 128, unit: '' },
        ],
    },
];
