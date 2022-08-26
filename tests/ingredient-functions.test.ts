import { getIngredients } from 'functions/ingredient-functions';

describe('getIngredients', () => {
    test('Ids should not include duplicates', () => {
        const ingredients = getIngredients();

        const ids = ingredients.map(x => x.id);

        expect(ids.length).toBe([...new Set(ids)].length);
    });
});
