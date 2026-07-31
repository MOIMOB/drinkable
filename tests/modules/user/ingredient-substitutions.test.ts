import { IngredientSubstitutes } from 'modules/user/ingredient-substitutions/ingredient-substitutions';
import { IngredientService } from 'services/ingredient-service';
import { LocalStorageService } from 'services/local-storage-service';
import { I18N } from 'aurelia-i18n';
import { expect } from '@jest/globals';

describe('IngredientSubstitutes', () => {
    let ingredientService: IngredientService;
    let sut: IngredientSubstitutes;

    beforeEach(async () => {
        const i18n = new I18N(null, null);
        jest.spyOn(i18n, 'tr').mockReturnValue('name');

        const localStorageService = new LocalStorageService();
        await localStorageService.initialize();

        ingredientService = new IngredientService(localStorageService, i18n);
        sut = new IngredientSubstitutes(ingredientService);
    });

    afterEach(() => {
        window.localStorage.clear();
    });

    test('activate - loads substitutions and highlighted ingredient', () => {
        sut.activate({ ingredientId: '2' });

        expect(sut.highlightedIngredientId).toBe('2');
        expect(sut.defaultSubstitutions.find(x => x.id === '2')).toBeDefined();
        expect(sut.allIngredients.length).toBeGreaterThan(0);
    });

    test('openAddForm - resets form state', () => {
        sut.activate({});
        sut.selectedSourceId = '8';
        sut.selectedReplacementIds = ['106'];
        sut.note = 'leftover';

        sut.openAddForm();

        expect(sut.isFormOpen).toBe(true);
        expect(sut.editingIngredientId).toBeUndefined();
        expect(sut.selectedSourceId).toBe('');
        expect(sut.selectedReplacementIds).toStrictEqual([]);
        expect(sut.note).toBe('');
    });

    test('openEditForm - prefills from existing user substitution', async () => {
        await ingredientService.saveUserSubstitution('8', ['106'], 'Vesper note');
        sut.activate({});

        const item = sut.userSubstitutions.find(x => x.id === '8');
        sut.openEditForm(item);

        expect(sut.isFormOpen).toBe(true);
        expect(sut.editingIngredientId).toBe('8');
        expect(sut.selectedSourceId).toBe('8');
        expect(sut.selectedReplacementIds).toStrictEqual(['106']);
        expect(sut.note).toBe('Vesper note');
    });

    test('canSave - false without source or replacements, true once both set', () => {
        sut.activate({});
        sut.openAddForm();

        expect(sut.canSave).toBe(false);

        sut.selectedSourceId = '8';
        expect(sut.canSave).toBe(false);

        // Mirrors what the native checkbox-array binding does: mutate in place, not reassign
        sut.selectedReplacementIds.push('106');
        expect(sut.canSave).toBe(true);
    });

    test('filteredReplacementCandidates - excludes source ingredient and applies text filter', () => {
        sut.activate({});
        sut.selectedSourceId = '8';
        sut.replacementFilter = '';

        expect(sut.filteredReplacementCandidates.some(x => x.id === '8')).toBe(false);

        sut.replacementFilter = 'zzz-does-not-exist';
        expect(sut.filteredReplacementCandidates).toStrictEqual([]);
    });

    test('save - persists substitution and closes form', async () => {
        sut.activate({});
        sut.openAddForm();
        sut.selectedSourceId = '8';
        sut.selectedReplacementIds = ['106'];
        sut.note = 'test note';

        await sut.save();

        expect(sut.isFormOpen).toBe(false);
        expect(ingredientService.getUserSubstitution('8')).toStrictEqual({
            ingredientId: '8',
            replacementIds: ['106'],
            note: 'test note'
        });
        expect(sut.userSubstitutions.find(x => x.id === '8')).toBeDefined();
    });

    test('save - no-op when form is invalid', async () => {
        sut.activate({});
        sut.openAddForm();

        await sut.save();

        expect(sut.isFormOpen).toBe(true);
        expect(ingredientService.getUserSubstitution('8')).toBeUndefined();
    });

    test('remove - deletes user substitution and reloads list', async () => {
        await ingredientService.saveUserSubstitution('8', ['106']);
        sut.activate({});

        await sut.remove('8');

        expect(ingredientService.getUserSubstitution('8')).toBeUndefined();
        expect(sut.userSubstitutions.find(x => x.id === '8')).toBeUndefined();
        expect(sut.defaultSubstitutions.find(x => x.id === '8')).toBeUndefined();
    });
});
