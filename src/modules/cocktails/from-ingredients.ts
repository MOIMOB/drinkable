import { LocalStorageService } from 'services/local-storage-service';
import { inject } from 'aurelia-framework';
import { getCocktailsByIngredientIds, getCocktailsByIngredientIds2 } from 'functions/cocktail-functions';
import { Cocktail } from 'models/cocktail';
import { CocktailViewModel } from 'components/dialog-view-models/cocktail-view-model';
import { DialogService } from 'aurelia-dialog';

@inject(LocalStorageService, DialogService)
export class Cocktails {
    public cocktails: Cocktail[];
    public cocktailsWithMissingIngredients: Cocktail[];
    public isOpen = false;

    constructor(private _localStorageService: LocalStorageService, private _dialogService: DialogService) {}

    toggleIsOpen() {
        this.isOpen = !this.isOpen;
    }

    activate() {
        const ingredientIds = this._localStorageService.getIngredientIds();
        this.cocktails = getCocktailsByIngredientIds(ingredientIds);

        this.cocktailsWithMissingIngredients = getCocktailsByIngredientIds2(ingredientIds, 1);
    }

    openCocktailDialog(cocktail: Cocktail) {
        this._dialogService.open({ viewModel: CocktailViewModel, model: cocktail, lock: false });
    }
}
