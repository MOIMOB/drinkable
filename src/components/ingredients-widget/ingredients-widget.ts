import { getCocktails } from 'functions/cocktail-functions';
import Swipe from 'swipejs';

export class IngredientsWidget {
    public position = 1;
    public cocktails: any[] = [];

    bind() {
        this.cocktails = getCocktails();
    }

    attached() {
        (window as any).mySwipe = new Swipe(document.getElementById('slider'), {
            continuous: false,
            callback: (index, elem, dir) => {
                this.position = index + 1;
            },
        });
    }
}
