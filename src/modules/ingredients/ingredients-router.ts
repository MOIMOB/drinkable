import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-framework';

export class IngredientsRouter {
    public router: Router;

    public navigate(route: string) {
        this.router.navigateToRoute(route);
    }

    public configureRouter(config: RouterConfiguration, router: Router): void {
        config.map([
            {
                route: ['search', ''],
                name: 'search',
                moduleId: PLATFORM.moduleName('./search'),
                nav: true,
                title: 'My Ingredients',
            },
            {
                route: ['list'],
                name: 'list',
                moduleId: PLATFORM.moduleName('./ingredients'),
                nav: true,
                title: 'All Ingredients',
            },
        ]);
        this.router = router;
    }
}
