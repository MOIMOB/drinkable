import Swipe from 'swipejs';
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { SwipeNavigation } from 'domain/models/swipe-navigation';

@inject(Router, EventAggregator)
export class Ingredients {
    public activeNavigationIndex = 0;
    public sliderElement: HTMLElement;
    public navbarHidden: boolean;

    public navigations: SwipeNavigation[] = [
        {
            translation: 'routes.ingredients-search',
            vm: './search-ingredients/search-ingredients'
        },
        {
            translation: 'routes.ingredients-list',
            vm: './all-ingredients/all-ingredients'
        }
    ];

    private _swipe: Swipe;
    private _subscription: Subscription;

    constructor(
        private _router: Router,
        private _eventAggregator: EventAggregator
    ) {}

    activate(params) {
        if (params.activeNavigationIndex) {
            this.activeNavigationIndex = Number(params.activeNavigationIndex);
        }

        this._subscription = this._eventAggregator.subscribe('navigation-fixed-position', (hidden: boolean) => {
            this.navbarHidden = hidden;
            if (hidden) {
                this._swipe.disable();
            } else {
                this._swipe.enable();
            }
        });
    }

    public attached() {
        this._swipe = new Swipe(this.sliderElement, {
            startSlide: this.activeNavigationIndex,
            continuous: false,
            callback: index => {
                this.activeNavigationIndex = index;
                this._router.navigateToRoute(
                    this._router.currentInstruction.config.name,
                    { activeNavigationIndex: index },
                    { trigger: false, replace: true }
                );

                this.navigations[this.activeNavigationIndex].vmRef.bind();
            }
        });
    }

    public detached() {
        this._swipe.kill();
        this._subscription.dispose();
    }

    setActiveNavigation(value: number) {
        this._swipe.slide(value, 200);
    }
}
