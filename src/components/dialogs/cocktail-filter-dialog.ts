import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { DrinkCategory, getDrinkCategories } from 'domain/enums/drink-category';
import { getSpiritTypeFilters, SpiritType } from 'domain/enums/spirit-type';
import { Ingredient } from 'domain/entities/ingredient';
import { IngredientService } from 'services/ingredient-service';

@inject(DialogController, IngredientService)
export class CocktailFilterDialog {
    public drinkCategories = getDrinkCategories();
    public spirits = getSpiritTypeFilters();
    public ingredients: Ingredient[];

    public categoryFilter: DrinkCategory;
    public spiritFilter: SpiritType;
    public ingredientFilter: string;
    public favoriteFilter: boolean;

    constructor(private _dialogContoller: DialogController, private _ingredientService: IngredientService) {}

    activate(model: CocktailFilterDialogModel) {
        this.ingredients = this._ingredientService.getIngredients();
        this.categoryFilter = model.categoryFilter;
        this.spiritFilter = model.spiritFilter;
        this.favoriteFilter = model.favoriteFilter;
        this.ingredientFilter = model.ingredientFilter;
    }

    ok() {
        const response: CocktailFilterDialogModel = {
            spiritFilter: this.spiritFilter,
            categoryFilter: this.categoryFilter,
            favoriteFilter: this.favoriteFilter === true ? true : null,
            ingredientFilter: this.ingredientFilter
        };

        this._dialogContoller.ok(response);
    }
    cancel() {
        this._dialogContoller.cancel();
    }
}

export class CocktailFilterDialogModel {
    categoryFilter: DrinkCategory;
    spiritFilter: SpiritType;
    ingredientFilter: string;
    favoriteFilter: boolean;
}
