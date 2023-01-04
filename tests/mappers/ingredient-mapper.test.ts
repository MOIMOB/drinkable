import { getStaticIngredients } from 'data/ingredient-data';
import { Ingredient } from 'domain/entities/ingredient';
import { IngredientMapper } from 'domain/mappers/ingredient-mapper';

describe('IngredientMapper', () => {
    test('toIngredientAndReplacementIds - No replacementIds', () => {
        let ingredient = getStaticIngredients()[0] as Ingredient;

        let result = IngredientMapper.toIngredientAndReplacementIds(ingredient);

        expect(result).toStrictEqual(['1']);
    });

    test('toIngredientAndReplacementIds - With replacementIds', () => {
        let ingredient = getStaticIngredients()[18] as Ingredient;

        let result = IngredientMapper.toIngredientAndReplacementIds(ingredient);

        expect(result).toStrictEqual(['19', '38', '92']);
    });
});
