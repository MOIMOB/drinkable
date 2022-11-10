import { ThemeService } from 'services/theme-service';
import { inject, observable } from 'aurelia-framework';
import { MessuarementSystem } from 'domain/enums/messuarement-system';
import { LocalStorageService } from 'services/local-storage-service';
import { SettingEntity } from 'domain/entities/setting-entity';
import { I18N } from 'aurelia-i18n';
import { IngredientService } from 'services/ingredient-service';
import { getLanguages } from 'data/languages';

@inject(ThemeService, LocalStorageService, I18N, IngredientService)
export class GeneralSettings {
    @observable public selectedTheme: string;
    @observable public selectedLanguage: string;
    @observable public selectedMessuarementSystem: MessuarementSystem;

    public themes = [
        { value: null, name: 'Dark' },
        { value: 'autumn', name: 'Light' }
    ];

    public languages = getLanguages();

    public messuarementSystems = [{ value: MessuarementSystem.Imperial }, { value: MessuarementSystem.Metric }];

    public translationStatus = {
        basic: undefined,
        ingredients: undefined
    };

    private _settings: SettingEntity;

    constructor(
        private _themeService: ThemeService,
        private _localStorageService: LocalStorageService,
        private _i18n: I18N,
        private _ingredientService: IngredientService
    ) {}

    public attached() {
        this.selectedTheme = this._themeService.getLocalStorageResult();
        this.selectedMessuarementSystem = this._localStorageService.getMessuarementSystem();
        this._settings = this._localStorageService.getSettings();
        this.selectedLanguage = this._settings.language;
        this.setTranslationStatus(this.selectedLanguage);
    }

    selectedThemeChanged(newValue: string, oldValue: string) {
        if (oldValue === undefined) {
            return;
        }
        this._themeService.updateTheme(newValue);
    }

    async selectedMessuarementSystemChanged(newValue: MessuarementSystem, oldValue) {
        if (oldValue === undefined) {
            return;
        }
        await this._localStorageService.updateMessuarmentSystem(newValue);
    }

    async selectedLanguageChanged(newValue: string) {
        this._settings.language = newValue;
        this._localStorageService.updateSettings(this._settings);

        const locale = newValue !== undefined ? newValue : 'en';

        await this.setLocale(locale);

        this._ingredientService.updateTranslation();
        this.setTranslationStatus(locale);

        this.themes = JSON.parse(JSON.stringify(this.themes));
        this.messuarementSystems = JSON.parse(JSON.stringify(this.messuarementSystems));
    }

    private setTranslationStatus(locale: string) {
        if (locale === undefined || locale === 'en') {
            this.translationStatus = {
                basic: undefined,
                ingredients: undefined
            };
            return;
        }

        this.translationStatus = {
            basic: true,
            ingredients: this._i18n.i18next.store.data[locale]?.ingredients !== undefined
        };
    }

    private async setLocale(locale: string) {
        try {
            await this._i18n.setLocale(locale);
        } catch (error) {
            console.error(error);
        }
    }
}
