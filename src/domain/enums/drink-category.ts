import { EnumTranslationModel } from 'domain/models/enum-translation-model';

export enum DrinkCategory {
    Cocktail = 0,
    Shot = 1,
    Other = 2,
    Ingredient = 3
}

export function getDrinkCategories(): EnumTranslationModel<DrinkCategory>[] {
    return [
        { value: DrinkCategory.Cocktail, translation: 'drink-category.cocktail' },
        { value: DrinkCategory.Shot, translation: 'drink-category.shot' },
        { value: DrinkCategory.Other, translation: 'drink-category.other' },
        { value: DrinkCategory.Ingredient, translation: 'drink-category.ingredient' }
    ];
}
