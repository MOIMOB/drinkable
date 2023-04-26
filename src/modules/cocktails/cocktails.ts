import Swipe from 'swipejs';
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class Cocktails {
    public activeNavigationIndex = 0;
    public sliderElement: HTMLElement;

    public navigations: any[] = [
        {
            translation: 'routes.cocktails-list',
            vm: './all-cocktails/all-cocktails'
        },
        {
            translation: 'routes.cocktails-from-ingredients',
            vm: './from-ingredients/from-ingredients'
        }
    ];

    public params: CocktailsParams;

    private _swipe: Swipe;

    constructor(private _router: Router) {}

    activate(params: CocktailsParams) {
        if (params.activeNavigationIndex) {
            this.activeNavigationIndex = Number(params.activeNavigationIndex);
        }

        this.params = params;
    }

    public attached() {
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
        this._swipe.kill();
    }

    setActiveNavigation(value: number) {
        this._swipe.slide(value, 200);
    }
}

export interface CocktailsParams {
    activeNavigationIndex: string;
    filter: string;
}
