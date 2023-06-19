import { ThemeService } from 'services/theme-service';
import { autoinject, observable } from 'aurelia-framework';
import { MessuarementSystem } from 'domain/enums/messuarement-system';
import { LocalStorageService } from 'services/local-storage-service';
import { SettingEntity } from 'domain/entities/setting-entity';
import { I18N } from 'aurelia-i18n';
import { IngredientService } from 'services/ingredient-service';
import { getLanguages } from 'data/languages';
import { CocktailService } from 'services/cocktail-service';

@autoinject
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
        basic: 100,
        ingredients: 100,
        cocktails: 100,
        instructions: 100,
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
        this._cocktailService.updateTranslation();
        this.setTranslationStatus(locale);

        this.themes = JSON.parse(JSON.stringify(this.themes));
        this.messuarementSystems = JSON.parse(JSON.stringify(this.messuarementSystems));
    }

    private setTranslationStatus(locale: string) {
        if (locale === undefined || locale === 'en') {
            this.translationStatus = {
                basic: 100,
                ingredients: 100,
                cocktails: 100,
                instructions: 100,
                isDefaultLanguage: true
            };
            return;
        }

        let enTranslationKeys = Object.keys(this._i18n.i18next.store.data['en']?.translation).filter(
            x => !this.ignoreKeys.includes(x)
        ).length;

        let enIngredientKeys = this.getTranslationKeyLength('en', 'ingredients');
        let enCocktailKeys = this.getTranslationKeyLength('en', 'cocktails');
        let enInstructionKeys = this.getTranslationKeyLength('en', 'instructions');

        let translationKeys = Object.keys(this._i18n.i18next.store.data[locale].translation).filter(
            x => !this.ignoreKeys.includes(x)
        ).length;

        let ingredientKeys = this.getTranslationKeyLength(locale, 'ingredients');
        let cocktailKeys = this.getTranslationKeyLength(locale, 'cocktails');
        let instructionKeys = this.getTranslationKeyLength(locale, 'instructions');

        this.translationStatus = {
            basic: Math.floor((translationKeys / enTranslationKeys) * 100),
            ingredients: Math.floor((ingredientKeys / enIngredientKeys) * 100),
            cocktails: Math.floor((cocktailKeys / enCocktailKeys) * 100),
            instructions: Math.floor((instructionKeys / enInstructionKeys) * 100),
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

    private getTranslationKeyLength(locale: string, prop: string) {
        return this._i18n.i18next.store.data[locale]?.[prop] !== undefined
            ? Object.keys(this._i18n.i18next.store.data[locale]?.[prop])?.length
            : 0;
    }
}

export interface TranslationStatus {
    basic: number;
    ingredients: number;
    cocktails: number;
    instructions: number;
    isDefaultLanguage: boolean;
}
