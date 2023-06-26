import { Preferences } from '@capacitor/preferences';
import { MessuarementSystem } from 'domain/enums/messuarement-system';
import { Cocktail } from 'domain/entities/cocktail';
import { WidgetOrder } from 'domain/entities/widget-order';
import { Ingredient } from 'domain/entities/ingredient';
import { SettingEntity } from 'domain/entities/setting-entity';
import { CocktailInformation } from 'domain/entities/cocktail-information';
import { TagModel } from 'domain/entities/cocktail-tag';

export class LocalStorageService {
    private _savedIngredientIds: string[] = [];
    private _messuarementSystem: MessuarementSystem;
    private _widgetOrder: WidgetOrder[] = [];
    private _cocktails: Cocktail[] = [];
    private _ingredients: Ingredient[] = [];
    private _settings: SettingEntity;
    private _cocktailInformation: CocktailInformation[] = [];
    private _tags: TagModel[] = [];

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

        const tags = await this.getFromLocalStorage(StorageKey.Tags);
        this._tags = tags !== null ? tags : [];

        await this.migrateFavoriteCocktails();
    }

    private async migrateFavoriteCocktails() {
        let keyExists = await this.keyExists(StorageKey.FavoriteCocktails);

        if (keyExists) {
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
        // No not save alocholInformation to LocalStorage
        const newArr = cocktails.map(({ alcoholInformation, ...x }) => {
            return x;
        });

        await this.updateKey(StorageKey.Cocktails, JSON.stringify(newArr));
        this._cocktails = cocktails;
    }

    public async updateIngredients(ingredients: Ingredient[]) {
        await this.updateKey(StorageKey.Ingredients, JSON.stringify(ingredients));
        this._ingredients = ingredients;
    }

    public async updateSavedIngredients(ids: string[]) {
        await this.updateKey(StorageKey.SavedIngredients, JSON.stringify(ids));
        this._savedIngredientIds = ids;
    }

    public async updateMessuarmentSystem(system: MessuarementSystem) {
        await this.updateKey(StorageKey.MessuarementSystem, system);
        this._messuarementSystem = system;
    }

    public async updateWidgetOrder(widgetOrder: WidgetOrder[]) {
        await this.updateKey(StorageKey.WidgetOrder, JSON.stringify(widgetOrder));
        this._widgetOrder = widgetOrder;
    }

    public async updateSettings(settings: SettingEntity) {
        await this.updateKey(StorageKey.Settings, JSON.stringify(settings));
        this._settings = settings;
    }

    public async updateCocktailInformation(cocktailInformation: CocktailInformation[]) {
        await this.updateKey(StorageKey.CocktailInformation, JSON.stringify(cocktailInformation));
        this._cocktailInformation = cocktailInformation;
    }

    public async updateTags(tags: TagModel[]) {
        await this.updateKey(StorageKey.Tags, JSON.stringify(tags));
        this._tags = tags;
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

    public getTags() {
        return this._tags;
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
    CocktailInformation = 'cocktail-information',
    Tags = 'tags'
}
