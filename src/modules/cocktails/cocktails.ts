import { inject, observable } from 'aurelia-framework';
import { Cocktail } from 'domain/entities/cocktail';
import { CocktailDialog } from 'components/dialogs/cocktail-dialog';
import { DialogService } from 'aurelia-dialog';
import { CocktailService } from 'services/cocktail-service';
import { createCocktailDeleteToast } from 'functions/toast-functions';

@inject(CocktailService, DialogService)
export class Cocktails {
    @observable public searchFilter: string;
    public filteredCocktails: Cocktail[] = [];

    private _cocktails = [];

    constructor(private _cocktailService: CocktailService, private _dialogService: DialogService) {}

    activate() {
        this._cocktails = this._cocktailService.getCocktails();
        this.filteredCocktails = this._cocktails;
    }

    searchFilterChanged(newValue: string, _: string) {
        this.filteredCocktails = this._cocktails.filter(x => x.name.toLowerCase().includes(newValue.toLowerCase()));

        if (newValue !== '') {
            this.filteredCocktails.sort(a => (a.name.toLowerCase().startsWith(newValue.toLowerCase()) ? -1 : 1));
        }
    }

    openCocktailDialog(cocktail: Cocktail) {
        this._dialogService.open({ viewModel: CocktailDialog, model: cocktail, lock: false }).whenClosed(response => {
            if (response.output?.action?.toLowerCase() === 'delete') {
                createCocktailDeleteToast(response.output.cocktail);
            }

            this._cocktails = this._cocktailService.getCocktails();
            this.filteredCocktails = this._cocktails;
            if (this.searchFilter !== '' && this.searchFilter !== undefined) {
                this.searchFilterChanged(this.searchFilter, '');
            }
        });
    }
}
