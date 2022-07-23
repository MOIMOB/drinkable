import { ExtendedIngredientGroup, IngredientGroup } from 'models/cocktail';
import { Ingredient, ManageIngredientModel } from 'models/ingredient';

export function getIngredients() {
    return [...currentIngredients].sort((a, b) => a.name.localeCompare(b.name));
}

export function getRandomIngredients(count: number, excludeIds: number[] = []) {
    const ingredients = getIngredients().filter(x => !excludeIds.includes(x.id));

    const randomIngredients = ingredients.sort(() => 0.5 - Math.random()).slice(0, count);

    return randomIngredients.map(x => ({
        id: x.id,
        name: x.name,
        type: x.type,
        ABV: x.ABV,
        isActive: false,
    }));
}

export function getManageIngredientModels(activeIds: number[]): ManageIngredientModel[] {
    return getIngredients().map(x => ({
        id: x.id,
        name: x.name,
        type: x.type,
        ABV: x.ABV,
        isActive: activeIds.includes(x.id),
    }));
}

export function toExtendedIngredientGroup(
    groups: IngredientGroup[],
    ingredientIds: number[]
): ExtendedIngredientGroup[] {
    return groups.map(x => ({
        amount: x.amount,
        ingredientId: x.ingredientId,
        unit: x.unit,
        ingredient: currentIngredients.find(y => y.id === x.ingredientId),
        isActive: ingredientIds.includes(x.ingredientId),
    }));
}

export function getIngredientsByIds(ids: number[]): Ingredient[] {
    return getIngredients().filter(x => ids.includes(x.id));
}

const currentIngredients: Ingredient[] = [
    { id: 1, name: 'Light Rum', type: '', ABV: 40 },
    { id: 2, name: 'Lime Juice', type: '', ABV: null },
    { id: 3, name: 'Simple syrup', type: '', ABV: null },
    { id: 4, name: 'Soda Water', type: '', ABV: null },
    { id: 5, name: 'Mint', type: '', ABV: null },
    { id: 6, name: 'Gin', type: '', ABV: 40 },
    { id: 7, name: 'Tonic Water', type: '', ABV: null },
    { id: 8, name: 'Vodka', type: '', ABV: 40 },
    { id: 9, name: 'Tomato Juice', type: '', ABV: null },
    { id: 10, name: 'Lemon Juice', type: '', ABV: null },
    { id: 11, name: 'Tabasco sauce', type: '', ABV: null },
    { id: 12, name: 'Worcestershire sauce', type: '', ABV: null },
    { id: 13, name: 'Black Pepper', type: '', ABV: null },
    { id: 14, name: 'Celery Salt', type: '', ABV: null },
    { id: 15, name: 'Celery', type: '', ABV: null },
    { id: 16, name: 'Powdered Sugar', type: '', ABV: null },
    { id: 17, name: 'Cranberry Juice', type: '', ABV: null },
    { id: 18, name: 'Tequila', type: '', ABV: 40 },
    { id: 19, name: 'Orange liqueur', type: 'Liqueur', ABV: null },
    { id: 20, name: 'Strawberry', type: '', ABV: null },
    { id: 21, name: 'Spiced rum', type: '', ABV: null },
    { id: 22, name: 'Amaretto', type: '', ABV: null },
    { id: 23, name: 'Egg white', type: '', ABV: null },
    { id: 24, name: 'Ginger Beer', type: '', ABV: null },
    { id: 25, name: 'Coconut Cream', type: '', ABV: null },
    { id: 26, name: 'Pineapple Juice', type: '', ABV: null },
    { id: 27, name: 'Angostura bitters', type: '', ABV: null },
    { id: 28, name: 'Bourbon Whiskey', type: '', ABV: null },
    { id: 29, name: 'Apricot Brandy', type: '', ABV: null },
    { id: 30, name: 'Grenadine', type: '', ABV: null },
    { id: 31, name: 'Dry Vermouth', type: '', ABV: null },
    { id: 32, name: 'Olive', type: '', ABV: null },
    { id: 33, name: 'Galliano', type: '', ABV: null },
    { id: 34, name: 'Coffee', type: '', ABV: null },
    { id: 35, name: 'Cream', type: '', ABV: null },
    { id: 36, name: 'Campari', type: '', ABV: 25 },
    { id: 37, name: 'Sweet Vermouth', type: '', ABV: null },
    { id: 38, name: 'Triple Sec', type: '', ABV: null },
    { id: 39, name: 'Southern Comfort', type: '', ABV: null },
    { id: 40, name: 'Sloe Gin', type: '', ABV: null },
    { id: 41, name: 'Irish Whiskey', type: '', ABV: null },
    { id: 42, name: 'Sugar', type: '', ABV: null },
    { id: 43, name: 'Coffee Liqueur', type: '', ABV: null },
    { id: 44, name: 'Blue Curacao', type: '', ABV: null },
    { id: 45, name: 'Sprite', type: '', ABV: null },
    { id: 46, name: 'Salt', type: '', ABV: null },
    { id: 47, name: 'Creme De Cacao', type: '', ABV: null },
    { id: 48, name: 'Light Cream', type: '', ABV: null },
    { id: 49, name: 'Nutmeg', type: '', ABV: null },
    { id: 50, name: 'Brandy', type: '', ABV: null },
    { id: 51, name: 'Lemon Vodka', type: '', ABV: null },
    { id: 52, name: 'Blended Whiskey', type: '', ABV: null },
    { id: 53, name: 'Blackberry brandy', type: '', ABV: null },
    { id: 54, name: 'Dark rum', type: '', ABV: null },
    { id: 55, name: 'Kahlua', type: '', ABV: null },
    { id: 56, name: 'Scotch', type: '', ABV: null },
    { id: 57, name: 'Maraschino liqueur', type: '', ABV: null },
    { id: 58, name: 'Orange bitters', type: '', ABV: null },
    { id: 59, name: 'Egg yolk', type: '', ABV: null },
    { id: 60, name: 'Champagne', type: '', ABV: null },
    { id: 61, name: 'Cognac', type: '', ABV: null },
    { id: 62, name: 'Chocolate Ice-cream', type: '', ABV: null },
    { id: 63, name: 'Coca-Cola', type: '', ABV: null },
    { id: 64, name: 'Orange Juice', type: '', ABV: null },
    { id: 65, name: 'Apple brandy', type: '', ABV: null },
    { id: 66, name: 'Orgeat Syrup', type: '', ABV: null },
    { id: 67, name: 'Sweet and Sour', type: '', ABV: null },
    { id: 68, name: 'Creme De Cassis', type: '', ABV: null },
    { id: 69, name: 'Peach Schnapps', type: '', ABV: null },
    { id: 70, name: 'Grapefruit Juice', type: '', ABV: null },
    { id: 71, name: 'Coconut liqueur', type: '', ABV: null },
    { id: 72, name: 'Malibu rum', type: '', ABV: null },
    { id: 73, name: 'Lager Beer', type: '', ABV: null },
    { id: 74, name: 'Absinthe', type: '', ABV: null },
];
