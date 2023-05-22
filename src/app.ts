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
                route: ['settings'],
                name: 'settings',
                moduleId: PLATFORM.moduleName('modules/settings/settings'),
                nav: true,
                title: 'Settings',
                settings: {
                    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Settings</title><path d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>'
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
    }
}
