import { autoinject } from 'aurelia-framework';
import { LocalStorageService } from './local-storage-service';
import {
    CreateShoppingListRequest,
    ShoppingList,
    UpdateShoppingListRequest
} from 'modules/user/shopping-list/shopping-list-models';

@autoinject
export class ShoppingListService {
    private _shoppingLists: ShoppingList[] = [];

    constructor(private _localStorageService: LocalStorageService) {
        this._shoppingLists = this._localStorageService.getShoppingLists();
    }

    public getShoppingLists() {
        return this._shoppingLists;
    }

    public createShoppingList(request: CreateShoppingListRequest) {
        const newShoppingList: ShoppingList = {
            name: request.name,
            ingredients: [],
            id: this.setShoppingListId()
        };

        this._shoppingLists.push(newShoppingList);
        this._localStorageService.updateShoppingLists(this._shoppingLists);
    }
    setShoppingListId() {
        if (this._shoppingLists.length === 0) {
            return 1;
        }

        return this._shoppingLists.sort((a, b) => b.id - a.id)[0].id + 1;
    }

    public updateShoppingList(request: UpdateShoppingListRequest) {
        const shoppingListToUpdate = this._shoppingLists.find(x => x.id === request.id);

        if (request.name) {
            shoppingListToUpdate.name = request.name;
        }

        if (request.ingredients) {
            shoppingListToUpdate.ingredients = request.ingredients;
        }

        this._localStorageService.updateShoppingLists(this._shoppingLists);
    }

    public deleteShoppingList(id: number) {
        this._shoppingLists = this._shoppingLists.filter(x => x.id !== id);
        this._localStorageService.updateShoppingLists(this._shoppingLists);
    }
}
