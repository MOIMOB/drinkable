import { LocalStorageService } from 'services/local-storage-service';
import { inject, observable } from 'aurelia-framework';
import { getCocktails } from 'functions/cocktail-functions';
import { Cocktail } from 'models/cocktail';
import { CocktailViewModel } from 'components/dialog-view-models/cocktail-view-model';
import { DialogService } from 'aurelia-dialog';

@inject(LocalStorageService, DialogService)
export class Cocktails {
    @observable public searchFilter: string;
    public filteredCocktails: Cocktail[] = [];

    private _cocktails = getCocktails();

    constructor(private _localStorageService: LocalStorageService, private _dialogService: DialogService) {}

    activate() {
        this.filteredCocktails = this._cocktails;
    }

    searchFilterChanged(newValue: string, _: string) {
        this.filteredCocktails = this._cocktails.filter(x => x.name.toLowerCase().includes(newValue.toLowerCase()));

        if (newValue !== '') {
            this.filteredCocktails.sort(a => (a.name.toLowerCase().startsWith(newValue.toLowerCase()) ? -1 : 1));
        }
    }

    openCocktailDialog(cocktail: Cocktail) {
        this._dialogService.open({ viewModel: CocktailViewModel, model: cocktail, lock: false });
    }
}
