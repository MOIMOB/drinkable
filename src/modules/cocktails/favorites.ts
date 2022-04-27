import { LocalStorageService } from 'services/local-storage-service';
import { inject } from 'aurelia-framework';
import { getCocktails, getCocktailsByIds } from 'functions/cocktail-functions';
import { Cocktail } from 'models/cocktail';
import { CocktailViewModel } from 'components/dialog-view-models/cocktail-view-model';
import { DialogService } from 'aurelia-dialog';

@inject(LocalStorageService, DialogService)
export class Cocktails {
    public cocktails: Cocktail[];

    constructor(private _localStorageService: LocalStorageService, private _dialogService: DialogService) {}

    activate() {
        this.updateCocktails();
    }

    openCocktailDialog(cocktail: Cocktail) {
        this._dialogService.open({ viewModel: CocktailViewModel, model: cocktail, lock: false }).whenClosed(() => {
            this.updateCocktails();
        });
    }

    updateCocktails() {
        const ids = this._localStorageService.getFavoriteCocktails();
        this.cocktails = getCocktailsByIds(ids);
    }
}
