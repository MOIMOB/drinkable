export enum DrinkTypeFilter {
    Both = 0,
    OnlyCocktails = 1,
    OnlyMocktails = 2
}

export function getDrinkTypeFilterTranslations() {
    return [
        { value: DrinkTypeFilter.Both, translation: 'drink-type-filter.both' },
        { value: DrinkTypeFilter.OnlyCocktails, translation: 'drink-type-filter.only-cocktails' },
        { value: DrinkTypeFilter.OnlyMocktails, translation: 'drink-type-filter.only-mocktails' }
    ];
}