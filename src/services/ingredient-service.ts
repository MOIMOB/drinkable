import { inject } from 'aurelia-framework';
import { Cocktail, ExtendedIngredientGroup, IngredientGroup } from 'domain/entities/cocktail';
import { CreatedIngredientModel, Ingredient, ManageIngredientModel } from 'domain/entities/ingredient';
import { SpiritType } from 'domain/enums/spirit-type';
import { getStaticIngredients } from 'functions/ingredient-functions';
import { LocalStorageService } from './local-storage-service';

@inject(LocalStorageService)
export class IngredientService {
    private _ingredients: Ingredient[] = getStaticIngredients();
    private _createdIngredients: Ingredient[] = [];
    private _highestId = 0;

    constructor(private _localStorageService: LocalStorageService) {
        this._createdIngredients = this._localStorageService.getIngredients();

        this._createdIngredients.forEach(x => {
            const id = Number(x.id.split('-')[1]);
            if (id > this._highestId) {
                this._highestId = id;
            }

            this._ingredients.push(x);
        });
    }

    public getCreatedIngredients() {
        return [...this._createdIngredients].sort((a, b) => a.name?.localeCompare(b.name));
    }

    public getIngredients() {
        return [...this._ingredients].sort((a, b) => a.name.localeCompare(b.name));
    }

    public getRandomIngredients(count: number, excludeIds: string[] = []): ManageIngredientModel[] {
        const ingredients = this.getIngredients().filter(x => !excludeIds.includes(x.id));

        const randomIngredients = ingredients.sort(() => 0.5 - Math.random()).slice(0, count);

        return randomIngredients.map(x => ({
            id: x.id,
            name: x.name,
            spiritType: x.spiritType,
            isActive: false,
        }));
    }

    public getIngredientsByIds(ids: string[]): Ingredient[] {
        return this.getIngredients().filter(x => ids.includes(x.id));
    }

    public getIngredientsBySpiritType(spirit: SpiritType): Ingredient[] {
        return this.getIngredients().filter(x => x.spiritType === spirit);
    }

    public toExtendedIngredientGroup(groups: IngredientGroup[], ingredientIds: string[]): ExtendedIngredientGroup[] {
        return groups?.map(x => ({
            amount: x.amount,
            ingredientId: x.ingredientId,
            unit: x.unit,
            ingredient: this._ingredients.find(y => y.id === x.ingredientId),
            isInStorage: ingredientIds.includes(x.ingredientId),
            isChecked: false,
        }));
    }

    public getCreatedIngredientModels(cocktails: Cocktail[]): CreatedIngredientModel[] {
        return this.getCreatedIngredients().map(x => ({
            id: x.id,
            name: x.name,
            spiritType: x.spiritType,
            usedInCocktailNames: cocktails
                .filter(y => y.ingredientGroups.some(z => z.ingredientId === x.id))
                .map(a => a.name),
        }));
    }

    public getManageIngredientModels(activeIds: string[]): ManageIngredientModel[] {
        return this.getIngredients().map(x => ({
            id: x.id,
            name: x.name,
            spiritType: x.spiritType,
            isActive: activeIds.includes(x.id),
        }));
    }

    public async createIngredient(name: string): Promise<Ingredient> {
        const ingredient = new Ingredient();
        ingredient.name = name;
        ingredient.id = this.setIngredientId();
        this._createdIngredients.push(ingredient);

        await this._localStorageService.updateIngredients(this._createdIngredients);

        this._ingredients.push(ingredient);
        return ingredient;
    }

    public async updateIngredient(ingredient: Ingredient) {
        this._createdIngredients = this._createdIngredients.filter(x => x.id !== ingredient.id);
        this._createdIngredients.push(ingredient);

        await this._localStorageService.updateIngredients(this._createdIngredients);

        this._ingredients = this._ingredients.filter(x => x.id !== ingredient.id);
        this._ingredients.push(ingredient);
    }

    public async deleteIngredient(id: string) {
        this._createdIngredients = this._createdIngredients.filter(x => x.id !== id);
        await this._localStorageService.updateIngredients(this._createdIngredients);
        this._ingredients = this._ingredients.filter(x => x.id !== id);
    }

    private setIngredientId(): string {
        this._highestId++;
        return 'x-' + this._highestId;
    }
}
