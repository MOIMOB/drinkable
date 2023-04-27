import { DialogService } from 'aurelia-dialog';
import { observable, bindable, autoinject } from 'aurelia-framework';
import { CocktailFilterDialog, CocktailFilterDialogModel } from 'components/dialogs/cocktail-filter-dialog';
import { CocktailsParams } from './cocktails';
@autoinject
export class CocktailFilterComponent {
    @observable public searchFilter: string;
    public activeFilters: number | undefined;
    @bindable callback: (data: { data: CocktailFilterCallbackData }) => void;
    @bindable params: CocktailsParams;
    constructor(private _dialogService: DialogService) {}

    private _filterDialogModel = new CocktailFilterDialogModel();

    bind() {
        if (this.params?.filter === 'favorites') {
            this._filterDialogModel.favoriteFilter = true;
            this.setActiveFiltersCount();
        }
    }

    searchFilterChanged() {
        this.callback({
            data: {
                searchText: this.searchFilter,
                filterDialogModel: this._filterDialogModel
            }
        });
    }

    openFilters() {
        this._dialogService
            .open({ viewModel: CocktailFilterDialog, model: this._filterDialogModel, lock: false })
            .whenClosed(response => {
                if (response.wasCancelled) {
                    return;
                }
                this._filterDialogModel = response.output;

                this.setActiveFiltersCount();

                this.callback({
                    data: {
                        searchText: this.searchFilter,
                        filterDialogModel: this._filterDialogModel
                    }
                });
            });
    }

    private setActiveFiltersCount() {
        let activeFilterLength = Object.values(this._filterDialogModel).filter(x => x !== null).length;
        this.activeFilters = activeFilterLength > 0 ? activeFilterLength : undefined;
    }
}

export interface CocktailFilterCallbackData {
    searchText: string;
    filterDialogModel: CocktailFilterDialogModel;
}
