import { getStaticIngredients } from 'data/ingredient-data';
import { expect } from '@jest/globals';

describe('getStaticIngredients', () => {
    test('Ids should not include duplicates', () => {
        const ingredients = getStaticIngredients();

        const ids = ingredients.map(x => x.id);

        expect(ids.length).toBe([...new Set(ids)].length);
    });

    test('translation keys should not include duplicates', () => {
        const ingredients = getStaticIngredients();

        const names = ingredients.map(x => x.translation);

        expect(names.length).toBe([...new Set(names)].length);
    });
});
