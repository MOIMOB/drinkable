import { CreateIngredientRequest, IngredientService, UpdateIngredientRequest } from 'services/ingredient-service';
import { LocalStorageService } from 'services/local-storage-service';
import { I18N } from 'aurelia-i18n';
import { SpiritType } from 'domain/enums/spirit-type';

describe('IngredientService', () => {
    let localStorageService: LocalStorageService;
    let sut: IngredientService;

    beforeEach(async () => {
        localStorageService = new LocalStorageService();
        await localStorageService.initialize();

        let i18n = new I18N(null, null);
        jest.spyOn(i18n, 'tr').mockReturnValue('name');
        sut = new IngredientService(localStorageService, i18n);
    });

    afterEach(() => {
        window.localStorage.clear();
    });

    describe('GET', () => {
        test('Get Ingredients - No initial state', () => {
            expect(sut.getIngredients().length).toBeGreaterThan(0);
            expect(sut.getCreatedIngredients()).toHaveLength(0);
        });

        test('Get Random Ingredients', () => {
            expect(sut.getRandomIngredients(0)).toHaveLength(0);
            expect(sut.getRandomIngredients(3)).toHaveLength(3);
        });

        test('getIngredientAndReplacementIds - Ingredient not found', () => {
            expect(sut.getIngredientAndReplacementIds('error')).toStrictEqual([]);
        });
    });

    describe('Create', () => {
        test('Create Ingredient', async () => {
            let key = 'CapacitorStorage.ingredients';
            expect(window.localStorage.getItem(key)).toBeNull();

            let createIngredientRequest: CreateIngredientRequest = {
                name: 'Test'
            };

            let ingredient = await sut.createIngredient(createIngredientRequest);
            expect(ingredient.id).toBe('x-1');

            expect(window.localStorage.getItem(key)).toBeTruthy();
            expect(sut.getCreatedIngredients()).toStrictEqual([ingredient]);
            expect(sut.getIngredients()).toContain(ingredient);
        });
    });

    describe('Update', () => {
        test('Update Ingredient', async () => {
            let createIngredientRequest: CreateIngredientRequest = {
                name: 'Test'
            };

            let ingredient = await sut.createIngredient(createIngredientRequest);

            const updateIngredientRequest: UpdateIngredientRequest = {
                id: ingredient.id,
                name: 'updated',
                abv: 100,
                spiritType: SpiritType.Rum
            };

            await sut.updateIngredient(updateIngredientRequest);

            let updatedIngredient = sut.getCreatedIngredients()[0];

            expect(updatedIngredient.id).toBe(ingredient.id);
            expect(updatedIngredient.abv).toBe(updateIngredientRequest.abv);
            expect(updatedIngredient.spiritType).toBe(updateIngredientRequest.spiritType);
        });
    });

    describe('Delete', () => {
        test('Delete Ingredient', async () => {
            let createIngredientRequest: CreateIngredientRequest = {
                name: 'Test'
            };

            let ingredient = await sut.createIngredient(createIngredientRequest);

            await sut.deleteIngredient(ingredient.id);

            expect(sut.getCreatedIngredients()).toStrictEqual([]);
            expect(sut.getIngredientById(ingredient.id)).toBeUndefined();
        });
    });
});
