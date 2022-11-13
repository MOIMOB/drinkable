import { DrinkCategory } from 'domain/enums/drink-category';
import { Unit } from 'domain/enums/unit';
import { Ingredient } from './ingredient';

export class Cocktail {
    constructor() {
        this.ingredientGroups = [];
    }

    id: string;
    name: string;
    imageSrc: string;
    isImagePortrait: boolean;
    category: DrinkCategory;
    ingredientGroups: IngredientGroup[];
    instructions: string;
    isSubmitted?: boolean;
    rating?: number;
}

export class IngredientGroup {
    ingredientId: string;
    amount: string;
    unit: Unit | string;
}

export class ExtendedIngredientGroup extends IngredientGroup {
    ingredient: Ingredient;
    isInStorage: boolean;
    isChecked: boolean;
}

export class CocktailWithMissingIngredient extends Cocktail {
    missingIngredient: Ingredient;
}
