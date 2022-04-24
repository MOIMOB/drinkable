import { getCocktailsByIngredientIds } from 'functions/cocktail-functions';
import Swiper from 'tiny-swiper/lib/index.full.js';
import { bindable, inject } from 'aurelia-framework';
import { Cocktail } from 'models/cocktail';
import { DialogService } from 'aurelia-dialog';
import { CocktailViewModel } from 'components/dialog-view-models/cocktail-view-model';
import { Router } from 'aurelia-router';

@inject(DialogService, Router)
export class IngredientsWidget {
    @bindable ingredientIds: number[];
    public position = 1;
    public cocktails: Cocktail[] = [];
    public swipeElement: HTMLElement;
    public swiper;

    constructor(private _dialogService: DialogService, private _router: Router) {}

    bind() {
        this.cocktails = getCocktailsByIngredientIds(this.ingredientIds);
    }

    openDialog(cocktail: Cocktail) {
        this._dialogService.open({ viewModel: CocktailViewModel, model: cocktail, lock: false });
    }

    attached() {
        this.swiper = new Swiper(this.swipeElement, {
            lazyload: {
                loadPrevNext: false,
                loadPrevNextAmount: 1,
                loadOnTransitionStart: false,
                elementClass: 'swiper-lazy',
                loadingClass: 'swiper-lazy-loading',
                loadedClass: 'swiper-lazy-loaded',
                preloaderClass: 'swiper-lazy-preloader',
            },
            touchMoveStopPropagation: false,
        });

        this.swiper.on('after-slide', newIndex => {
            this.position = newIndex + 1;
        });
    }

    navigateToIngredients() {
        this._router.navigateToRoute('ingredients');
    }

    detached() {
        this.swiper.destroy();
    }
}
