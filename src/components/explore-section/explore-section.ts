import { getCocktails, getRandomCocktails } from 'functions/cocktail-functions';
import { Cocktail } from 'models/cocktail';
import { inject } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class ExploreSection {
    public cocktails: Cocktail[] = [];

    private _subscription: Subscription;

    constructor(private _ea: EventAggregator) {}

    bind() {
        this.cocktails = getRandomCocktails(2);
    }

    attached() {
        this._subscription = this._ea.subscribe('refresh-event', response => {
            this.cocktails = getRandomCocktails(2);
        });
    }

    detached() {
        this._subscription.dispose();
    }
}
