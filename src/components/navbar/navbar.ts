import { bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';

export class Navbar {
    @bindable public router: Router;
    @bindable public hidden: boolean;

    public navigate(event, route: string) {
        this.router.navigateToRoute(route);
    }
}
