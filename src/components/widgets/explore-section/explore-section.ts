import { Cocktail } from 'domain/entities/cocktail';
import { autoinject } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { CocktailDialog } from 'components/dialogs/cocktail-dialog';
import { CocktailService } from 'services/cocktail-service';
import { createCocktailDeleteToast } from 'functions/toast-functions';

@autoinject
export class ExploreSection {
    public cocktails: Cocktail[] = [];
    private _cocktailCount = 5;

    constructor(private _dialogService: DialogService, private _cocktailService: CocktailService) {}

    bind() {
        this.cocktails = this._cocktailService.getRandomCocktails(this._cocktailCount);
    }

    openDialog(cocktail: Cocktail) {
        this._dialogService.open({ viewModel: CocktailDialog, model: cocktail, lock: false }).whenClosed(response => {
            if (response.output?.action?.toLowerCase() === 'delete') {
                createCocktailDeleteToast(response.output.cocktail);
                this.cocktails = this.cocktails.filter(x => x.id !== cocktail.id);
            }
        });
    }
}
