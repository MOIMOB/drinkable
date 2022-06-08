import { getManageIngredientModels } from 'functions/ingredient-functions';
import { ManageIngredientModel } from 'models/ingredient';
import { LocalStorageService } from 'services/local-storage-service';
import { inject } from 'aurelia-framework';

@inject(LocalStorageService)
export class Ingredients {
    public ingredients: ManageIngredientModel[] = [];
    public activeIngredientIds: number[] = [];

    constructor(private _localStorageService: LocalStorageService) {}

    activate() {
        this.activeIngredientIds = this._localStorageService.getIngredientIds();
        this.ingredients = getManageIngredientModels(this.activeIngredientIds);
    }

    public toggleIngredient(ingredientModel: ManageIngredientModel) {
        ingredientModel.isActive = !ingredientModel.isActive;

        if (ingredientModel.isActive) {
            this.activeIngredientIds.push(ingredientModel.id);
        } else {
            this.activeIngredientIds = this.activeIngredientIds.filter(x => x !== ingredientModel.id);
        }
        this._localStorageService.updateIngredients(this.activeIngredientIds);
    }
}
