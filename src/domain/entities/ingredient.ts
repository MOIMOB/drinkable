import { SpiritType } from 'domain/enums/spirit-type';

export class StaticIngredient {
    public id: string;
    public spiritType: SpiritType;
    public translation: string;
    public recipeId?: string;
}

export class Ingredient extends StaticIngredient {
    public name: string;
}

export class ManageIngredientModel extends Ingredient {
    public isActive: boolean;
}

export class CreatedIngredientModel extends Ingredient {
    public usedInCocktailNames: string[];
}
