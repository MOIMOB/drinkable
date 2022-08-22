import { LocalStorageService } from 'services/local-storage-service';
import { inject } from 'aurelia-framework';
import { Cocktail } from 'models/cocktail';
import { CocktailViewModel } from 'components/dialog-view-models/cocktail-view-model';
import { DialogService } from 'aurelia-dialog';
import { CocktailService } from 'services/cocktail-service';
import { createCocktailDeleteToast } from 'functions/toast-functions';

@inject(LocalStorageService, DialogService, CocktailService)
export class Cocktails {
    public cocktails: Cocktail[];

    constructor(
        private _localStorageService: LocalStorageService,
        private _dialogService: DialogService,
        private _cocktailService: CocktailService
    ) {}

    activate() {
        this.updateCocktails();
    }

    openCocktailDialog(cocktail: Cocktail) {
        this._dialogService
            .open({ viewModel: CocktailViewModel, model: cocktail, lock: false })
            .whenClosed(response => {
                if (response.output?.action?.toLowerCase() === 'delete') {
                    createCocktailDeleteToast(response.output.cocktail);
                }
                this.updateCocktails();
            });
    }

    updateCocktails() {
        const ids = this._localStorageService.getFavoriteCocktails();
        this.cocktails = this._cocktailService.getCocktailsByIds(ids);
    }
}
