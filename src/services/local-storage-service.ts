import { Preferences } from '@capacitor/preferences';
import { MessuarementSystem } from 'domain/enums/messuarement-system';
import { Cocktail } from 'domain/entities/cocktail';
import { WidgetOrder } from 'domain/entities/widget-order';
import { Ingredient } from 'domain/entities/ingredient';
import { SettingEntity } from 'domain/entities/setting-entity';
import { CocktailInformation } from 'domain/entities/cocktail-information';

export class LocalStorageService {
    private _savedIngredientIds: string[] = [];
    private _favoriteCocktails: string[] = [];
    private _messuarementSystem: MessuarementSystem;
    private _widgetOrder: WidgetOrder[] = [];
    private _cocktails: Cocktail[] = [];
    private _ingredients: Ingredient[] = [];
    private _settings: SettingEntity;
    private _cocktailInformation: CocktailInformation[] = [];

    public async initialize(): Promise<void> {
        const item = await this.getFromLocalStorage('saved-ingredients');
        this._savedIngredientIds = item !== null ? item.map(String) : [];

        const messuarementSystem = await this.getFromLocalStorage('messuarement-system', false);
        this._messuarementSystem = messuarementSystem !== null ? messuarementSystem : MessuarementSystem.Imperial;

        const favoriteCocktails = await this.getFromLocalStorage('favorite-cocktails');
        this._favoriteCocktails = favoriteCocktails !== null ? favoriteCocktails.map(String) : [];

        const widgetOrder = await this.getFromLocalStorage('widget-order');
        this._widgetOrder = widgetOrder !== null ? widgetOrder : [];

        const cocktails = await this.getFromLocalStorage('cocktails');
        this._cocktails = cocktails !== null ? cocktails : [];

        const ingredients = await this.getFromLocalStorage('ingredients');
        this._ingredients = ingredients !== null ? ingredients : [];

        const settings = await this.getFromLocalStorage('settings');
        this._settings = settings !== null ? settings : new SettingEntity();

        const cocktailInformation = await this.getFromLocalStorage('cocktail-information');
        this._cocktailInformation = cocktailInformation !== null ? cocktailInformation : [];
    }

    public async updateCocktails(cocktails: Cocktail[]) {
        await this.updateKey('cocktails', JSON.stringify(cocktails));
        this._cocktails = cocktails;
    }

    public async updateIngredients(ingredients: Ingredient[]): Promise<void> {
        await this.updateKey('ingredients', JSON.stringify(ingredients));
        this._ingredients = ingredients;
    }

    public async updateSavedIngredients(ids: string[]): Promise<void> {
        await this.updateKey('saved-ingredients', JSON.stringify(ids));
        this._savedIngredientIds = ids;
    }

    public async updateMessuarmentSystem(system: MessuarementSystem): Promise<void> {
        await this.updateKey('messuarement-system', system);
        this._messuarementSystem = system;
    }

    public async updateFavoriteCocktails(ids: string[]): Promise<void> {
        await this.updateKey('favorite-cocktails', JSON.stringify(ids));
        this._favoriteCocktails = ids;
    }

    public async updateWidgetOrder(widgetOrder: WidgetOrder[]): Promise<void> {
        await this.updateKey('widget-order', JSON.stringify(widgetOrder));
        this._widgetOrder = widgetOrder;
    }

    public async updateSettings(settings: SettingEntity): Promise<void> {
        await this.updateKey('settings', JSON.stringify(settings));
        this._settings = settings;
    }

    public async updateCocktailInformation(cocktailInformation: CocktailInformation[]): Promise<void> {
        await this.updateKey('cocktail-information', JSON.stringify(cocktailInformation));
        this._cocktailInformation = cocktailInformation;
    }

    public getCocktails() {
        return this._cocktails;
    }

    public getIngredients() {
        return this._ingredients;
    }

    public getIngredientIds() {
        return this._savedIngredientIds;
    }

    public getMessuarementSystem() {
        return this._messuarementSystem;
    }

    public getFavoriteCocktails() {
        return this._favoriteCocktails;
    }

    public getWidgetOrder() {
        return this._widgetOrder;
    }

    public getSettings() {
        return this._settings;
    }

    public getCocktailInformation() {
        return this._cocktailInformation;
    }

    public async keyExists(key: string): Promise<boolean> {
        const { keys } = await Preferences.keys();
        if (keys.length > 0 && keys.includes(key)) {
            return true;
        }

        return false;
    }

    private async updateKey(key: string, value: string) {
        await Preferences.remove({ key: key });
        await Preferences.set({
            key: key,
            value: value
        });
    }

    private async getFromLocalStorage(key: string, isObject = true) {
        const { value } = await Preferences.get({ key: key });
        if (value !== null) {
            try {
                if (isObject) {
                    return JSON.parse(value);
                }
                return value;
            } catch {
                await Preferences.remove({ key: key });
            }
        }
        return null;
    }
}
