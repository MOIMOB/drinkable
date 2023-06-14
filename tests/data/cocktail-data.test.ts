import { getStaticCocktails } from 'data/cocktail-data';
import { Tag } from 'data/tags-data';
describe('getStaticCocktails', () => {
    test('Ids should not include duplicates', () => {
        const cocktails = getStaticCocktails();

        const ids = cocktails.map(x => x.id);

        expect(ids.length).toBe([...new Set(ids)].length);
    });

    test('IBA Cocktails should include a secondary IBA tag', () => {
        const cocktails = getStaticCocktails();

        cocktails
            .filter(x => x.tags.includes(Tag.IBA))
            .forEach(x => {
                const tags: string[] = [Tag.ContemporaryClassics, Tag.NewEraDrinks, Tag.TheUnforgettables];

                let foundTags = x.tags.filter(y => tags.includes(y));

                expect(foundTags.length).toBe(1);
            });
    });
});
