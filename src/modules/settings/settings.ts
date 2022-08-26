import { ThemeService } from 'services/theme-service';
import { inject, observable } from 'aurelia-framework';
import { MessuarementSystem } from 'domain/enums/messuarement-system';
import { LocalStorageService } from 'services/local-storage-service';

@inject(ThemeService, LocalStorageService)
export class Settings {
    @observable public selectedTheme: string;
    @observable public selectedMessuarementSystem: MessuarementSystem;

    public themes = [
        { value: null, name: 'Dark' },
        { value: 'light', name: 'Light' },
    ];

    public messuarementSystems = [MessuarementSystem.Imperial, MessuarementSystem.Metric];

    constructor(private _themeService: ThemeService, private _localStorageService: LocalStorageService) {}

    public activate() {
        this.selectedTheme = this._themeService.getLocalStorageResult();
        this.selectedMessuarementSystem = this._localStorageService.getMessuarementSystem();
    }

    selectedThemeChanged(newValue: string) {
        this._themeService.updateTheme(newValue);
    }

    async selectedMessuarementSystemChanged(newValue: MessuarementSystem, _) {
        await this._localStorageService.updateMessuarmentSystem(newValue);
    }
}
