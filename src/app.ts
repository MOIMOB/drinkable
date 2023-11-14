import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';
import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-framework';
import { ThemeService } from 'services/theme-service';
import { App as capacitorApp } from '@capacitor/app';
import { DialogService } from 'aurelia-dialog';
import { WelcomeDialog } from 'components/dialogs/welcome-dialog';
import { LocalStorageService } from 'services/local-storage-service';

@inject(EventAggregator, ThemeService, LocalStorageService, DialogService)
export class App {
    public router: Router;
    public navbarHidden = false;
    constructor(
        private _ea: EventAggregator,
        private _themeService: ThemeService,
        private _localStorageService: LocalStorageService,
        private _dialogService: DialogService
    ) {}

    public configureRouter(config: RouterConfiguration, router: Router): void {
        this.router = router;

        config.map([
            { route: '', redirect: 'home-router' },
            {
                route: ['home-router'],
                name: 'home-router',
                moduleId: PLATFORM.moduleName('modules/home/home-router'),
                nav: true,
                title: 'Home',
                settings: {
                    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Home</title><path d="M80 212v236a16 16 0 0016 16h96V328a24 24 0 0124-24h80a24 24 0 0124 24v136h96a16 16 0 0016-16V212" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path d="M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256M400 179V64h-48v69" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>'
                }
            },
            {
                route: ['ingredients'],
                name: 'ingredients',
                moduleId: PLATFORM.moduleName('modules/ingredients/ingredients'),
                nav: true,
                title: 'Ingredients',
                settings: {
                    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Leaf</title><path d="M321.89 171.42C233 114 141 155.22 56 65.22c-19.8-21-8.3 235.5 98.1 332.7 77.79 71 197.9 63.08 238.4-5.92s18.28-163.17-70.61-220.58zM173 253c86 81 175 129 292 147" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>'
                }
            },
            {
                route: ['cocktails'],
                name: 'cocktails',
                moduleId: PLATFORM.moduleName('modules/cocktails/cocktails'),
                nav: true,
                title: 'Cocktails',
                settings: {
                    svg: '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 512 512"><title>Wine</title><path d="M398.57 80H113.43v16S87.51 272 256 272 398.57 96 398.57 96zM256 272v160" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M352 432H160"/><path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" d="M112 160h288"/></svg>'
                }
            },
            {
                route: ['user'],
                name: 'user',
                moduleId: PLATFORM.moduleName('modules/user/user-router'),
                nav: true,
                title: 'User',
                settings: {
                    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <title>Person</title>
                            <path
                                d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="32" />
                            <path
                                d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"
                                fill="none"
                                stroke="currentColor"
                                stroke-miterlimit="10"
                                stroke-width="32" />
                        </svg>`
                }
            }
        ]);
    }

    async attached() {
        this._ea.subscribe('navigation-fixed-position', (hidden: boolean) => {
            this.navbarHidden = hidden;
        });

        capacitorApp.addListener('backButton', () => {
            this.handleBackbutton();
        });

        const messuarementSystem = await this._localStorageService.keyExists('messuarement-system');
        if (!messuarementSystem) {
            this._dialogService.open({ viewModel: WelcomeDialog, model: null, lock: true });
        }
    }

    handleBackbutton() {
        if (this._dialogService.hasOpenDialog) {
            this._dialogService.controllers[this._dialogService.controllers.length - 1].close(true);
            return;
        }

        if (this.router.currentInstruction.config.name !== 'home') {
            this.router.navigateBack();
            return;
        }

        capacitorApp.exitApp();
    }
}
