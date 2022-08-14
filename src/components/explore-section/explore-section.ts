import { Cocktail } from 'models/cocktail';
import { inject } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { DialogService } from 'aurelia-dialog';
import { CocktailViewModel } from 'components/dialog-view-models/cocktail-view-model';
import { CocktailService } from 'services/cocktail-service';

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
        this._dialogService.open({ viewModel: CocktailViewModel, model: cocktail, lock: false });
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
