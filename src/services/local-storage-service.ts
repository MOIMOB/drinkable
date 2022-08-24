import { Preferences } from '@capacitor/preferences';
import { MessuarementSystem } from 'enums/messuarement-system';
import { Cocktail } from 'models/cocktail';
import { WidgetOrder } from 'models/widget-order';

export class LocalStorageService {
    private _savedIngredientIds: number[] = [];
    private _favoriteCocktails: string[] = [];
    private _messuarementSystem: MessuarementSystem;
    private _widgetOrder: WidgetOrder[] = [];
    private _cocktails: Cocktail[] = [];

    public async initialize(): Promise<void> {
        const item = await this.getFromLocalStorage('saved-ingredients');
        this._savedIngredientIds = item !== null ? item : [];

        const messuarementSystem = await this.getFromLocalStorage('messuarement-system', false);
        this._messuarementSystem = messuarementSystem !== null ? messuarementSystem : MessuarementSystem.Imperial;

        const favoriteCocktails = await this.getFromLocalStorage('favorite-cocktails');
        this._favoriteCocktails = favoriteCocktails !== null ? favoriteCocktails.map(String) : [];

        const widgetOrder = await this.getFromLocalStorage('widget-order');
        this._widgetOrder = widgetOrder !== null ? widgetOrder : [];

        const cocktails = await this.getFromLocalStorage('cocktails');
        this._cocktails = cocktails !== null ? cocktails : [];
    }

    public async updateCocktails(cocktails: Cocktail[]) {
        console.log(cocktails);
        await this.updateKey('cocktails', JSON.stringify(cocktails));
        this._cocktails = cocktails;
    }

    public async updateIngredients(numbers: number[]): Promise<void> {
        await this.updateKey('saved-ingredients', JSON.stringify(numbers));
        this._savedIngredientIds = numbers;
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

    public getCocktails() {
        return this._cocktails;
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
            value: value,
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
