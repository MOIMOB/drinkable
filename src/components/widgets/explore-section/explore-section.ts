import { Cocktail } from 'domain/entities/cocktail';
import { inject } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { DialogService } from 'aurelia-dialog';
import { CocktailDialog } from 'components/dialogs/cocktail-dialog';
import { CocktailService } from 'services/cocktail-service';
import { createCocktailDeleteToast } from 'functions/toast-functions';

@inject(EventAggregator, DialogService, CocktailService)
export class ExploreSection {
    public cocktails: Cocktail[] = [];

    private _subscription: Subscription;
    private _cocktailCount = 5;

    constructor(
        private _ea: EventAggregator,
        private _dialogService: DialogService,
        private _cocktailService: CocktailService
    ) {}

    bind() {
        this.cocktails = this._cocktailService.getRandomCocktails(this._cocktailCount);
    }

    openDialog(cocktail: Cocktail) {
        this._dialogService.open({ viewModel: CocktailDialog, model: cocktail, lock: false }).whenClosed(response => {
            if (response.output?.action?.toLowerCase() === 'delete') {
                createCocktailDeleteToast(response.output.cocktail);
                this.cocktails = this.cocktails.filter(x => x.id !== cocktail.id);
            }
        });
    }

    attached() {
        this._subscription = this._ea.subscribe('refresh-event', response => {
            this.cocktails = this._cocktailService.getRandomCocktails(this._cocktailCount);
        });
    }

    detached() {
        this._subscription.dispose();
    }
}
