import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { DrinkCategory, getDrinkCategories } from 'domain/enums/drink-category';
import { getSpiritTypeFilters, SpiritType } from 'domain/enums/spirit-type';

@inject(DialogController)
export class CocktailFilterDialog {
    public drinkCategories = getDrinkCategories();
    public spirits = getSpiritTypeFilters();

    public categoryFilter: DrinkCategory;
    public spiritFilter: SpiritType;
    public favoriteFilter: boolean;

    constructor(private _dialogContoller: DialogController) {}

    activate(model: CocktailFilterDialogModel) {
        this.categoryFilter = model.categoryFilter;
        this.spiritFilter = model.spiritFilter;
        this.favoriteFilter = model.favoriteFilter;
    }

    ok() {
        const response: CocktailFilterDialogModel = {
            spiritFilter: this.spiritFilter,
            categoryFilter: this.categoryFilter,
            favoriteFilter: this.favoriteFilter === true ? true : null
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
    favoriteFilter: boolean;
}
