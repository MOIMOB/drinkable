import { LocalStorageService } from 'services/local-storage-service';
import {
    BackupCocktail,
    BackupCocktailInformation,
    BackupEntity,
    BackupIngredient,
    BackupIngredientGroup,
    BackupShoppingList,
    BackupShoppingListIngredient,
    BackupTagModel,
    BackupVersion
} from './backup-entity';

export class BackupEntityBuilder {
    private _version: BackupVersion = 1;
    private _tags: BackupTagModel[] = [];
    private _ingredients: BackupIngredient[] = [];
    private _cocktails: BackupCocktail[] = [];
    private _cocktailInformation: BackupCocktailInformation[] = [];
    private _shoppingLists: BackupShoppingList[] = [];

    private _localStorageService: LocalStorageService;

    constructor(localStorageService: LocalStorageService) {
        this._localStorageService = localStorageService;
    }

    public withTags(): BackupEntityBuilder {
        const result = this._localStorageService.getTags().map(tag => {
            return new BackupTagModel(tag.id, tag.name);
        });
        this._tags = result;
        return this;
    }

    public withIngredients(): BackupEntityBuilder {
        const result = this._localStorageService.getIngredients().map<BackupIngredient>(x => {
            return new BackupIngredient(x.id, x.name, x.abv, x.spiritType);
        });

        this._ingredients = result;
        return this;
    }

    public withCocktails(): BackupEntityBuilder {
        const result = this._localStorageService.getCocktails().map(cocktail => {
            const ingredientGroups =
                cocktail?.ingredientGroups?.map(x => {
                    return new BackupIngredientGroup(x.ingredientId, x.amount, x.unit);
                }) ?? [];

            return new BackupCocktail(
                cocktail.id,
                cocktail.name,
                cocktail.imageSrc,
                cocktail.category,
                cocktail.instructions,
                cocktail.notes,
                cocktail.isFavorite,
                cocktail.tags,
                ingredientGroups
            );
        });

        this._cocktails = result;
        return this;
    }

    public withCocktailInformation(): BackupEntityBuilder {
        const result = this._localStorageService.getCocktailInformation().map(cocktailInformation => {
            const cocktailInformationIngredientGroups =
                cocktailInformation?.ingredientGroups?.map(x => {
                    return new BackupIngredientGroup(x.ingredientId, x.amount, x.unit);
                }) ?? [];

            return new BackupCocktailInformation(
                cocktailInformation.id,
                cocktailInformation.rating,
                cocktailInformation.isFavorite,
                cocktailInformation.notes,
                cocktailInformation.category,
                cocktailInformation.tags,
                cocktailInformationIngredientGroups
            );
        });

        this._cocktailInformation = result;

        return this;
    }

    public withShoppingLists(): BackupEntityBuilder {
        const result =
            this._localStorageService.getShoppingLists()?.map(shoppingList => {
                const ingredients =
                    shoppingList?.ingredients?.map(x => new BackupShoppingListIngredient(x.id, x.shopped)) ?? [];

                return new BackupShoppingList(shoppingList.id, shoppingList.name, ingredients);
            }) ?? [];

        this._shoppingLists = result;

        return this;
    }

    public build(): BackupEntity {
        return {
            version: this._version,
            tags: this._tags,
            ingredients: this._ingredients,
            cocktails: this._cocktails,
            cocktailInformation: this._cocktailInformation,
            shoppingLists: this._shoppingLists
        };
    }
}
