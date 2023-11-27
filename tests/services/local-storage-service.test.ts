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

    test('Initialize - Migrate from Saved Ingredients', async () => {
        const key = 'CapacitorStorage.saved-ingredients';

        window.localStorage.setItem(key, JSON.stringify(['1', '2', '3']));

        await sut.initialize();

        const ingredientLists = JSON.parse(
            window.localStorage.getItem('CapacitorStorage.ingredient-lists')
        ) as IngredientList[];

        expect(window.localStorage.getItem(key)).toBeNull();

        expect(ingredientLists.length).toBe(1);
        expect(ingredientLists[0].ingredients).toEqual(['1', '2', '3']);
        expect(ingredientLists[0].id).toBe(0);
        expect(ingredientLists[0].name).toBe('My Bar');
    });

    test('Initialize - Remove Ingredient with id 150', async () => {
        const key = 'CapacitorStorage.' + StorageKey.IngredientLists;

        window.localStorage.setItem(
            key,
            JSON.stringify([
                { name: 'My Bar', ingredients: ['1', '150'] },
                { name: 'Test', ingredients: ['150', '2'] }
            ])
        );

        await sut.initialize();

        const ingredientLists = JSON.parse(window.localStorage.getItem(key)) as IngredientList[];
        expect(ingredientLists.length).toBe(2);
        expect(ingredientLists[0].ingredients).toEqual(['1']);
        expect(ingredientLists[1].ingredients).toEqual(['2']);
    });
});
