import { LocalStorageService, StorageKey } from 'services/local-storage-service';
import { expect } from '@jest/globals';
import { IngredientList } from 'domain/entities/ingredient-list';

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
});
