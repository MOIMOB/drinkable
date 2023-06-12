import { autoinject, computedFrom } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { DrinkCategory, getDrinkCategories } from 'domain/enums/drink-category';
import { getSpiritTypeFilters, SpiritType } from 'domain/enums/spirit-type';
import { Ingredient } from 'domain/entities/ingredient';
import { IngredientService } from 'services/ingredient-service';
import { ActiveTagModel } from './edit-tags-drawer';
import { CocktailService } from 'services/cocktail-service';

@autoinject
export class CocktailFilterDialog {
    public drinkCategories = getDrinkCategories();
    public spirits = getSpiritTypeFilters();
    public ingredients: Ingredient[];
    public tags: ActiveTagModel[] = [];
    public categoryFilter: DrinkCategory;
    public spiritFilter: SpiritType;
    public ingredientFilter: string;
    public favoriteFilter: boolean;

    // Hack to allow watch when tags is updated
    public counter = 0;

    constructor(
        private _dialogContoller: DialogController,
        private _ingredientService: IngredientService,
        private cocktailService: CocktailService
    ) {}

    activate(model: CocktailFilterDialogModel) {
        this.ingredients = this._ingredientService.getIngredients();
        this.categoryFilter = model.categoryFilter;
        this.spiritFilter = model.spiritFilter;
        this.favoriteFilter = model.favoriteFilter;
        this.ingredientFilter = model.ingredientFilter;

        let tags = this.cocktailService.getTags();
        tags.forEach(element => {
            this.tags.push({
                id: element.id,
                isActive: model.tagFilter?.includes(element.id),
                translation: element.translation,
                name: element.name
            });
        });
    }

    @computedFrom('categoryFilter', 'spiritFilter', 'ingredientFilter', 'counter')
    get hasActiveFilters() {
        return (
            this.categoryFilter !== null ||
            this.spiritFilter !== null ||
            this.ingredientFilter !== null ||
            this.tags.find(x => x.isActive) !== undefined ||
            this.favoriteFilter === true
        );
    }

    ok() {
        let tags = this.tags.filter(x => x.isActive).map(x => x.id);

        const response: CocktailFilterDialogModel = {
            spiritFilter: this.spiritFilter,
            categoryFilter: this.categoryFilter,
            favoriteFilter: this.favoriteFilter === true ? true : null,
            ingredientFilter: this.ingredientFilter,
            tagFilter: tags.length > 0 ? tags : null
        };

        this._dialogContoller.ok(response);
    }

    clearFilters() {
        this.categoryFilter = null;
        this.spiritFilter = null;
        this.ingredientFilter = null;
        this.favoriteFilter = null;
        this.tags.forEach(x => (x.isActive = false));
    }

    toggleTag(tag: ActiveTagModel) {
        tag.isActive = !tag.isActive;
        this.counter++;
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
    tagFilter: string[];

    constructor() {
        this.categoryFilter = null;
        this.spiritFilter = null;
        this.ingredientFilter = null;
        this.favoriteFilter = null;
        this.tagFilter = null;
    }
}
