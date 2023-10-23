import { autoinject } from 'aurelia-framework';
import { Cocktail } from 'domain/entities/cocktail';
import { CocktailDialog } from 'components/dialogs/cocktail-dialog/cocktail-dialog';
import { DialogService } from 'aurelia-dialog';
import { CocktailService } from 'services/cocktail-service';
import { createCocktailDeleteToast } from 'functions/toast-functions';
import { CocktailFilterDialogModel } from 'components/dialogs/cocktail-filter-dialog';
import { IngredientService } from 'services/ingredient-service';
import { CocktailsParams } from '../cocktails';
import { filterCocktailList } from '../filter-cocktails-helper';
import { CocktailFilterCallbackData } from '../cocktail-filter-component';
import { Tag } from 'data/tags-data';
import { ManageCocktailRowDialog } from '../dialogs/manage-cocktail-row-dialog';

@autoinject
export class AllCocktails {
    public filteredCocktails: Cocktail[] = [];
    private _cocktails: Cocktail[] = [];
    private _latestCallback: CocktailFilterCallbackData;

    public params: CocktailsParams;

    constructor(
        private _cocktailService: CocktailService,
        private _dialogService: DialogService,
        private _ingredientService: IngredientService
    ) {}

    activate(model: CocktailsParams) {
        this.params = model;
    }

    bind() {
        this._cocktails = this._cocktailService.getCocktails();

        const data: CocktailFilterCallbackData = {
            filterDialogModel: this._latestCallback?.filterDialogModel || new CocktailFilterDialogModel(),
            searchText: this._latestCallback?.searchText || ''
        };

        if (this.params?.filter === 'favorites') {
            data.filterDialogModel.favoriteFilter = true;
        }

        if (this.params?.filter === 'halloween') {
            data.filterDialogModel.tagFilter = [Tag.Halloween];
        }

        this.update(data);
    }

    update(data: CocktailFilterCallbackData) {
        this._latestCallback = data;
        const { cocktails } = filterCocktailList({
            cocktails: this._cocktails,
            filterDialogModel: data.filterDialogModel,
            ingredientService: this._ingredientService,
            searchText: data.searchText
        });

        this.filteredCocktails = cocktails;
    }

    openCocktailDialog(cocktail: Cocktail) {
        this._dialogService.open({ viewModel: CocktailDialog, model: cocktail, lock: false }).whenClosed(response => {
            if (response.output?.action?.toLowerCase() === 'delete') {
                createCocktailDeleteToast(response.output.cocktail);
            }

            this.params.filter = undefined;
            this.bind();
        });
    }

    openCocktailRowDialog(cocktail: Cocktail) {
        this._dialogService
            .open({ viewModel: ManageCocktailRowDialog, model: cocktail, lock: false })
            .whenClosed(() => {
                this.params.filter = undefined;
                this.bind();
            });
    }
}
