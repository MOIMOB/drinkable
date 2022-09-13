export enum DrinkCategory {
    Cocktail = 'Cocktail',
    Shot = 'Shot',
    Other = 'Other',
}
export function getDrinkCategories(): DrinkCategory[] {
    return Object.values(DrinkCategory);
}
