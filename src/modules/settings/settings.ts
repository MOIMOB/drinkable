import { ThemeService } from 'services/theme-service';
import { inject, observable } from 'aurelia-framework';
import { MessuarementSystem } from 'domain/enums/messuarement-system';
import { LocalStorageService } from 'services/local-storage-service';
import { SettingEntity } from 'domain/entities/setting-entity';
import { I18N } from 'aurelia-i18n';

@inject(ThemeService, LocalStorageService, I18N)
export class Settings {
    @observable public selectedTheme: string;
    @observable public selectedLanguage: string;
    @observable public selectedMessuarementSystem: MessuarementSystem;

    public themes = [
        { value: null, name: 'Dark' },
        { value: 'autumn', name: 'Light' },
    ];

    public languages = [
        { value: undefined, name: 'English' },
        { value: 'de', name: 'Deutsch' },
        { value: 'sv', name: 'Svenska' },
        { value: 'it', name: 'Italiano' },
    ];

    public messuarementSystems = [MessuarementSystem.Imperial, MessuarementSystem.Metric];

    private _settings: SettingEntity;

    constructor(
        private _themeService: ThemeService,
        private _localStorageService: LocalStorageService,
        private _i18n: I18N
    ) {}

    public activate() {
        this.selectedTheme = this._themeService.getLocalStorageResult();
        this.selectedMessuarementSystem = this._localStorageService.getMessuarementSystem();
        this._settings = this._localStorageService.getSettings();
        this.selectedLanguage = this._settings.language;
    }

    selectedThemeChanged(newValue: string) {
        this._themeService.updateTheme(newValue);
    }

    async selectedMessuarementSystemChanged(newValue: MessuarementSystem) {
        await this._localStorageService.updateMessuarmentSystem(newValue);
    }

    async selectedLanguageChanged(newValue: string, oldValue: string) {
        this._settings.language = newValue;
        this._localStorageService.updateSettings(this._settings);

        const locale = newValue !== undefined ? newValue : 'en';

        this._i18n.setLocale(locale);
        if (oldValue !== undefined) {
            window.location.reload();
        }
    }
}
