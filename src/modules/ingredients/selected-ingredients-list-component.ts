import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { LocalStorageService } from 'services/local-storage-service';

@autoinject
export class SelectedIngredientsListComponent {
    public ingredientListName: string;
    public showSelectedIngredientList = false;

    constructor(
        private _localStorageService: LocalStorageService,
        private _router: Router
    ) {}

    bind() {
        this.ingredientListName = this._localStorageService.getIngredientList().name;
        this.showSelectedIngredientList = this._localStorageService.getIngredientLists().length > 1;
    }

    navigateToUserPage() {
        this._router.navigateToRoute('user');
    }
}
