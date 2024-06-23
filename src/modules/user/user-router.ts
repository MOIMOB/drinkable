import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-framework';

export class UserRouter {
    public router: Router;

    public configureRouter(config: RouterConfiguration, router: Router): void {
        config.map([
            {
                route: [''],
                name: 'user',
                moduleId: PLATFORM.moduleName('modules/user/user-page'),
                nav: false,
                title: 'User '
            },
            {
                route: ['ingredients'],
                name: 'user-ingredients',
                moduleId: PLATFORM.moduleName('modules/user/ingredients/user-ingredients'),
                nav: false,
                title: 'user.ingredients-title'
            },
            {
                route: ['cocktails'],
                name: 'user-cocktails',
                moduleId: PLATFORM.moduleName('modules/user/cocktails/user-cocktails'),
                nav: false,
                title: 'user.cocktails-title'
            },
            {
                route: ['tags'],
                name: 'user-tags',
                moduleId: PLATFORM.moduleName('modules/user/tags/user-tags'),
                nav: false,
                title: 'user.tags-title'
            },
            {
                route: ['shopping-lists'],
                name: 'user-shopping-lists',
                moduleId: PLATFORM.moduleName('modules/user/shopping-list/user-shopping-lists'),
                nav: false,
                title: 'shopping-list.title'
            },
            {
                route: ['settings'],
                name: 'settings',
                moduleId: PLATFORM.moduleName('modules/user/settings/settings'),
                nav: false,
                title: 'user.settings-title'
            },
            {
                route: ['contact'],
                name: 'contact',
                moduleId: PLATFORM.moduleName('modules/user/contact/contact'),
                nav: false,
                title: 'user.contact-title'
            },
            {
                route: ['ingredient-lists'],
                name: 'ingredient-lists',
                moduleId: PLATFORM.moduleName('modules/user/ingredient-lists/ingredient-lists'),
                nav: false,
                title: 'user.ingredient-lists-title'
            },
            {
                route: ['backups'],
                name: 'backups',
                moduleId: PLATFORM.moduleName('modules/user/backups/backups'),
                nav: false,
                title: 'user.backups-title'
            }
        ]);
        this.router = router;
    }
}
