import { DialogService } from 'aurelia-dialog';
import { autoinject } from 'aurelia-framework';
import { ShoppingListDrawer } from './shopping-list-drawer';
import { ShoppingListModal } from './shopping-list-modal';
import { ShoppingList } from './shopping-list-models';
import { ShoppingListService } from 'services/shopping-list-service';

@autoinject
export class UserShoppingLists {
    public shoppingLists: ShoppingList[] = [];

    constructor(
        private _dialogService: DialogService,
        private _shoppingListService: ShoppingListService
    ) {}

    activate() {
        this.shoppingLists = this._shoppingListService.getShoppingLists();
    }

    openShoppingList(list: ShoppingList) {
        this._dialogService.open({ viewModel: ShoppingListModal, model: list, lock: true }).whenClosed(() => {
            this.shoppingLists = this._shoppingListService.getShoppingLists();
        });
    }

    createShoppingList() {
        this._dialogService.open({ viewModel: ShoppingListDrawer, model: null, lock: true }).whenClosed(response => {
            if (!response.wasCancelled) {
                this.shoppingLists = this._shoppingListService.getShoppingLists();
            }
        });
    }

    editName(list: ShoppingList) {
        this._dialogService.open({ viewModel: ShoppingListDrawer, model: list, lock: true }).whenClosed(response => {
            if (!response.wasCancelled) {
                this.shoppingLists = this._shoppingListService.getShoppingLists();
            }
        });
    }

    delete(list: ShoppingList) {
        this._shoppingListService.deleteShoppingList(list.id);
        this.shoppingLists = this._shoppingListService.getShoppingLists();
    }
}
