import { bindable, inject, observable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { LocalStorageService } from 'services/local-storage-service';
import { DrinkTypeFilter } from 'domain/enums/drink-type-filter';

@inject(EventAggregator, LocalStorageService)
export class Navbar {
    @bindable public router: Router;
    @bindable public hidden: boolean;
    @observable public currentDrinkTypeFilter: DrinkTypeFilter;
    private _subscription: Subscription;

    constructor(
        private _ea: EventAggregator,
        private _localStorageService: LocalStorageService
    ) {
        this.currentDrinkTypeFilter = this._localStorageService.getSettings().drinkTypeFilter;
    }

    public navigate(route: string) {
        this.router.navigateToRoute(route);
    }


    attached() {
        this._subscription = this._ea.subscribe('cocktails-updated', () => {
            this.currentDrinkTypeFilter = this._localStorageService.getSettings().drinkTypeFilter;
        });
    }

    detached() {
        if (this._subscription) {
            this._subscription.dispose();
        }
    }
}
