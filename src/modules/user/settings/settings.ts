import { ThemeService } from 'services/theme-service';
import { inject, observable } from 'aurelia-framework';
import { MessuarementSystem } from 'domain/enums/messuarement-system';
import { LocalStorageService } from 'services/local-storage-service';
import { SettingEntity } from 'domain/entities/setting-entity';
import { I18N } from 'aurelia-i18n';
import { IngredientService } from 'services/ingredient-service';
import { getLanguages } from 'data/languages';
import { CocktailService } from 'services/cocktail-service';
import { TranslationStatus } from './translation-status';

@inject(ThemeService, LocalStorageService, I18N, IngredientService, CocktailService)
export class Settings {
    @observable public selectedTheme: string;
    @observable public selectedLanguage: string;
    @observable public selectedMessuarementSystem: MessuarementSystem;
    @observable public showMocktails: boolean;

    public themes = [
        { value: null, name: 'Dark' },
        { value: 'autumn', name: 'Light' }
    ];

    public languages = getLanguages();

    public messuarementSystems = [{ value: MessuarementSystem.Imperial }, { value: MessuarementSystem.Metric }];

    public translationStatus: TranslationStatus = {
        basic: undefined,
        ingredients: undefined,
        isDefaultLanguage: true
    };

    private _settings: SettingEntity;

    private ignoreKeys: string[] = [
        'now',
        'second_ago',
        'second_ago_other',
        'second_in',
        'second_in_other',
        'minute_ago',
        'minute_ago_other',
        'minute_in',
        'minute_in_other',
        'hour_ago',
        'hour_ago_other',
        'hour_in',
        'hour_in_other',
        'day_ago',
        'day_ago_other',
        'day_in',
        'day_in_other',
        'month_ago',
        'month_ago_other',
        'month_in',
        'month_in_other',
        'year_ago',
        'year_ago_other',
        'year_in',
        'year_in_other'
    ];

    constructor(
        private _themeService: ThemeService,
        private _localStorageService: LocalStorageService,
        private _i18n: I18N,
        private _ingredientService: IngredientService,
        private _cocktailService: CocktailService
    ) {}

    public attached() {
        this.selectedTheme = this._themeService.getLocalStorageResult();
        this.selectedMessuarementSystem = this._localStorageService.getMessuarementSystem();
        this._settings = this._localStorageService.getSettings();
        this.selectedLanguage = this._settings.language;
        this.showMocktails = this._settings.showMocktails;
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

    async showMocktailsChanged(newValue: boolean, oldValue: boolean) {
        if (oldValue === undefined) {
            return;
        }
        this._settings.showMocktails = newValue;
        await this._localStorageService.updateSettings(this._settings);
        this._cocktailService.updateShowMocktails(newValue);
    }

    async selectedLanguageChanged(newValue: string) {
        this._settings.language = newValue;
        await this._localStorageService.updateSettings(this._settings);

        const locale = newValue !== undefined ? newValue : 'en';

        await this.setLocale(locale);

        this._ingredientService.updateTranslation();
        this.setTranslationStatus(locale);

        this.themes = JSON.parse(JSON.stringify(this.themes));
        this.messuarementSystems = JSON.parse(JSON.stringify(this.messuarementSystems));
    }

    private setTranslationStatus(locale: string) {
        let enTranslationKeys = Object.keys(this._i18n.i18next.store.data['en']?.translation).filter(
            x => !this.ignoreKeys.includes(x)
        ).length;

        let enIngredientKeys = Object.keys(this._i18n.i18next.store.data['en']?.ingredients).length;

        if (locale === undefined || locale === 'en') {
            this.translationStatus = {
                basic: undefined,
                ingredients: undefined,
                isDefaultLanguage: true
            };
            return;
        }

        let translationKeys = Object.keys(this._i18n.i18next.store.data[locale].translation).filter(
            x => !this.ignoreKeys.includes(x)
        ).length;

        let ingredientKeys =
            this._i18n.i18next.store.data[locale]?.ingredients !== undefined
                ? Object.keys(this._i18n.i18next.store.data[locale]?.ingredients)?.length
                : 0;

        this.translationStatus = {
            basic: Math.floor((translationKeys / enTranslationKeys) * 100),
            ingredients: Math.floor((ingredientKeys / enIngredientKeys) * 100),
            isDefaultLanguage: false
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
