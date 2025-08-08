import Swiper from 'tiny-swiper/lib/index.full.js';
import { bindable, inject, observable } from 'aurelia-framework';
import { Cocktail } from 'domain/entities/cocktail';
import { DialogService } from 'aurelia-dialog';
import { CocktailDialog } from 'components/dialogs/cocktail-dialog/cocktail-dialog';
import { Router } from 'aurelia-router';
import { CocktailService } from 'services/cocktail-service';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { LocalStorageService } from 'services/local-storage-service';
import { DrinkTypeFilter } from 'domain/enums/drink-type-filter';

@inject(DialogService, Router, CocktailService, EventAggregator, LocalStorageService)
export class IngredientsWidget {
    @bindable ingredientIds: string[];
    public position = 1;
    public cocktails: Cocktail[] = [];
    public swipeElement: HTMLElement;
    public swiper;
    @observable public currentDrinkTypeFilter: DrinkTypeFilter;
    private _subscription: Subscription;

    constructor(
        private _dialogService: DialogService,
        private _router: Router,
        private _cocktailService: CocktailService,
        private _ea: EventAggregator,
        private _localStorageService: LocalStorageService
    ) {
        this.currentDrinkTypeFilter = this._localStorageService.getSettings().drinkTypeFilter;
    }

    bind() {
        this.cocktails = this._cocktailService.getCocktailsByIngredientIds(this.ingredientIds);
    }

    openDialog(cocktail: Cocktail) {
        this._dialogService.open({ viewModel: CocktailDialog, model: cocktail, lock: false }).whenClosed(response => {
            if (response.output?.action?.toLowerCase() === 'delete') {
                this.cocktails = this.cocktails.filter(x => x.id !== cocktail.id);
                setTimeout(() => {
                    this.swiper.update();
                }, 350);
            }
        });
    }

    attached() {
        // Subscribe to cocktail updates
        this._subscription = this._ea.subscribe('cocktails-updated', () => {
            this.currentDrinkTypeFilter = this._localStorageService.getSettings().drinkTypeFilter;
        });

        this.swiper = new Swiper(this.swipeElement, {
            touchAngle: 60,
            lazyload: {
                loadPrevNext: false,
                loadPrevNextAmount: 1,
                loadOnTransitionStart: false,
                elementClass: 'swiper-lazy',
                loadingClass: 'swiper-lazy-loading',
                loadedClass: 'swiper-lazy-loaded',
                preloaderClass: 'swiper-lazy-preloader'
            },
            touchMoveStopPropagation: false
        });

        this.swiper.on('after-slide', newIndex => {
            this.position = newIndex + 1;
        });
    }

    ingredientIdsChanged(newValue: string[]) {
        const newCocktails = this._cocktailService.getCocktailsByIngredientIds(newValue);

        if (newCocktails.length === this.cocktails.length) {
            return;
        }

        if (newCocktails.length >= this.cocktails.length) {
            const currentIds = this.cocktails.map(c => c.id);
            const newList = newCocktails.filter(c => !currentIds.includes(c.id));

            newList.forEach(element => {
                this.cocktails.push(element);
            });
        } else {
            this.cocktails = newCocktails;
        }

        setTimeout(() => {
            this.swiper.update();
        }, 350);
    }

    navigateToIngredients() {
        this._router.navigate('/cocktails?activeNavigationIndex=1');
    }

    detached() {
        if (this._subscription) {
            this._subscription.dispose();
        }
        this.swiper.destroy();
    }
}
