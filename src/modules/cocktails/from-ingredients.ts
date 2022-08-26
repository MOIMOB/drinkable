import { LocalStorageService } from 'services/local-storage-service';
import { inject } from 'aurelia-framework';
import { Cocktail } from 'models/cocktail';
import { CocktailDialog } from 'components/dialogs/cocktail-dialog';
import { DialogService } from 'aurelia-dialog';
import { CocktailService } from 'services/cocktail-service';
import { createCocktailDeleteToast } from 'functions/toast-functions';

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
        this.updateCocktails();
    }

    openCocktailDialog(cocktail: Cocktail) {
        this._dialogService.open({ viewModel: CocktailDialog, model: cocktail, lock: false }).whenClosed(response => {
            if (response.output?.action?.toLowerCase() === 'delete') {
                createCocktailDeleteToast(response.output.cocktail);
            }
            this.updateCocktails();
        });
    }

    updateCocktails() {
        const ingredientIds = this._localStorageService.getIngredientIds();
        this.cocktails = this._cocktailService.getCocktailsByIngredientIds(ingredientIds);
        this.cocktailsWithMissingIngredients = this._cocktailService.getCocktailsByIngredientIds2(ingredientIds, 1);
    }
}
