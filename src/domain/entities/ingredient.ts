export class Ingredient {
    public id: string;
    public name: string;
    public type: string;
    public ABV: number;
}

export class ManageIngredientModel extends Ingredient {
    public isActive: boolean;
}

export class CreatedIngredientModel extends Ingredient {
    public usedInCocktailNames: string[];
}
