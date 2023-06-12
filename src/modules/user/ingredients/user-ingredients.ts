import { DialogService } from 'aurelia-dialog';
import { autoinject } from 'aurelia-framework';
import { CreatedIngredientModel } from 'domain/entities/ingredient';
import { createIngredientDeleteToast } from 'functions/toast-functions';
import { IngredientService } from 'services/ingredient-service';
import { CocktailService } from 'services/cocktail-service';
import { Cocktail } from 'domain/entities/cocktail';
import { UserIngredientDrawer } from './user-ingredient-drawer';

@autoinject
export class UserIngredients {
    public ingredients: CreatedIngredientModel[] = [];
    private _cocktails: Cocktail[] = [];

    constructor(
        private _dialogService: DialogService,
        private _ingredientService: IngredientService,
        private _cocktailService: CocktailService
    ) {}

    bind() {
        this._cocktails = this._cocktailService.getCocktails();

        this.ingredients = this._ingredientService.getCreatedIngredientModels(this._cocktails);
    }

    openDialog(ingredient: CreatedIngredientModel) {
        this._dialogService
            .open({ viewModel: UserIngredientDrawer, model: ingredient, lock: true })
            .whenClosed(response => {
                if (response.output?.action?.toLowerCase() === 'delete') {
                    createIngredientDeleteToast(response.output.ingredient);
                }
                this.ingredients = this._ingredientService.getCreatedIngredientModels(this._cocktails);
            });
    }
}
