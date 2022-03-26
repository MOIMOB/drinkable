import { getCocktailsByIngredientIds } from 'functions/cocktail-functions';
import Swiper from 'tiny-swiper/lib/index.full.js';
import { bindable } from 'aurelia-framework';
import { Cocktail } from 'models/cocktail';

export class IngredientsWidget {
    @bindable ingredientIds: number[];
    public position = 1;
    public cocktails: Cocktail[] = [];
    public swipeElement: HTMLElement;
    public swiper;

    bind() {
        this.cocktails = getCocktailsByIngredientIds(this.ingredientIds);
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
            touchMoveStopPropagation: true,
        });

        this.swiper.on('after-slide', newIndex => {
            this.position = newIndex + 1;
        });
    }

    detached() {
        this.swiper.destroy();
    }
}
