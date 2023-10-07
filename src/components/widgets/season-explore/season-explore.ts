import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { CocktailsParams } from 'modules/cocktails/cocktails';

@autoinject
export class SeasonExplore {
    constructor(private router: Router) {}

    navigateToCocktails() {
        const params: CocktailsParams = {
            activeNavigationIndex: '0',
            filter: 'halloween'
        };

        this.router.navigateToRoute('cocktails', params);
    }
}
