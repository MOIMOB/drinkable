import Swipe from 'swipejs';
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class Settings {
    public activeNavigationIndex = 0;
    public sliderElement: HTMLElement;
    private _swipe: Swipe;

    public navigations = [
        {
            translation: 'routes.settings',
            vm: './general-settings/general-settings'
        },
        {
            translation: 'contact',
            vm: './contact-form/contact-form'
        }
    ];

    constructor(private _router: Router) {}

    activate(params) {
        if (params.activeNavigationIndex) {
            this.activeNavigationIndex = Number(params.activeNavigationIndex);
        }
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
