import { getStaticCocktails } from 'data/cocktail-data';
describe('getStaticCocktails', () => {
    test('Ids should not include duplicates', () => {
        const cocktails = getStaticCocktails();

        const ids = cocktails.map(x => x.id);

        expect(ids.length).toBe([...new Set(ids)].length);
    });
});
