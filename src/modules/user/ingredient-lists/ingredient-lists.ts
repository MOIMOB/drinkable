import { DialogService } from 'aurelia-dialog';
import { autoinject } from 'aurelia-framework';
import { IngredientListDrawer } from './ingredient-list-drawer';
import { LocalStorageService } from 'services/local-storage-service';
import { IngredientList } from 'domain/entities/ingredient-list';

@autoinject
export class IngredientLists {
    public ingredientLists: IngredientList[] = [];
    public activeIngredientListId: number;

    constructor(private _dialogService: DialogService, private localStorageService: LocalStorageService) {}

    bind() {
        this.ingredientLists = this.localStorageService.getIngredientLists();
        this.activeIngredientListId = this.localStorageService.getActiveIngredientListId();
    }

    openDialog(ingredientList: IngredientList) {
        this._dialogService
            .open({ viewModel: IngredientListDrawer, model: ingredientList, lock: true })
            .whenClosed(() => {
                this.activeIngredientListId =
                    this.localStorageService.getIngredientLists().find(x => x.id === this.activeIngredientListId)?.id ??
                    0;
                this.localStorageService.setActiveIngredientListId(this.activeIngredientListId);
                this.bind();
            });
    }
}
