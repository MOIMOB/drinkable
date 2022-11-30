export enum DrinkCategory {
    Cocktail = 'Cocktail',
    Shot = 'Shot',
    Other = 'Other',
    CocktailIngredient = 'Cocktail Ingredient'
}
export function getDrinkCategories(): DrinkCategory[] {
    return Object.values(DrinkCategory);
}
