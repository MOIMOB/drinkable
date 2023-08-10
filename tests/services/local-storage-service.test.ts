import { CocktailInformation } from 'domain/entities/cocktail-information';
import { LocalStorageService, StorageKey } from 'services/local-storage-service';

describe('LocalStorageService', () => {
    let sut: LocalStorageService;

    beforeEach(async () => {
        sut = new LocalStorageService();
        await sut.initialize();
    });

    afterEach(() => {
        window.localStorage.clear();
    });

    test('No state. Get should not return undefined', () => {
        expect(sut.getCocktailInformation()).toBeTruthy();
        expect(sut.getCocktails()).toBeTruthy();
        expect(sut.getIngredientIds()).toBeTruthy();
        expect(sut.getIngredients()).toBeTruthy();
        expect(sut.getMessuarementSystem()).toBeTruthy();
        expect(sut.getSettings()).toBeTruthy();
        expect(sut.getWidgetOrder()).toBeTruthy();
    });

    test('KeyExists - Not found, should return false', async () => {
        const result = await sut.keyExists('test');
        expect(result).toBe(false);
    });

    test('KeyExists - Found, should return true', async () => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Metric');

        const result = await sut.keyExists(StorageKey.MessuarementSystem);
        expect(result).toBe(true);
    });

    test('Initialize - Map from old numbers array', async () => {
        window.localStorage.setItem('CapacitorStorage.saved-ingredients', JSON.stringify([1, 2, 3]));
        await sut.initialize();

        const result = sut.getIngredientIds();

        expect(result).toHaveLength(3);
        expect(result).toStrictEqual(['1', '2', '3']);
    });

    test('Initialize - Map new array', async () => {
        window.localStorage.setItem('CapacitorStorage.saved-ingredients', JSON.stringify(['1', '2', '3']));
        await sut.initialize();

        const result = sut.getIngredientIds();

        expect(result).toHaveLength(3);
        expect(result).toStrictEqual(['1', '2', '3']);
    });

    test('Initialize - Migrate from FavoriteCocktails', async () => {
        const key = 'CapacitorStorage.favorite-cocktails';
        window.localStorage.setItem(key, JSON.stringify(['1', '2', '3']));
        await sut.initialize();

        const cocktailInformation = JSON.parse(
            window.localStorage.getItem('CapacitorStorage.cocktail-information')
        ) as CocktailInformation[];

        expect(cocktailInformation.length).toBe(3);

        for (let i = 1; i < cocktailInformation.length; i++) {
            const element = cocktailInformation[i - 1];
            expect(element.id).toBe(i.toString());
            expect(element.isFavorite).toBe(true);
        }

        expect(window.localStorage.getItem(key)).toBeNull();
    });

    test('Initialize - Migrate from FavoriteCocktails - existing rating', async () => {
        const key = 'CapacitorStorage.favorite-cocktails';
        const informationKey = 'CapacitorStorage.cocktail-information';

        window.localStorage.setItem(key, JSON.stringify(['1', '2', '3']));
        window.localStorage.setItem(
            informationKey,
            JSON.stringify([
                {
                    id: '1',
                    rating: 5
                }
            ])
        );

        await sut.initialize();

        const cocktailInformation = JSON.parse(
            window.localStorage.getItem('CapacitorStorage.cocktail-information')
        ) as CocktailInformation[];

        expect(cocktailInformation.length).toBe(3);
        expect(window.localStorage.getItem(key)).toBeNull();
        expect(cocktailInformation[0].rating).toBeTruthy();
        expect(cocktailInformation[1].rating).toBeUndefined();
        expect(cocktailInformation[2].rating).toBeUndefined();
    });
});
