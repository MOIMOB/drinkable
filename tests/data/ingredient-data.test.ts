import { getStaticIngredients } from 'data/ingredient-data';
import { expect } from '@jest/globals';

describe('getStaticIngredients', () => {
    test('Ids should not include duplicates', () => {
        const ingredients = getStaticIngredients();

        const ids = ingredients.map(x => x.id);

        expect(ids.length).toBe([...new Set(ids)].length);
    });
});
