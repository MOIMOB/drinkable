import { Cocktail, ExtendedIngredientGroup } from 'models/cocktail';
import { DialogController } from 'aurelia-dialog';
import { inject } from 'aurelia-framework';
import { toExtendedIngredientGroup } from 'functions/ingredient-functions';

@inject(DialogController)
export class CocktailViewModel {
    public cocktail: Cocktail;
    public extendedIngredientGroup: ExtendedIngredientGroup[];
    public controller: DialogController;
    public multiplier = 1;

    constructor(dialogContoller: DialogController) {
        this.controller = dialogContoller;
    }

    activate(cocktail: Cocktail) {
        this.cocktail = cocktail;

        this.extendedIngredientGroup = toExtendedIngredientGroup(cocktail.ingredientGroups);
    }
}
