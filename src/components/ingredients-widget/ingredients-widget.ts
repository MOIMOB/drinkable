import { getCocktails } from 'functions/cocktail-functions';
// import Swipe from 'swipejs';
import Swiper from 'tiny-swiper/lib/index.full.js';

export class IngredientsWidget {
    public position = 1;
    public cocktails: any[] = [];
    public swipeElement: HTMLElement;
    public swiper;

    bind() {
        this.cocktails = getCocktails();
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
