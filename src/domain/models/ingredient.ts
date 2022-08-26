export class Ingredient {
    public id: number;
    public name: string;
    public type: string;
    public ABV: number;
}

export class ManageIngredientModel extends Ingredient {
    public isActive: boolean;
}
