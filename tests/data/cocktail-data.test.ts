import { getStaticCocktails } from 'data/cocktail-data';
import { Tag } from 'data/tags-data';
import { expect } from '@jest/globals';
describe('getStaticCocktails', () => {
    test('Ids should not include duplicates', () => {
        const cocktails = getStaticCocktails();

        const ids = cocktails.map(x => x.id);

        expect(ids.length).toBe([...new Set(ids)].length);
    });

    test('translation keys should not include duplicates', () => {
        const ingredients = getStaticCocktails();

        const names = ingredients.map(x => x.translation);

        expect(names.length).toBe([...new Set(names)].length);
    });

    test('IBA Cocktails should include a secondary IBA tag', () => {
        const cocktails = getStaticCocktails();

        cocktails
            .filter(x => x.tags.includes(Tag.IBA))
            .forEach(x => {
                const tags: string[] = [Tag.ContemporaryClassics, Tag.NewEraDrinks, Tag.TheUnforgettables];

                const foundTags = x.tags.filter(y => tags.includes(y));

                expect(foundTags.length).toBe(1);
            });
    });
});
