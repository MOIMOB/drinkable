import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-framework';

export class CocktailsRouter {
    public router: Router;

    public navigate(route: string) {
        this.router.navigateToRoute(route);
    }

    public configureRouter(config: RouterConfiguration, router: Router): void {
        config.map([
            {
                route: ['list', ''],
                name: 'list',
                moduleId: PLATFORM.moduleName('./cocktails'),
                nav: true,
                title: 'All Cocktails',
            },
            {
                route: ['from-ingredients'],
                name: 'from-ingredients',
                moduleId: PLATFORM.moduleName('./from-ingredients'),
                nav: true,
                title: 'From Ingredients',
            },
            {
                route: ['favorites'],
                name: 'favorites',
                moduleId: PLATFORM.moduleName('./favorites'),
                nav: true,
                title: 'Favorites',
            },
        ]);
        this.router = router;
    }
}
