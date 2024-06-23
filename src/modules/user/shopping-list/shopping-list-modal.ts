import { DialogController } from 'aurelia-dialog';
import { autoinject } from 'aurelia-framework';
import { ShoppingList } from './shopping-list-models';
import { IngredientService } from 'services/ingredient-service';
import { ManageIngredientModel } from 'domain/entities/ingredient';
import { LocalStorageService } from 'services/local-storage-service';

@autoinject
export class ShoppingListModal {
    public shoppingList: ShoppingList;

    public ingredients: ManageIngredientModel[] = [];

    public shoppedIngredients: ManageIngredientModel[] = [];
    public unshoppedIngredients: ManageIngredientModel[] = [];

    constructor(
        private _dialogController: DialogController,
        private _ingredientService: IngredientService,
        private _localStorageService: LocalStorageService
    ) {}

    activate(model: ShoppingList) {
        this.shoppingList = model;

        this.ingredients = model.ingredients.map(ingredientElement => {
            const ingredient = this._ingredientService.getIngredientById(ingredientElement.id) as ManageIngredientModel;
            ingredient.isActive = ingredientElement.shopped;
            return ingredient;
        });

        this.updateLists();
    }

    private updateLists() {
        this.shoppedIngredients = this.ingredients.filter(ingredient => ingredient.isActive);
        this.unshoppedIngredients = this.ingredients.filter(ingredient => !ingredient.isActive);
    }

    cancel() {
        this._dialogController.cancel();
    }

    addIngredient(ingredient: ManageIngredientModel) {
        ingredient.isActive = false;
        this._localStorageService.updateShoppingList({
            id: this.shoppingList.id,
            ingredients: this.ingredients.map(x => ({ id: x.id, shopped: false }))
        });

        this.unshoppedIngredients.unshift(ingredient);
    }

    updateIngredient() {
        this._localStorageService.updateShoppingList({
            id: this.shoppingList.id,
            ingredients: this.ingredients.map(x => ({ id: x.id, shopped: x.isActive }))
        });
        this.updateLists();
    }

    deleteShopped() {
        this.ingredients = this.ingredients.filter(x => !x.isActive);

        this._localStorageService.updateShoppingList({
            id: this.shoppingList.id,
            ingredients: this.ingredients.map(x => ({ id: x.id, shopped: false }))
        });
        this.updateLists();
    }

    restoreShopped() {
        this.ingredients.forEach(x => {
            x.isActive = false;
        });

        this._localStorageService.updateShoppingList({
            id: this.shoppingList.id,
            ingredients: this.ingredients.map(x => ({ id: x.id, shopped: x.isActive }))
        });

        this.updateLists();
    }
}
