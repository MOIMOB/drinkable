import { LocalStorageService } from 'services/local-storage-service';
import { autoinject, observable } from 'aurelia-framework';
import { Cocktail } from 'domain/entities/cocktail';
import { CocktailDialog } from 'components/dialogs/cocktail-dialog';
import { DialogService } from 'aurelia-dialog';
import { CocktailService } from 'services/cocktail-service';
import { createCocktailDeleteToast } from 'functions/toast-functions';
import { CocktailFilterDialog, CocktailFilterDialogModel } from 'components/dialogs/cocktail-filter-dialog';
import { IngredientService } from 'services/ingredient-service';
import { filterCocktailList } from '../filter-cocktails';

@autoinject
export class FromIngredients {
    @observable public searchFilter: string;
    public activeFilters: number | undefined;
    public cocktails: Cocktail[];
    public cocktailsWithMissingIngredient: Cocktail[];
    public isOpen = false;

    private _cocktailsResponse: Cocktail[];
    private _cocktailsWithMissingIngredientResponse: Cocktail[];

    private _filterDialogModel: CocktailFilterDialogModel = {
        categoryFilter: null,
        spiritFilter: null,
        favoriteFilter: null,
        ingredientFilter: null
    };

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

        this.updateArrays();
    }

    toggleIsOpen() {
        this.isOpen = !this.isOpen;
    }

    searchFilterChanged() {
        this.updateArrays();
    }

    private updateArrays() {
        let { actvieFilterCount, cocktails } = filterCocktailList({
            cocktails: this._cocktailsResponse,
            filterDialogModel: this._filterDialogModel,
            searchText: this.searchFilter,
            ingredientService: this._ingredientService
        });

        this.cocktails = cocktails;
        this.activeFilters = actvieFilterCount;

        let response = filterCocktailList({
            cocktails: this._cocktailsWithMissingIngredientResponse,
            filterDialogModel: this._filterDialogModel,
            searchText: this.searchFilter,
            ingredientService: this._ingredientService
        });

        this.cocktailsWithMissingIngredient = response.cocktails;
    }

    openFilters() {
        this._dialogService
            .open({ viewModel: CocktailFilterDialog, model: this._filterDialogModel, lock: false })
            .whenClosed(response => {
                if (response.wasCancelled) {
                    return;
                }
                this._filterDialogModel = response.output;
                this.updateArrays();
            });
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
