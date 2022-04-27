import { LocalStorageService } from 'services/local-storage-service';
import { inject } from 'aurelia-framework';
import { getCocktails } from 'functions/cocktail-functions';
import { Cocktail } from 'models/cocktail';
import { CocktailViewModel } from 'components/dialog-view-models/cocktail-view-model';
import { DialogService } from 'aurelia-dialog';

@inject(LocalStorageService, DialogService)
export class Cocktails {
    public cocktails = getCocktails();

    constructor(private _localStorageService: LocalStorageService, private _dialogService: DialogService) {}

    openCocktailDialog(cocktail: Cocktail) {
        this._dialogService.open({ viewModel: CocktailViewModel, model: cocktail, lock: false });
    }
}
