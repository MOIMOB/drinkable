import { DialogService } from 'aurelia-dialog';
import { ingredientDialog } from 'components/dialogs/ingredient-dialog';
import { inject } from 'aurelia-framework';
import { CreatedIngredientModel } from 'domain/entities/ingredient';
import { createIngredientDeleteToast } from 'functions/toast-functions';
import { IngredientService } from 'services/ingredient-service';
import { CocktailService } from 'services/cocktail-service';
import { Cocktail } from 'domain/entities/cocktail';

@inject(DialogService, IngredientService, CocktailService)
export class ManageIngredients {
    public ingredients: CreatedIngredientModel[] = [];
    public inputValue: string;

    private _cocktails: Cocktail[] = [];

    constructor(
        private _dialogService: DialogService,
        private _ingredientService: IngredientService,
        private _cocktailService: CocktailService
    ) {}

    activate() {
        this._cocktails = this._cocktailService.getCocktails();

        this.ingredients = this._ingredientService.getCreatedIngredientModels(this._cocktails);
    }

    openDialog(ingredient: CreatedIngredientModel) {
        this._dialogService
            .open({ viewModel: ingredientDialog, model: ingredient, lock: true })
            .whenClosed(response => {
                if (response.output?.action?.toLowerCase() === 'delete') {
                    createIngredientDeleteToast(response.output.ingredient);
                }
                this.ingredients = this._ingredientService.getCreatedIngredientModels(this._cocktails);
            });
    }
}
