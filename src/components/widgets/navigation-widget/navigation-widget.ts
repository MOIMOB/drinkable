import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@autoinject
export class NavigationWidget {
    constructor(private _router: Router) {}

    navigateToFavorites() {
        const params = {
            activeNavigationIndex: 0,
            filter: 'favorites'
        };

        this._router.navigateToRoute('cocktails', params);
    }
}
