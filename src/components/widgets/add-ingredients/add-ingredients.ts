import { ManageIngredientModel } from 'domain/entities/ingredient';
import { bindable, autoinject } from 'aurelia-framework';
import { LocalStorageService } from 'services/local-storage-service';
import { IngredientService } from 'services/ingredient-service';

@autoinject
export class AddIngredients {
    @bindable ingredientIds: string[];
    public ingredients: ManageIngredientModel[] = [];

    constructor(
        private _localStorageService: LocalStorageService,
        private _ingredientService: IngredientService
    ) {}
    bind() {
        this.ingredients = this._ingredientService.getRandomIngredients(3, this.ingredientIds);
    }

    async toggleIngredient(ingredient: ManageIngredientModel) {
        ingredient.isActive = !ingredient.isActive;
        if (ingredient.isActive) {
            // for aurelia Changed method to trigger on array push.
            const temp = [...this.ingredientIds];
            temp.push(ingredient.id);
            this.ingredientIds = temp;
        } else {
            this.ingredientIds = this.ingredientIds.filter(id => id !== ingredient.id);
        }
        await this._localStorageService.updateSavedIngredients(this.ingredientIds);
    }
}
