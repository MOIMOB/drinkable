import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { LocalStorageService } from 'services/local-storage-service';
import { IngredientService } from 'services/ingredient-service';
import { ShoppingList } from 'modules/user/shopping-list/shopping-list-models';

@autoinject
export class ShoppingListWidget {
    public shoppingListItems: ShoppingListWidgetItem[] = [];

    constructor(
        private _router: Router,
        private _localStorageService: LocalStorageService,
        private _ingredientService: IngredientService
    ) {}

    bind() {
        this.shoppingListItems = this._localStorageService
            .getShoppingLists()
            .map(list => ({
                list,
                itemsToBuy: list.ingredients
                    .filter(x => !x.shopped)
                    .map(x => this._ingredientService.getIngredientById(x.id)?.name)
                    .filter(name => name !== undefined)
            }))
            .filter(x => x.itemsToBuy.length > 0);
    }

    navigateToShoppingLists() {
        this._router.navigate('#/user/shopping-lists');
    }
}

type ShoppingListWidgetItem = {
    list: ShoppingList;
    itemsToBuy: string[];
};
