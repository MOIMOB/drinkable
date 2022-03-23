import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';
import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-framework';

@inject(EventAggregator)
export class App {
    public router: Router;

    public configureRouter(config: RouterConfiguration, router: Router): void {
        this.router = router;
        config.map([
            {
                route: ['home', ''],
                name: 'home',
                moduleId: PLATFORM.moduleName('modules/home/home'),
                nav: true,
                title: 'Home',
                settings: {},
            },
            {
                route: ['ingredients'],
                name: 'ingredients',
                moduleId: PLATFORM.moduleName('modules/ingredients/ingredients'),
                nav: true,
                title: 'Ingredients',
                settings: {},
            },
            {
                route: ['search'],
                name: 'search',
                moduleId: PLATFORM.moduleName('modules/search/search'),
                nav: true,
                title: 'Search',
                settings: {},
            },
            {
                route: ['shopping-lists'],
                name: 'shopping-lists',
                moduleId: PLATFORM.moduleName('modules/shopping-lists/shopping-lists'),
                nav: true,
                title: 'ShoppingList',
                settings: {},
            },
            {
                route: ['settings'],
                name: 'settings',
                moduleId: PLATFORM.moduleName('modules/settings/settings'),
                nav: true,
                title: 'Settings',
            },
        ]);
        console.log(this.router);
    }
}
