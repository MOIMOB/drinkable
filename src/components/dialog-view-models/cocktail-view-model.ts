import { Cocktail } from 'models/cocktail';
import { DialogController } from 'aurelia-dialog';
import { inject } from 'aurelia-framework';

@inject(DialogController)
export class CocktailViewModel {
    public cocktail: Cocktail;
    public controller: DialogController;

    constructor(dialogContoller: DialogController) {
        this.controller = dialogContoller;
    }

    activate(cocktail: Cocktail) {
        this.cocktail = cocktail;
    }
}
