import { LocalStorageService } from 'services/local-storage-service';
import { inject } from 'aurelia-framework';
import { Cocktail } from 'models/cocktail';
import { CocktailViewModel } from 'components/dialog-view-models/cocktail-view-model';
import { DialogService } from 'aurelia-dialog';
import { CocktailService } from 'services/cocktail-service';

@inject(LocalStorageService, DialogService, CocktailService)
export class Cocktails {
    public cocktails: Cocktail[];
    public cocktailsWithMissingIngredients: Cocktail[];
    public isOpen = false;

    constructor(
        private _localStorageService: LocalStorageService,
        private _dialogService: DialogService,
        private _cocktailService: CocktailService
    ) {}

    toggleIsOpen() {
        this.isOpen = !this.isOpen;
    }

    activate() {
        const ingredientIds = this._localStorageService.getIngredientIds();
        this.cocktails = this._cocktailService.getCocktailsByIngredientIds(ingredientIds);

        this.cocktailsWithMissingIngredients = this._cocktailService.getCocktailsByIngredientIds2(ingredientIds, 1);
    }

    openCocktailDialog(cocktail: Cocktail) {
        this._dialogService.open({ viewModel: CocktailViewModel, model: cocktail, lock: false });
    }
}
