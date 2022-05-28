import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-framework';

export class HomeRouter {
    public router: Router;
    public isHomeTab = true;

    public toggleNavigation() {
        this.router.navigateToRoute(this.isHomeTab ? 'home-settings' : 'home');
        this.isHomeTab = !this.isHomeTab;
    }

    public configureRouter(config: RouterConfiguration, router: Router): void {
        config.map([
            {
                route: [''],
                name: 'home',
                moduleId: PLATFORM.moduleName('./home'),
                nav: false,
                title: 'Home',
            },
            {
                route: ['home-settings'],
                name: 'home-settings',
                moduleId: PLATFORM.moduleName('./home-settings'),
                nav: false,
                title: 'Home Settings',
            },
        ]);
        this.router = router;
    }

    activate(_, __, navigationInstruction) {
        this.isHomeTab = !(navigationInstruction.params.childRoute === 'home-settings');
    }
}
