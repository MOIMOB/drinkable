import { inject, computedFrom } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { DrinkCategory, getDrinkCategories } from 'domain/enums/drink-category';
import { getSpiritTypeFilters, SpiritType } from 'domain/enums/spirit-type';
import { Ingredient } from 'domain/entities/ingredient';
import { IngredientService } from 'services/ingredient-service';
import { Tag, getTags } from 'data/tags-data';

@inject(DialogController, IngredientService)
export class CocktailFilterDialog {
    public drinkCategories = getDrinkCategories();
    public spirits = getSpiritTypeFilters();
    public ingredients: Ingredient[];
    public tags = getTags();

    public categoryFilter: DrinkCategory;
    public spiritFilter: SpiritType;
    public ingredientFilter: string;
    public favoriteFilter: boolean;
    public tagFilter: Tag;

    constructor(private _dialogContoller: DialogController, private _ingredientService: IngredientService) {}

    activate(model: CocktailFilterDialogModel) {
        this.ingredients = this._ingredientService.getIngredients();
        this.categoryFilter = model.categoryFilter;
        this.spiritFilter = model.spiritFilter;
        this.favoriteFilter = model.favoriteFilter;
        this.ingredientFilter = model.ingredientFilter;
        this.tagFilter = model.tagFilter;
    }

    @computedFrom('categoryFilter', 'spiritFilter', 'ingredientFilter', 'favoriteFilter', 'tagFilter')
    get hasActiveFilters() {
        return (
            this.categoryFilter !== null ||
            this.spiritFilter !== null ||
            this.ingredientFilter !== null ||
            this.tagFilter !== null ||
            this.favoriteFilter === true
        );
    }

    ok() {
        const response: CocktailFilterDialogModel = {
            spiritFilter: this.spiritFilter,
            categoryFilter: this.categoryFilter,
            favoriteFilter: this.favoriteFilter === true ? true : null,
            ingredientFilter: this.ingredientFilter,
            tagFilter: this.tagFilter
        };

        this._dialogContoller.ok(response);
    }

    clearFilters() {
        this.categoryFilter = null;
        this.spiritFilter = null;
        this.ingredientFilter = null;
        this.favoriteFilter = null;
        this.tagFilter = null;
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
    tagFilter: Tag;

    constructor() {
        this.categoryFilter = null;
        this.spiritFilter = null;
        this.ingredientFilter = null;
        this.favoriteFilter = null;
        this.tagFilter = null;
    }
}
