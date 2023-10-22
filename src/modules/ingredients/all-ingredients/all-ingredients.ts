import { ManageIngredientModel } from 'domain/entities/ingredient';
import { LocalStorageService } from 'services/local-storage-service';
import { inject } from 'aurelia-framework';
import { AlphabeticalGroup, ToAlphabeticalGroup } from 'domain/models/alphabetical-group';
import { IngredientService } from 'services/ingredient-service';

@inject(LocalStorageService, IngredientService)
export class AllIngredients {
    public ingredients: AlphabeticalGroup<ManageIngredientModel>[] = [];
    public activeIngredientIds: string[] = [];

    constructor(
        private _localStorageService: LocalStorageService,
        private _ingredientService: IngredientService
    ) {}

    bind() {
        this.activeIngredientIds = this._localStorageService.getIngredientIds();

        const ingredientModels = this._ingredientService.getManageIngredientModels(this.activeIngredientIds);

        this.ingredients = ToAlphabeticalGroup<ManageIngredientModel>(ingredientModels);
    }

    public async toggleIngredient(ingredientModel: ManageIngredientModel) {
        ingredientModel.isActive = !ingredientModel.isActive;

        if (ingredientModel.isActive) {
            this.activeIngredientIds.push(ingredientModel.id);
        } else {
            this.activeIngredientIds = this.activeIngredientIds.filter(x => x !== ingredientModel.id);
        }
        await this._localStorageService.updateSavedIngredients(this.activeIngredientIds);
    }
}
