import { DialogController } from 'aurelia-dialog';
import { autoinject } from 'aurelia-framework';
import { Cocktail } from 'domain/entities/cocktail';
import { CocktailService } from 'services/cocktail-service';
import { LocalStorageService } from 'services/local-storage-service';

@autoinject
export class ManageCocktailRowDialog {
    public cocktail: Cocktail;
    public barName: string;
    public showBarName: boolean;
    constructor(
        private dialogController: DialogController,
        private localStorageService: LocalStorageService,
        private cocktailService: CocktailService
    ) {}

    activate(request: Cocktail) {
        this.cocktail = request;
        this.barName = this.localStorageService.getIngredientList().name;
        this.showBarName = this.localStorageService.getIngredientLists().length > 1;
    }

    cancel() {
        this.dialogController.cancel();
    }

    async toggleIsFavorite() {
        this.cocktail.isFavorite = !this.cocktail.isFavorite;

        if (this.cocktail.id.includes('x-')) {
            await this.cocktailService.updateCocktail(this.cocktail);
        } else {
            await this.cocktailService.updateCocktailInformation(this.cocktail);
        }
    }
}
