import Swipe from 'swipejs';
import { inject, observable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { SwipeNavigation } from 'domain/models/swipe-navigation';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { LocalStorageService } from 'services/local-storage-service';
import { DrinkTypeFilter } from 'domain/enums/drink-type-filter';

@inject(Router, EventAggregator, LocalStorageService)
export class Cocktails {
    public activeNavigationIndex = 0;
    public sliderElement: HTMLElement;
    @observable public currentDrinkTypeFilter: DrinkTypeFilter;

    public navigations: SwipeNavigation[] = [];

    private updateNavigations() {
        const isMocktails = this.currentDrinkTypeFilter === DrinkTypeFilter.OnlyMocktails;
        this.navigations = [
            {
                translation: isMocktails ? 'routes.mocktails-list' : 'routes.cocktails-list',
                vm: './all-cocktails/all-cocktails'
            },
            {
                translation: isMocktails ? 'routes.mocktails-from-ingredients' : 'routes.cocktails-from-ingredients',
                vm: './from-ingredients/from-ingredients'
            }
        ];
    }

    public params: CocktailsParams;

    private _swipe: Swipe;
    private _subscription: Subscription;

    constructor(
        private _router: Router, 
        private _ea: EventAggregator,
        private _localStorageService: LocalStorageService
    ) {
        this.currentDrinkTypeFilter = this._localStorageService.getSettings().drinkTypeFilter;
        this.updateNavigations();
    }

    activate(params: CocktailsParams) {
        if (params.activeNavigationIndex) {
            this.activeNavigationIndex = Number(params.activeNavigationIndex);
        }

        this.params = params;
    }

    public attached() {
        this._subscription = this._ea.subscribe('cocktails-updated', () => {
            this.currentDrinkTypeFilter = this._localStorageService.getSettings().drinkTypeFilter;
            this.updateNavigations();
        });

        this._swipe = new Swipe(this.sliderElement, {
            startSlide: this.activeNavigationIndex,
            continuous: false,
            callback: index => {
                this.params.filter = null;
                this.params.activeNavigationIndex = index.toString();
                this.activeNavigationIndex = index;

                this._router.navigateToRoute(this._router.currentInstruction.config.name, this.params, {
                    trigger: false,
                    replace: true
                });

                this.navigations[this.activeNavigationIndex].vmRef.bind();
            }
        });
    }

    public detached() {
        if (this._subscription) {
            this._subscription.dispose();
        }
        this._swipe.kill();
    }

    setActiveNavigation(value: number) {
        this._swipe.slide(value, 200);
    }
}

export type CocktailsParams = {
    activeNavigationIndex: string;
    filter: CocktailsParamsFilter;
};

export type CocktailsParamsFilter = 'favorites' | 'halloween' | 'christmas';
