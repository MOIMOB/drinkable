import { Ingredient } from 'domain/entities/ingredient';

export class IngredientMapper {
    static toIngredientAndReplacementIds(ingredient: Ingredient) {
        let ids: string[] = [ingredient.id];

        if (ingredient.replacementIds !== undefined) {
            ids.push(...ingredient.replacementIds);
        }
        return ids;
    }
}
