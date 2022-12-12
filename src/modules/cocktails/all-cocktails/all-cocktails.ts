import { inject, observable } from 'aurelia-framework';
import { Cocktail } from 'domain/entities/cocktail';
import { CocktailDialog } from 'components/dialogs/cocktail-dialog';
import { DialogService } from 'aurelia-dialog';
import { CocktailService } from 'services/cocktail-service';
import { createCocktailDeleteToast } from 'functions/toast-functions';
import { CocktailFilterDialog, CocktailFilterDialogModel } from 'components/dialogs/cocktail-filter-dialog';
import { IngredientService } from 'services/ingredient-service';

@inject(CocktailService, DialogService, IngredientService)
export class AllCocktails {
    @observable public searchFilter: string;

    public filteredCocktails: Cocktail[] = [];
    public activeFilters: number | undefined;

    private _cocktails: Cocktail[] = [];
    private _filterDialogModel: CocktailFilterDialogModel = {
        categoryFilter: null,
        spiritFilter: null,
        favoriteFilter: null
    };

    constructor(
        private _cocktailService: CocktailService,
        private _dialogService: DialogService,
        private _ingredientService: IngredientService
    ) {}

    bind() {
        this._cocktails = this._cocktailService.getCocktails();
        this.filterCocktails();
    }

    searchFilterChanged() {
        this.filterCocktails();
    }

    openFilters() {
        this._dialogService
            .open({ viewModel: CocktailFilterDialog, model: this._filterDialogModel, lock: false })
            .whenClosed(response => {
                if (response.wasCancelled) {
                    return;
                }
                this._filterDialogModel = response.output;
                this.filterCocktails();
            });
    }

    filterCocktails() {
        let filterCount = 0;

        const searchFilter = this.searchFilter === undefined ? '' : this.searchFilter;
        let cocktails = this._cocktails.filter(x => x.name.toLowerCase().includes(searchFilter.toLowerCase()));

        if (searchFilter !== '') {
            cocktails.sort(a => (a.name.toLowerCase().startsWith(searchFilter.toLowerCase()) ? -1 : 1));
        }

        if (this._filterDialogModel.categoryFilter !== null) {
            cocktails = cocktails.filter(x => x.category === this._filterDialogModel.categoryFilter);
            filterCount++;
        }

        if (this._filterDialogModel.spiritFilter !== null) {
            const ingredientIds = this._ingredientService.getIngredientsBySpiritType(
                this._filterDialogModel.spiritFilter
            );

            cocktails = cocktails.filter(x =>
                x.ingredientGroups.some(y => ingredientIds.map(y => y.id).includes(y.ingredientId))
            );
            filterCount++;
        }

        if (this._filterDialogModel.favoriteFilter !== null) {
            cocktails = cocktails.filter(x => x.isFavorite === true);
            filterCount++;
        }

        this.activeFilters = filterCount > 0 ? filterCount : undefined;
        this.filteredCocktails = cocktails;
    }

    openCocktailDialog(cocktail: Cocktail) {
        this._dialogService.open({ viewModel: CocktailDialog, model: cocktail, lock: false }).whenClosed(response => {
            if (response.output?.action?.toLowerCase() === 'delete') {
                createCocktailDeleteToast(response.output.cocktail);
            }

            this.bind();
        });
    }
}
