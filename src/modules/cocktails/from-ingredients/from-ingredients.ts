import { LocalStorageService } from 'services/local-storage-service';
import { autoinject } from 'aurelia-framework';
import { Cocktail } from 'domain/entities/cocktail';
import { CocktailDialog } from 'components/dialogs/cocktail-dialog/cocktail-dialog';
import { DialogService } from 'aurelia-dialog';
import { CocktailService } from 'services/cocktail-service';
import { CocktailFilterDialogModel } from 'components/dialogs/cocktail-filter-dialog';
import { IngredientService } from 'services/ingredient-service';
import { filterCocktailList } from '../filter-cocktails-helper';
import { CocktailFilterCallbackData } from '../cocktail-filter-component';
import { ManageCocktailRowDialog } from '../dialogs/manage-cocktail-row-dialog';

@autoinject
export class FromIngredients {
    public cocktails: Cocktail[];
    public cocktailsWithMissingIngredient: Cocktail[];
    public isOpen = false;

    private _cocktailsResponse: Cocktail[];
    private _cocktailsWithMissingIngredientResponse: Cocktail[];

    private _latestCallback: CocktailFilterCallbackData;

    constructor(
        private _localStorageService: LocalStorageService,
        private _dialogService: DialogService,
        private _cocktailService: CocktailService,
        private _ingredientService: IngredientService
    ) {}

    bind() {
        const ingredientIds = this._localStorageService.getIngredientIds();
        this._cocktailsResponse = this._cocktailService.getCocktailsByIngredientIds(ingredientIds);
        this._cocktailsWithMissingIngredientResponse =
            this._cocktailService.getCocktailsWithMissingIngredients(ingredientIds);

        this.update({
            filterDialogModel: this._latestCallback?.filterDialogModel || new CocktailFilterDialogModel(),
            searchText: this._latestCallback?.searchText || ''
        });
    }

    attached() {
        this.cocktails.forEach(element => {
            const bgColorClass = /*tw*/ 'bg-base-200';
            const el = document.getElementById('from-ingredients-cocktails-' + element.id);
            if (el != null) {
                el.addEventListener('long-press', () => {
                    this.openCocktailRowDialog(null, element);
                });
                el.addEventListener('long-press-timer-start', () => {
                    el.classList.add(bgColorClass);
                });
                el.addEventListener('long-press-timer-stop', () => {
                    if (el.classList.contains(bgColorClass)) {
                        el.classList.remove(bgColorClass);
                    }
                });
            }
        });
    }

    toggleIsOpen() {
        this.isOpen = !this.isOpen;
    }

    private update(data: CocktailFilterCallbackData) {
        this._latestCallback = data;
        const { cocktails } = filterCocktailList({
            cocktails: this._cocktailsResponse,
            filterDialogModel: data.filterDialogModel,
            searchText: data.searchText,
            ingredientService: this._ingredientService
        });

        this.cocktails = cocktails;

        const response = filterCocktailList({
            cocktails: this._cocktailsWithMissingIngredientResponse,
            filterDialogModel: data.filterDialogModel,
            searchText: data.searchText,
            ingredientService: this._ingredientService
        });

        this.cocktailsWithMissingIngredient = response.cocktails;
    }

    openCocktailDialog(event: Event, cocktail: Cocktail) {
        event.stopPropagation();
        this._dialogService.open({ viewModel: CocktailDialog, model: cocktail, lock: false }).whenClosed(() => {
            this.bind();
        });
    }

    openCocktailRowDialog(event: Event, cocktail: Cocktail) {
        event?.stopPropagation();
        this._dialogService
            .open({ viewModel: ManageCocktailRowDialog, model: cocktail, lock: false })
            .whenClosed(() => {
                this.bind();
            });
    }
}
