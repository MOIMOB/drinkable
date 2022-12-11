import { Preferences } from '@capacitor/preferences';
import { MessuarementSystem } from 'domain/enums/messuarement-system';
import { Cocktail } from 'domain/entities/cocktail';
import { WidgetOrder } from 'domain/entities/widget-order';
import { Ingredient } from 'domain/entities/ingredient';
import { SettingEntity } from 'domain/entities/setting-entity';
import { CocktailInformation } from 'domain/entities/cocktail-information';

export class LocalStorageService {
    private _savedIngredientIds: string[] = [];
    private _messuarementSystem: MessuarementSystem;
    private _widgetOrder: WidgetOrder[] = [];
    private _cocktails: Cocktail[] = [];
    private _ingredients: Ingredient[] = [];
    private _settings: SettingEntity;
    private _cocktailInformation: CocktailInformation[] = [];

    public async initialize(): Promise<void> {
        const savedIngredients = await this.getFromLocalStorage(StorageKey.SavedIngredients);
        this._savedIngredientIds = savedIngredients !== null ? savedIngredients.map(String) : [];

        const messuarementSystem = await this.getFromLocalStorage(StorageKey.MessuarementSystem, false);
        this._messuarementSystem = messuarementSystem !== null ? messuarementSystem : MessuarementSystem.Imperial;

        const widgetOrder = await this.getFromLocalStorage(StorageKey.WidgetOrder);
        this._widgetOrder = widgetOrder !== null ? widgetOrder : [];

        const cocktails = await this.getFromLocalStorage(StorageKey.Cocktails);
        this._cocktails = cocktails !== null ? cocktails : [];

        const ingredients = await this.getFromLocalStorage(StorageKey.Ingredients);
        this._ingredients = ingredients !== null ? ingredients : [];

        const settings = await this.getFromLocalStorage(StorageKey.Settings);
        this._settings = settings !== null ? settings : new SettingEntity();

        const cocktailInformation = await this.getFromLocalStorage(StorageKey.CocktailInformation);
        this._cocktailInformation = cocktailInformation !== null ? cocktailInformation : [];

        await this.migrateFavoriteCocktails();
    }

    private async migrateFavoriteCocktails() {
        if (this.keyExists(StorageKey.FavoriteCocktails)) {
            const favoriteResponse = await this.getFromLocalStorage(StorageKey.FavoriteCocktails);
            let favoriteCocktails = favoriteResponse !== null ? favoriteResponse.map(String) : [];

            favoriteCocktails.forEach((element: string) => {
                let cocktailInformation = this._cocktailInformation.find(x => x.id === element);
                if (cocktailInformation !== undefined) {
                    cocktailInformation.isFavorite = true;
                } else {
                    this._cocktailInformation.push({
                        id: element,
                        isFavorite: true
                    });
                }
            });

            await this.updateCocktailInformation(this._cocktailInformation);
            await Preferences.remove({ key: StorageKey.FavoriteCocktails });
        }
    }

    public async updateCocktails(cocktails: Cocktail[]) {
        await this.updateKey(StorageKey.Cocktails, JSON.stringify(cocktails));
        this._cocktails = cocktails;
    }

    public async updateIngredients(ingredients: Ingredient[]): Promise<void> {
        await this.updateKey(StorageKey.Ingredients, JSON.stringify(ingredients));
        this._ingredients = ingredients;
    }

    public async updateSavedIngredients(ids: string[]): Promise<void> {
        await this.updateKey(StorageKey.SavedIngredients, JSON.stringify(ids));
        this._savedIngredientIds = ids;
    }

    public async updateMessuarmentSystem(system: MessuarementSystem): Promise<void> {
        await this.updateKey(StorageKey.MessuarementSystem, system);
        this._messuarementSystem = system;
    }

    public async updateWidgetOrder(widgetOrder: WidgetOrder[]): Promise<void> {
        await this.updateKey(StorageKey.WidgetOrder, JSON.stringify(widgetOrder));
        this._widgetOrder = widgetOrder;
    }

    public async updateSettings(settings: SettingEntity): Promise<void> {
        await this.updateKey(StorageKey.Settings, JSON.stringify(settings));
        this._settings = settings;
    }

    public async updateCocktailInformation(cocktailInformation: CocktailInformation[]): Promise<void> {
        await this.updateKey(StorageKey.CocktailInformation, JSON.stringify(cocktailInformation));
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

export enum StorageKey {
    SavedIngredients = 'saved-ingredients',
    MessuarementSystem = 'messuarement-system',
    FavoriteCocktails = 'favorite-cocktails',
    WidgetOrder = 'widget-order',
    Cocktails = 'cocktails',
    Ingredients = 'ingredients',
    Settings = 'settings',
    CocktailInformation = 'cocktail-information'
}
