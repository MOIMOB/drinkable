import { SpiritType } from 'domain/enums/spirit-type';

export class Ingredient {
    public id: string;
    public name: string;
    public spiritType: SpiritType;
}

export class ManageIngredientModel extends Ingredient {
    public isActive: boolean;
}

export class CreatedIngredientModel extends Ingredient {
    public usedInCocktailNames: string[];
}
