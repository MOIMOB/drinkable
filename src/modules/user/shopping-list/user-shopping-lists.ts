import { DialogService } from 'aurelia-dialog';
import { autoinject } from 'aurelia-framework';
import { ShoppingListDrawer } from './shopping-list-drawer';
import { ShoppingListModal } from './shopping-list-modal';
import { ShoppingList } from './shopping-list-models';
import { LocalStorageService } from 'services/local-storage-service';

@autoinject
export class UserShoppingLists {
    public shoppingLists: ShoppingList[] = [];

    constructor(
        private _dialogService: DialogService,
        private _localStorageService: LocalStorageService
    ) {}

    activate() {
        this.shoppingLists = this._localStorageService.getShoppingLists();
    }

    openShoppingList(list: ShoppingList) {
        this._dialogService.open({ viewModel: ShoppingListModal, model: list, lock: true }).whenClosed(() => {
            this.shoppingLists = this._localStorageService.getShoppingLists();
        });
    }

    createShoppingList() {
        this._dialogService.open({ viewModel: ShoppingListDrawer, model: null, lock: true }).whenClosed(response => {
            if (!response.wasCancelled) {
                this.shoppingLists = this._localStorageService.getShoppingLists();
            }
        });
    }

    editName(list: ShoppingList) {
        this._dialogService.open({ viewModel: ShoppingListDrawer, model: list, lock: true }).whenClosed(response => {
            if (!response.wasCancelled) {
                this.shoppingLists = this._localStorageService.getShoppingLists();
            }
        });
    }

    delete(list: ShoppingList) {
        this._localStorageService.deleteShoppingList(list.id);
        this.shoppingLists = this._localStorageService.getShoppingLists();
    }
}
