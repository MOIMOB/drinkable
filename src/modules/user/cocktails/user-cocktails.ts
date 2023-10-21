import { DialogService } from 'aurelia-dialog';
import { autoinject } from 'aurelia-framework';
import { CocktailDialog } from 'components/dialogs/cocktail-dialog/cocktail-dialog';
import { Cocktail } from 'domain/entities/cocktail';
import { createCocktailDeleteToast } from 'functions/toast-functions';
import { CocktailService } from 'services/cocktail-service';

@autoinject
export class UserCocktails {
    public cocktails = [];

    constructor(
        private cocktailService: CocktailService,
        private dialogService: DialogService
    ) {}

    bind() {
        this.cocktails = this.cocktailService.getCreatedCocktails();
    }

    openDialog(cocktail: Cocktail) {
        this.dialogService.open({ viewModel: CocktailDialog, model: cocktail, lock: false }).whenClosed(response => {
            if (response.output?.action?.toLowerCase() === 'delete') {
                createCocktailDeleteToast(response.output.cocktail);
            }

            this.bind();
        });
    }
}
