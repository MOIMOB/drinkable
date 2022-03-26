import { Unit } from 'enums/unit';

export class Cocktail {
    id: number;
    name: string;
    imageSrc: string;
    category: string;
    ingredientGroups: IngredientGroup[];
    instructions: string;
}

export class IngredientGroup {
    ingredientId: number;
    amount: string;
    unit: Unit | string;
}
