import { bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';

export class Navbar {
    @bindable public router: Router;

    public navigate(event, route: string) {
        const dom = event.currentTarget;
        const rippleDiv = document.createElement('div');
        const domTokenList = rippleDiv.classList;
        domTokenList.add('ripple');
        dom.appendChild(rippleDiv);

        setTimeout(() => {
            dom.removeChild(rippleDiv);
        }, 900);

        this.router.navigateToRoute(route);
    }
}
