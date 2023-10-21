import { inject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import { Cocktail, ExtendedIngredientGroup, IngredientGroup } from 'domain/entities/cocktail';
import { CreatedIngredientModel, Ingredient, ManageIngredientModel } from 'domain/entities/ingredient';
import { SpiritType } from 'domain/enums/spirit-type';
import { getStaticIngredients } from 'data/ingredient-data';
import { LocalStorageService } from './local-storage-service';

@inject(LocalStorageService, I18N)
export class IngredientService {
    private _ingredients: Ingredient[] = [];
    private _createdIngredients: Ingredient[] = [];
    private _highestId = 0;

    constructor(
        private _localStorageService: LocalStorageService,
        private _i18n: I18N
    ) {
        this._createdIngredients = this._localStorageService.getIngredients();

        const staticIngredients = getStaticIngredients();
        staticIngredients.forEach(element => {
            this._ingredients.push({
                id: element.id,
                name: this._i18n.tr(element.translation, { ns: 'ingredients' }),
                spiritType: element.spiritType,
                translation: element.translation,
                recipeId: element.recipeId,
                replacementIds: element.replacementIds,
                abv: element.abv
            });
        });

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
            translation: x.translation,
            isActive: false,
            recipeId: x.recipeId,
            abv: x.abv,
            replacementIds: x.replacementIds
        }));
    }

    public getIngredientById(id: string): Ingredient {
        return this._ingredients.find(x => x.id === id);
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
            isInStorage: this.ingredientIsInStorage(ingredientIds, x.ingredientId),
            isChecked: false,
            substituteNames: this.getSubstituteNames(this._ingredients.find(y => y.id === x.ingredientId))
        }));
    }

    public getCreatedIngredientModels(cocktails: Cocktail[]): CreatedIngredientModel[] {
        return this.getCreatedIngredients().map(x => ({
            id: x.id,
            name: x.name,
            spiritType: x.spiritType,
            translation: x.translation,
            recipeId: x.recipeId,
            abv: x.abv,
            replacementIds: x.replacementIds,
            usedInCocktailNames: cocktails
                .filter(y => y.ingredientGroups.some(z => z.ingredientId === x.id))
                .map(a => a.name)
        }));
    }

    public getManageIngredientModels(activeIds: string[]): ManageIngredientModel[] {
        return this.getIngredients().map(x => ({
            id: x.id,
            name: x.name,
            spiritType: x.spiritType,
            translation: x.translation,
            isActive: activeIds.includes(x.id),
            recipeId: x.recipeId,
            abv: x.abv,
            replacementIds: x.replacementIds
        }));
    }

    public async createIngredient(request: CreateIngredientRequest) {
        const ingredient = new Ingredient();
        ingredient.name = request.name;
        ingredient.abv = request.abv;
        ingredient.spiritType = request.spiritType ?? SpiritType.None;
        ingredient.id = this.setIngredientId();
        this._createdIngredients.push(ingredient);

        await this._localStorageService.updateIngredients(this._createdIngredients);

        this._ingredients.push(ingredient);
        return ingredient;
    }

    public async updateIngredient(request: UpdateIngredientRequest) {
        const updatedIngredient: Ingredient = {
            id: request.id,
            name: request.name,
            abv: request.abv,
            spiritType: request.spiritType,
            translation: undefined
        };

        this._createdIngredients = this._createdIngredients.filter(x => x.id !== updatedIngredient.id);
        this._createdIngredients.push(updatedIngredient);

        await this._localStorageService.updateIngredients(this._createdIngredients);

        this._ingredients = this._ingredients.filter(x => x.id !== updatedIngredient.id);
        this._ingredients.push(updatedIngredient);
    }

    public updateTranslation() {
        this._ingredients.forEach(element => {
            if (element.translation !== undefined) {
                element.name = this._i18n.tr(element.translation, { ns: 'ingredients' });
            }
        });
    }

    public async deleteIngredient(id: string) {
        this._createdIngredients = this._createdIngredients.filter(x => x.id !== id);
        await this._localStorageService.updateIngredients(this._createdIngredients);
        this._ingredients = this._ingredients.filter(x => x.id !== id);
    }

    public getIngredientAndReplacementIds(id: string): string[] {
        const ingredient = this._ingredients.find(x => x.id === id);
        if (ingredient === undefined) {
            return [];
        }

        return this.toIngredientAndReplacementIds(ingredient);
    }

    private toIngredientAndReplacementIds(ingredient: Ingredient) {
        const ids: string[] = [ingredient.id];

        if (ingredient.replacementIds !== undefined) {
            ids.push(...ingredient.replacementIds);
        }
        return ids;
    }

    private setIngredientId(): string {
        this._highestId++;
        return 'x-' + this._highestId;
    }

    private getSubstituteNames(ingredient: Ingredient): string {
        const names = [];

        ingredient?.replacementIds?.forEach(x => {
            const translation = this._ingredients.find(y => y.id === x).translation;
            if (translation !== undefined) {
                names.push(this._i18n.tr(translation, { ns: 'ingredients' }));
            }
        });

        return names.join(', ');
    }

    private ingredientIsInStorage(currentIngredients: string[], ingredientId: string) {
        if (currentIngredients.includes(ingredientId)) {
            return true;
        }

        const replacementIds = this._ingredients.find(x => x.id === ingredientId)?.replacementIds;
        if (replacementIds !== undefined && currentIngredients.some(x => replacementIds.includes(x))) {
            return true;
        }

        return false;
    }
}

export type CreateIngredientRequest = {
    name: string;
    abv?: number;
    spiritType?: SpiritType;
};

export class UpdateIngredientRequest {
    id: string;
    name: string;
    abv?: number;
    spiritType?: SpiritType;
}
