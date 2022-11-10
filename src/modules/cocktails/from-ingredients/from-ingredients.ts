import { LocalStorageService } from 'services/local-storage-service';
import { inject } from 'aurelia-framework';
import { Cocktail } from 'domain/entities/cocktail';
import { CocktailDialog } from 'components/dialogs/cocktail-dialog';
import { DialogService } from 'aurelia-dialog';
import { CocktailService } from 'services/cocktail-service';
import { createCocktailDeleteToast } from 'functions/toast-functions';

@inject(LocalStorageService, DialogService, CocktailService)
export class FromIngredients {
    public cocktails: Cocktail[];
    public cocktailsWithMissingIngredient: Cocktail[];
    public isOpen = false;

    constructor(
        private _localStorageService: LocalStorageService,
        private _dialogService: DialogService,
        private _cocktailService: CocktailService
    ) {}

    bind() {
        const ingredientIds = this._localStorageService.getIngredientIds();
        this.cocktails = this._cocktailService.getCocktailsByIngredientIds(ingredientIds);

        this.cocktailsWithMissingIngredient = this._cocktailService.getCocktailsWithMissingIngredients(ingredientIds);
    }

    toggleIsOpen() {
        this.isOpen = !this.isOpen;
    }

    openCocktailDialog(event: Event, cocktail: Cocktail) {
        event.stopPropagation();
        this._dialogService.open({ viewModel: CocktailDialog, model: cocktail, lock: false }).whenClosed(response => {
            if (response.output?.action?.toLowerCase() === 'delete') {
                createCocktailDeleteToast(response.output.cocktail);
            }
            this.bind();
        });
    }
}
