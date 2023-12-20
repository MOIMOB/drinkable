import { DrinkCategory } from 'domain/enums/drink-category';
import { IngredientGroup } from './cocktail';

export type CocktailInformation = {
    id: string;
    rating?: number;
    isFavorite?: boolean;
    notes?: string;
    category?: DrinkCategory;
    tags?: string[];
    ingredientGroups?: IngredientGroup[];
};
