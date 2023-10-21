import { Preferences } from '@capacitor/preferences';
import { MessuarementSystem } from 'domain/enums/messuarement-system';
import { Cocktail } from 'domain/entities/cocktail';
import { WidgetOrder } from 'domain/entities/widget-order';
import { Ingredient } from 'domain/entities/ingredient';
import { SettingEntity } from 'domain/entities/setting-entity';
import { CocktailInformation } from 'domain/entities/cocktail-information';
import { TagModel } from 'domain/entities/cocktail-tag';
import { ShoppingList } from 'modules/user/shopping-list/shopping-list-models';
import { IngredientList } from 'domain/entities/ingredient-list';

export class LocalStorageService {
    private _messuarementSystem: MessuarementSystem;
    private _widgetOrder: WidgetOrder[] = [];
    private _cocktails: Cocktail[] = [];
    private _ingredients: Ingredient[] = [];
    private _settings: SettingEntity;
    private _cocktailInformation: CocktailInformation[] = [];
    private _tags: TagModel[] = [];
    private _shoppingLists: ShoppingList[] = [];
    private _ingredientLists: IngredientList[] = [];
    private _activeIngredientListId = 0;

    public async initialize(): Promise<void> {
        await this.migrateSavedIngredients();

        const ingredientLists = await this.getFromLocalStorage(StorageKey.IngredientLists);
        this._ingredientLists = ingredientLists !== null ? ingredientLists : [];

        if (this._ingredientLists.length === 0) {
            await this.addDefaultIngredientList([]);
        }

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

        this._activeIngredientListId = this._settings.lastSelectedIngredientListId ?? this._ingredientLists[0].id;

        const cocktailInformation = await this.getFromLocalStorage(StorageKey.CocktailInformation);
        this._cocktailInformation = cocktailInformation !== null ? cocktailInformation : [];

        const tags = await this.getFromLocalStorage(StorageKey.Tags);
        this._tags = tags !== null ? tags : [];

        const shoppingLists = await this.getFromLocalStorage(StorageKey.ShoppingLists);
        this._shoppingLists = shoppingLists !== null ? shoppingLists : [];

        await this.migrateFavoriteCocktails();
    }

    private async migrateSavedIngredients() {
        const savedIngredientsStorageKey: StorageKey = StorageKey.SavedIngredients;

        const keyExists = await this.keyExists(savedIngredientsStorageKey);

        if (keyExists) {
            const savedIngredientsResponse = await this.getFromLocalStorage(savedIngredientsStorageKey);
            const savedIngredients: string[] =
                savedIngredientsResponse !== null ? savedIngredientsResponse.map(String) : [];

            await this.addDefaultIngredientList(savedIngredients);
            await Preferences.remove({ key: savedIngredientsStorageKey });
        }
    }

    private async addDefaultIngredientList(savedIngredients: string[]) {
        const ingredientList: IngredientList = {
            id: 0,
            ingredients: savedIngredients,
            name: 'My Bar'
        };

        await this.updateIngredientLists([ingredientList]);
    }

    private async migrateFavoriteCocktails() {
        const keyExists = await this.keyExists(StorageKey.FavoriteCocktails);

        if (keyExists) {
            const favoriteResponse = await this.getFromLocalStorage(StorageKey.FavoriteCocktails);
            const favoriteCocktails = favoriteResponse !== null ? favoriteResponse.map(String) : [];

            favoriteCocktails.forEach((element: string) => {
                const cocktailInformation = this._cocktailInformation.find(x => x.id === element);
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    public async updateIngredientList(ingredientList: IngredientList) {
        const list = this._ingredientLists.find(x => x.id === ingredientList.id);
        if (list !== undefined) {
            list.ingredients = ingredientList.ingredients;
            list.name = ingredientList.name;

            await this.updateIngredientLists(this._ingredientLists);
            return;
        }
        console.warn('Could not find ingredient list with id: ' + ingredientList.id);
    }

    public async deleteIngredientList(id: number) {
        if (id === 0) {
            return;
        }

        this._ingredientLists = this._ingredientLists.filter(x => x.id !== id);
        await this.updateIngredientLists(this._ingredientLists);
    }

    public async createIngredientList(name: string) {
        const list: IngredientList = {
            ingredients: [],
            name: name,
            id: this._ingredientLists.map(x => x.id).sort((a, b) => a + b)[0] + 1
        };

        this._ingredientLists.push(list);

        await this.updateIngredientLists(this._ingredientLists);
    }

    public async updateSavedIngredients(ingredients: string[]) {
        const list = this._ingredientLists.find(x => x.id === this._activeIngredientListId);
        if (list !== undefined) {
            list.ingredients = ingredients;

            await this.updateIngredientLists(this._ingredientLists);
            return;
        }
        console.warn('Could not find ingredient list with id: ' + this._activeIngredientListId);
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

    public async updateShoppingLists(shoppingLists: ShoppingList[]) {
        await this.updateKey(StorageKey.ShoppingLists, JSON.stringify(shoppingLists));
        this._shoppingLists = shoppingLists;
    }

    public getCocktails() {
        return this._cocktails;
    }

    public getIngredients() {
        return this._ingredients;
    }

    public getIngredientLists() {
        return this._ingredientLists;
    }

    public getActiveIngredientListId() {
        return this._activeIngredientListId;
    }

    public getIngredientList() {
        return this._ingredientLists.find(x => x.id === this._activeIngredientListId);
    }

    public getIngredientIds() {
        return this._ingredientLists.find(x => x.id === this._activeIngredientListId)?.ingredients;
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

    public getShoppingLists() {
        return this._shoppingLists;
    }

    public async setActiveIngredientListId(id: number) {
        this._settings.lastSelectedIngredientListId = id;
        await this.updateSettings(this._settings);

        this._activeIngredientListId = id;
    }

    public async keyExists(key: string): Promise<boolean> {
        const { keys } = await Preferences.keys();
        if (keys.length > 0 && keys.includes(key)) {
            return true;
        }

        return false;
    }

    private async updateIngredientLists(lists: IngredientList[]) {
        await this.updateKey(StorageKey.IngredientLists, JSON.stringify(lists));
        this._ingredientLists = lists;
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
    /**
     * @deprecated SavedIngredients have been replaced with IngredientLists
     */
    SavedIngredients = 'saved-ingredients',
    MessuarementSystem = 'messuarement-system',
    /**
     * @deprecated FavoriteCocktails have been replaced with CocktailInformation
     */
    FavoriteCocktails = 'favorite-cocktails',
    WidgetOrder = 'widget-order',
    Cocktails = 'cocktails',
    Ingredients = 'ingredients',
    Settings = 'settings',
    CocktailInformation = 'cocktail-information',
    Tags = 'tags',
    ShoppingLists = 'shopping-lists',
    IngredientLists = 'ingredient-lists'
}
