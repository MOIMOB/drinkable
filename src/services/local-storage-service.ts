import { Storage } from '@capacitor/storage';
import { MessuarementSystem } from 'enums/messuarement-system';
import { WidgetOrder } from 'models/widget-order';

export class LocalStorageService {
    private _savedIngredientIds: number[] = [];
    private _favoriteCocktails: number[] = [];
    private _messuarementSystem: MessuarementSystem;
    private _widgetOrder: WidgetOrder[] = [];

    public async initialize(): Promise<void> {
        const item = await this.getFromLocalStorage('saved-ingredients');
        this._savedIngredientIds = item !== null ? item : [];

        const messuarementSystem = await this.getFromLocalStorage('messuarement-system', false);
        this._messuarementSystem = messuarementSystem !== null ? messuarementSystem : MessuarementSystem.Imperial;

        const favoriteCocktails = await this.getFromLocalStorage('favorite-cocktails');
        this._favoriteCocktails = favoriteCocktails !== null ? favoriteCocktails : [];

        const widgetOrder = await this.getFromLocalStorage('widget-order');
        this._widgetOrder = widgetOrder !== null ? widgetOrder : [];
    }

    public async updateIngredients(numbers: number[]): Promise<void> {
        await this.updateKey('saved-ingredients', JSON.stringify(numbers));
        this._savedIngredientIds = numbers;
    }

    public async updateMessuarmentSystem(system: MessuarementSystem): Promise<void> {
        await this.updateKey('messuarement-system', system);
        this._messuarementSystem = system;
    }

    public async updateFavoriteCocktails(numbers: number[]): Promise<void> {
        await this.updateKey('favorite-cocktails', JSON.stringify(numbers));
        this._favoriteCocktails = numbers;
    }

    public async updateWidgetOrder(widgetOrder: WidgetOrder[]): Promise<void> {
        await this.updateKey('widget-order', JSON.stringify(widgetOrder));
        this._widgetOrder = widgetOrder;
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

    private async updateKey(key: string, value: string) {
        await Storage.remove({ key: key });
        await Storage.set({
            key: key,
            value: value,
        });
    }

    private async getFromLocalStorage(key: string, isObject = true) {
        const { value } = await Storage.get({ key: key });
        if (value !== null) {
            try {
                if (isObject) {
                    return JSON.parse(value);
                }
                return value;
            } catch {
                await Storage.remove({ key: key });
            }
        }
        return null;
    }
}
