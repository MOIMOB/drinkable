import { MessuarementSystem } from 'domain/enums/messuarement-system';
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
        expect(sut.getFavoriteCocktails()).toBeTruthy();
        expect(sut.getIngredientIds()).toBeTruthy();
        expect(sut.getIngredients()).toBeTruthy();
        expect(sut.getMessuarementSystem()).toBeTruthy();
        expect(sut.getSettings()).toBeTruthy();
        expect(sut.getWidgetOrder()).toBeTruthy();
    });

    test('KeyExists - Not found, should return false', async () => {
        let result = await sut.keyExists('test');
        expect(result).toBe(false);
    });

    test('KeyExists - Found, should return true', async () => {
        window.localStorage.setItem('CapacitorStorage.messuarement-system', 'Metric');

        let result = await sut.keyExists(StorageKey.MessuarementSystem);
        expect(result).toBe(true);
    });

    test('Initialize - Map from old numbers array', async () => {
        window.localStorage.setItem('CapacitorStorage.saved-ingredients', JSON.stringify([1, 2, 3]));
        await sut.initialize();

        let result = sut.getIngredientIds();

        expect(result).toHaveLength(3);
        expect(result).toStrictEqual(['1', '2', '3']);
    });

    test('Initialize - Map new array', async () => {
        window.localStorage.setItem('CapacitorStorage.saved-ingredients', JSON.stringify(['1', '2', '3']));
        await sut.initialize();

        let result = sut.getIngredientIds();

        expect(result).toHaveLength(3);
        expect(result).toStrictEqual(['1', '2', '3']);
    });
});
