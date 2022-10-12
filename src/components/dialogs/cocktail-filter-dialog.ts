import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { CocktailService } from 'services/cocktail-service';
import { DrinkCategory, getDrinkCategories } from 'domain/enums/drink-category';
import { getSpiritTypeFilters } from 'functions/spirit-type-functions';
import { SpiritType } from 'domain/enums/spirit-type';

@inject(DialogController, CocktailService)
export class CocktailFilterDialog {
    public drinkCategories = getDrinkCategories();
    public spirits = getSpiritTypeFilters();

    public categoryFilter: DrinkCategory;
    public spiritFilter: SpiritType;

    constructor(private _dialogContoller: DialogController, private _cocktailService: CocktailService) {}

    activate(model: CocktailFilterDialogModel) {
        this.categoryFilter = model.categoryFilter;
        this.spiritFilter = model.spiritFilter;
    }

    ok() {
        const response: CocktailFilterDialogModel = {
            spiritFilter: this.spiritFilter,
            categoryFilter: this.categoryFilter,
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
}
