import { inject, observable } from 'aurelia-framework';
import { Cocktail } from 'domain/entities/cocktail';
import { CocktailDialog } from 'components/dialogs/cocktail-dialog';
import { DialogService } from 'aurelia-dialog';
import { CocktailService } from 'services/cocktail-service';
import { createCocktailDeleteToast } from 'functions/toast-functions';
import { CocktailFilterDialog, CocktailFilterDialogModel } from 'components/dialogs/cocktail-filter-dialog';
import { IngredientService } from 'services/ingredient-service';

@inject(CocktailService, DialogService, IngredientService)
export class Cocktails {
    @observable public searchFilter: string;

    public filteredCocktails: Cocktail[] = [];
    public hasActiveFilters = false;

    private _cocktails: Cocktail[] = [];
    private _filterDialogModel: CocktailFilterDialogModel = {
        categoryFilter: null,
        spiritFilter: null,
    };

    constructor(
        private _cocktailService: CocktailService,
        private _dialogService: DialogService,
        private _ingredientService: IngredientService
    ) {}

    activate() {
        this._cocktails = this._cocktailService.getCocktails();
        this.filteredCocktails = this._cocktails;
    }

    searchFilterChanged() {
        this.filterCocktails();
    }

    openFilters() {
        this._dialogService
            .open({ viewModel: CocktailFilterDialog, model: this._filterDialogModel, lock: false })
            .whenClosed(response => {
                this._filterDialogModel = response.output;

                this.hasActiveFilters =
                    this._filterDialogModel.categoryFilter !== null || this._filterDialogModel.spiritFilter !== null;

                this.filterCocktails();
            });
    }

    filterCocktails() {
        const searchFilter = this.searchFilter === undefined ? '' : this.searchFilter;
        let cocktails = this._cocktails.filter(x => x.name.toLowerCase().includes(searchFilter.toLowerCase()));

        if (searchFilter !== '') {
            cocktails.sort(a => (a.name.toLowerCase().startsWith(searchFilter.toLowerCase()) ? -1 : 1));
        }

        if (this._filterDialogModel.categoryFilter !== null) {
            cocktails = cocktails.filter(x => x.category === this._filterDialogModel.categoryFilter);
        }

        if (this._filterDialogModel.spiritFilter !== null) {
            const ingredientIds = this._ingredientService.getIngredientsBySpiritType(
                this._filterDialogModel.spiritFilter
            );

            cocktails = cocktails.filter(x =>
                x.ingredientGroups.some(y => ingredientIds.map(y => y.id).includes(y.ingredientId))
            );
        }

        this.filteredCocktails = cocktails;
    }

    openCocktailDialog(cocktail: Cocktail) {
        this._dialogService.open({ viewModel: CocktailDialog, model: cocktail, lock: false }).whenClosed(response => {
            if (response.output?.action?.toLowerCase() === 'delete') {
                createCocktailDeleteToast(response.output.cocktail);
            }

            this._cocktails = this._cocktailService.getCocktails();
            this.filterCocktails();
        });
    }
}
