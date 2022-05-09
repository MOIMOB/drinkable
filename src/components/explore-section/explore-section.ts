import { getRandomCocktails } from 'functions/cocktail-functions';
import { Cocktail } from 'models/cocktail';
import { inject } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { DialogService } from 'aurelia-dialog';
import { CocktailViewModel } from 'components/dialog-view-models/cocktail-view-model';

@inject(EventAggregator, DialogService)
export class ExploreSection {
    public cocktails: Cocktail[] = [];

    private _subscription: Subscription;
    private _cocktailCount = 5;

    constructor(private _ea: EventAggregator, private _dialogService: DialogService) {}

    bind() {
        this.cocktails = getRandomCocktails(this._cocktailCount);
    }

    openDialog(cocktail: Cocktail) {
        this._dialogService.open({ viewModel: CocktailViewModel, model: cocktail, lock: false });
    }

    attached() {
        this._subscription = this._ea.subscribe('refresh-event', response => {
            this.cocktails = getRandomCocktails(this._cocktailCount);
        });
    }

    detached() {
        this._subscription.dispose();
    }
}
