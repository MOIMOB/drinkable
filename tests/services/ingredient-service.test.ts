import { CreateIngredientRequest, IngredientService, UpdateIngredientRequest } from 'services/ingredient-service';
import { LocalStorageService } from 'services/local-storage-service';
import { I18N } from 'aurelia-i18n';
import { SpiritType } from 'domain/enums/spirit-type';
import { expect } from '@jest/globals';

describe('IngredientService', () => {
    let localStorageService: LocalStorageService;
    let sut: IngredientService;

    beforeEach(async () => {
        const i18n = new I18N(null, null);
        jest.spyOn(i18n, 'tr').mockReturnValue('name');

        localStorageService = new LocalStorageService();
        await localStorageService.initialize();

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
            const key = 'CapacitorStorage.ingredients';
            expect(window.localStorage.getItem(key)).toBeNull();

            const createIngredientRequest: CreateIngredientRequest = {
                name: 'Test'
            };

            const ingredient = await sut.createIngredient(createIngredientRequest);
            expect(ingredient.id).toBe('x-1');

            expect(window.localStorage.getItem(key)).toBeTruthy();
            expect(sut.getCreatedIngredients()).toStrictEqual([ingredient]);
            expect(sut.getIngredients()).toContain(ingredient);
        });
    });

    describe('Update', () => {
        test('Update Ingredient', async () => {
            const createIngredientRequest: CreateIngredientRequest = {
                name: 'Test'
            };

            const ingredient = await sut.createIngredient(createIngredientRequest);

            const updateIngredientRequest: UpdateIngredientRequest = {
                id: ingredient.id,
                name: 'updated',
                abv: 100,
                spiritType: SpiritType.Rum
            };

            await sut.updateIngredient(updateIngredientRequest);

            const updatedIngredient = sut.getCreatedIngredients()[0];

            expect(updatedIngredient.id).toBe(ingredient.id);
            expect(updatedIngredient.abv).toBe(updateIngredientRequest.abv);
            expect(updatedIngredient.spiritType).toBe(updateIngredientRequest.spiritType);
        });
    });

    describe('Delete', () => {
        test('Delete Ingredient', async () => {
            const createIngredientRequest: CreateIngredientRequest = {
                name: 'Test'
            };

            const ingredient = await sut.createIngredient(createIngredientRequest);

            await sut.deleteIngredient(ingredient.id);

            expect(sut.getCreatedIngredients()).toStrictEqual([]);
            expect(sut.getIngredientById(ingredient.id)).toBeUndefined();
        });
    });

    describe('User substitutions', () => {
        test('No user substitutions - built in substitutes still returned', () => {
            // Ingredient '2' (lime-juice) has a static replacementId of '106' (lime)
            const limeJuice = sut.getIngredinetWithsubstitutions().find(x => x.id === '2');

            expect(limeJuice).toBeDefined();
            expect(limeJuice.isUserDefined).toBe(false);
            expect(limeJuice.note).toBeUndefined();
            expect(sut.getUserSubstitution('2')).toBeUndefined();
        });

        test('Save user substitution - adds substitute and note, resolves custom ingredient name', async () => {
            const cocchi = await sut.createIngredient({ name: 'Cocchi Americano' });

            // Ingredient '8' (vodka) has no static substitutes
            await sut.saveUserSubstitution('8', [cocchi.id], 'Great in a Vesper');

            const vodka = sut.getIngredinetWithsubstitutions().find(x => x.id === '8');

            expect(vodka).toBeDefined();
            expect(vodka.isUserDefined).toBe(true);
            expect(vodka.note).toBe('Great in a Vesper');
            expect(vodka.substitutions).toContain('Cocchi Americano');
            expect(sut.getIngredientAndReplacementIds('8')).toContain(cocchi.id);
        });

        test('Save user substitution - persists to local storage', async () => {
            const key = 'CapacitorStorage.user-substitutions';
            expect(window.localStorage.getItem(key)).toBeNull();

            await sut.saveUserSubstitution('8', ['106']);

            expect(window.localStorage.getItem(key)).toBeTruthy();
            expect(localStorageService.getUserSubstitutions()).toStrictEqual([
                { ingredientId: '8', replacementIds: ['106'], note: undefined }
            ]);
        });

        test('Save user substitution twice for same ingredient - replaces previous entry', async () => {
            await sut.saveUserSubstitution('8', ['106'], 'first');
            await sut.saveUserSubstitution('8', ['105'], 'second');

            expect(sut.getUserSubstitution('8')).toStrictEqual({
                ingredientId: '8',
                replacementIds: ['105'],
                note: 'second'
            });
        });

        test('Delete user substitution - removes it', async () => {
            await sut.saveUserSubstitution('8', ['106']);

            await sut.deleteUserSubstitution('8');

            expect(sut.getUserSubstitution('8')).toBeUndefined();
            expect(sut.getIngredinetWithsubstitutions().find(x => x.id === '8')).toBeUndefined();
        });
    });
});
