import { DialogController } from 'aurelia-dialog';
import { autoinject } from 'aurelia-framework';
import { Cocktail } from 'domain/entities/cocktail';
import { CocktailService, UpdateCocktailInformationRequest } from 'services/cocktail-service';
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
            this.cocktail = await this.cocktailService.updateCocktail(this.cocktail);
        } else {
            const updateRequest = new UpdateCocktailInformationRequest(this.cocktail.id);
            updateRequest.addField('isFavorite', this.cocktail.isFavorite ? true : undefined);

            this.cocktail = await this.cocktailService.updateCocktailInformationByRequest(updateRequest);
        }
    }
}
