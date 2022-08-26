import { Unit } from 'domain/enums/unit';
import { Ingredient } from '../models/ingredient';

export class Cocktail {
    constructor() {
        this.ingredientGroups = [];
    }

    id: string;
    name: string;
    imageSrc: string;
    isImagePortrait: boolean;
    category: string;
    ingredientGroups: IngredientGroup[];
    instructions: string;
}

export class IngredientGroup {
    ingredientId: number;
    amount: string;
    unit: Unit | string;
}

export class ExtendedIngredientGroup extends IngredientGroup {
    ingredient: Ingredient;
    isInStorage: boolean;
    isChecked: boolean;
}

export class CocktailWithMissingIngredients extends Cocktail {
    missingIngredients: Ingredient[];
}
