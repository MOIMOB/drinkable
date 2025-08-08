import { LocalStorageService } from './local-storage-service';
import { autoinject } from 'aurelia-framework';
import { Cocktail, CocktailWithMissingIngredient } from 'domain/entities/cocktail';
import { getStaticCocktailById, getStaticCocktails, toCocktailWithMissingIngredients } from 'data/cocktail-data';
import { IngredientService } from './ingredient-service';
import { CocktailInformation } from 'domain/entities/cocktail-information';
import { DrinkCategory } from 'domain/enums/drink-category';
import { TagModel } from 'domain/entities/cocktail-tag';
import { getTags } from 'data/tags-data';
import { I18N } from 'aurelia-i18n';
import { CocktailAlcoholInformation } from 'domain/cocktail-alcohol-information';
import { DrinkTypeFilter } from 'domain/enums/drink-type-filter';

@autoinject
export class CocktailService {
    private _cocktails: Cocktail[];
    private _createdCocktails: Cocktail[];
    private _cocktailInformation: CocktailInformation[];
    private _mocktails: Cocktail[];
    private _highestId: number;
    private _tags: TagModel[];
    private _createdTags: TagModel[];
    private _highestTagId: number;

    constructor(
        private _localStorageService: LocalStorageService,
        private _ingredientService: IngredientService,
        private i18n: I18N
    ) {
        this.reloadService();
    }

    public reloadService() {
        this._cocktails = [];
        this._createdCocktails = [];
        this._cocktailInformation = [];
        this._mocktails = [];
        this._highestId = 0;
        this._tags = getTags();
        this._createdTags = [];
        this._highestTagId = 0;

        this._createdCocktails = this._localStorageService.getCocktails();
        this._cocktailInformation = this._localStorageService.getCocktailInformation();

        const ingredients = this._ingredientService.getIngredients();

        const staticCocktails = getStaticCocktails();
        staticCocktails.forEach(element => {
            const cocktail: Cocktail = {
                id: element.id,
                category: this._cocktailInformation.find(x => x.id === element.id)?.category ?? element.category,
                imageSrc: element.imageSrc,
                ingredientGroups:
                    this._cocktailInformation.find(x => x.id === element.id)?.ingredientGroups ??
                    element.ingredientGroups,
                isImagePortrait: element.isImagePortrait,
                name: this.i18n.tr(element.translation, { ns: 'cocktails' }),
                notes: this._cocktailInformation.find(x => x.id === element.id)?.notes ?? '',
                tags: this._cocktailInformation.find(x => x.id === element.id)?.tags ?? element.tags,
                translation: element.translation,
                isFavorite: this._cocktailInformation.find(x => x.id === element.id)?.isFavorite ?? false,
                rating: this._cocktailInformation.find(x => x.id === element.id)?.rating ?? 0,
                isEdited: this.isCocktailEdited(this._cocktailInformation.find(x => x.id === element.id))
            };

            cocktail.alcoholInformation = new CocktailAlcoholInformation(cocktail, ingredients);

            this._cocktails.push(cocktail);
        });

        this._createdCocktails.forEach(x => {
            const id = Number(x.id.split('-')[1]);
            if (id > this._highestId) {
                this._highestId = id;
            }

            x.tags = x.tags !== undefined ? x.tags : [];
            x.notes = x.notes !== undefined ? x.notes : '';
            x.alcoholInformation = new CocktailAlcoholInformation(x, ingredients);
            x.isEdited = false;

            this._cocktails.push(x);
        });

        this._mocktails = this._cocktails.filter(x => x.category === DrinkCategory.Mocktail);

        // Apply drink type filter
        const settings = this._localStorageService.getSettings();
        this.applyDrinkTypeFilter(settings.drinkTypeFilter);

        this._createdTags = this._localStorageService.getTags();
        this._createdTags.forEach(element => {
            const id = Number(element.id.split('-')[1]);
            if (id > this._highestTagId) {
                this._highestTagId = id;
            }
            this._tags.push(element);
        });
    }

    public getCocktails() {
        return [...this._cocktails].sort((a, b) => a.name?.localeCompare(b.name));
    }

    public getCreatedCocktails() {
        return [...this._createdCocktails].sort((a, b) => a.name.localeCompare(b.name));
    }

    public getTags() {
        return [...this._tags];
    }

    public getCreatedTags() {
        return [...this._createdTags];
    }

    public getCocktailById(id: string): Cocktail | undefined {
        return [...this._cocktails].find(x => x.id === id);
    }

    public getCocktailsByIds(ids: string[]) {
        return [...this._cocktails].filter(x => ids.includes(x.id)).sort((a, b) => a.name.localeCompare(b.name));
    }

    public getRandomCocktails(amount: number) {
        return [...this._cocktails].sort(() => 0.5 - Math.random()).slice(0, amount);
    }

    public getLatestCocktails(amount: number) {
        return [...this._cocktails]
            .filter(x => !x.id.includes('x'))
            .slice(amount * -1)
            .reverse();
    }

    public getCocktailsByIngredientIds(ingredientIds: string[]): Cocktail[] {
        const validCocktails = [];

        [...this._cocktails].forEach(element => {
            const cocktailIngredients = element.ingredientGroups.map(x => x.ingredientId);

            const result = [...new Set(cocktailIngredients.map(x => this.ingredientIdExists(ingredientIds, x)))];
            if (result.length === 1 && result[0]) {
                validCocktails.push(element);
            }
        });

        return validCocktails.sort((a, b) => a.name.localeCompare(b.name));
    }

    public getCocktailsWithMissingIngredients(ingredientIds: string[]) {
        const validCocktails: CocktailWithMissingIngredient[] = [];

        [...this._cocktails].forEach(element => {
            const ids = element.ingredientGroups.map(x => x.ingredientId);

            let validIds = 0;
            const missingIngredientIds = [];

            ids.forEach(element => {
                if (this.ingredientIdExists(ingredientIds, element)) {
                    validIds++;
                } else {
                    missingIngredientIds.push(element);
                }
            });

            if (validIds === ids.length - 1) {
                const cocktailWithMissingIngredients = toCocktailWithMissingIngredients(
                    element,
                    this._ingredientService.getIngredientById(missingIngredientIds[0])
                );
                validCocktails.push(cocktailWithMissingIngredients);
            }
        });

        return validCocktails.sort(
            (a, b) =>
                this.getMissingIngredientsCount(validCocktails, b) -
                    this.getMissingIngredientsCount(validCocktails, a) ||
                a.missingIngredient.id.localeCompare(b.missingIngredient.id) ||
                a.name.localeCompare(b.name)
        );
    }

    public async createCocktail(cocktail: Cocktail): Promise<Cocktail> {
        cocktail.id = this.setCocktailId();
        cocktail.alcoholInformation = new CocktailAlcoholInformation(
            cocktail,
            this._ingredientService.getIngredients()
        );
        cocktail.isEdited = false;

        this._createdCocktails.push(cocktail);
        this._cocktails.push(cocktail);
        await this._localStorageService.updateCocktails(this._createdCocktails);
        return cocktail;
    }

    public async restoreCocktail(cocktail: Cocktail): Promise<Cocktail> {
        this._cocktailInformation = this._cocktailInformation.filter(x => x.id !== cocktail.id);
        this._cocktailInformation.push({
            id: cocktail.id,
            rating: cocktail.rating,
            isFavorite: cocktail.isFavorite,
            notes: cocktail.notes,
            category: undefined,
            tags: undefined,
            ingredientGroups: undefined
        });

        const cocktailtoUpdate = this._cocktails.find(x => x.id === cocktail.id);
        const staticCocktail = getStaticCocktails().find(x => x.id === cocktail.id);
        if (cocktailtoUpdate != null && staticCocktail != null) {
            cocktailtoUpdate.category = staticCocktail.category;
            cocktailtoUpdate.tags = staticCocktail.tags;
            cocktailtoUpdate.ingredientGroups = staticCocktail.ingredientGroups;
            cocktailtoUpdate.isEdited = false;

            cocktailtoUpdate.alcoholInformation = new CocktailAlcoholInformation(
                cocktailtoUpdate,
                this._ingredientService.getIngredients()
            );
        }

        await this._localStorageService.updateCocktailInformation(this._cocktailInformation);

        return cocktailtoUpdate;
    }

    public async createTag(name: string) {
        const newTag: TagModel = {
            id: this.setTagId(),
            translation: undefined,
            name: name
        };

        this._createdTags.push(newTag);

        await this._localStorageService.updateTags(this._createdTags);

        this._tags.push(newTag);
    }

    public async updateCocktail(cocktail: Cocktail): Promise<Cocktail> {
        this._createdCocktails = this._createdCocktails.filter(x => x.id !== cocktail.id);
        this._createdCocktails.push(cocktail);

        await this._localStorageService.updateCocktails(this._createdCocktails);

        this._cocktails = this._cocktails.filter(x => x.id !== cocktail.id);
        this._cocktails.push(cocktail);

        return cocktail;
    }

    public async updateTag(tag: TagModel) {
        this._createdTags = this._createdTags.filter(x => x.id !== tag.id);
        this._createdTags.push(tag);

        await this._localStorageService.updateTags(this._createdTags);

        this._tags = this._tags.filter(x => x.id !== tag.id);
        this._tags.push(tag);
    }

    public async updateCocktailInformationByRequest(
        updateRequest: UpdateCocktailInformationRequest
    ): Promise<Cocktail> {
        let cocktailInformation = this._cocktailInformation.find(x => x.id === updateRequest.id);
        if (cocktailInformation == null) {
            cocktailInformation = {
                id: updateRequest.id
            };
            this._cocktailInformation.push(cocktailInformation);
        }

        const cocktail = this._cocktails.find(x => x.id === updateRequest.id);
        const staticCocktail = getStaticCocktailById(updateRequest.id);

        updateRequest.getFields().forEach(element => {
            cocktailInformation[element.key.toString()] = element.value;
            cocktail[element.key.toString()] =
                element.value === undefined ? staticCocktail[element.key.toString()] : element.value;
        });

        cocktail.isEdited = this.isCocktailEdited(cocktailInformation);
        cocktail.alcoholInformation = new CocktailAlcoholInformation(
            cocktail,
            this._ingredientService.getIngredients()
        );

        await this._localStorageService.updateCocktailInformation(this._cocktailInformation);

        return cocktail;
    }

    public updateTranslation() {
        this._cocktails.forEach(element => {
            if (element.translation !== undefined) {
                element.name = this.i18n.tr(element.translation, { ns: 'cocktails' });
            }
        });
    }

    public async deleteCocktail(id: string) {
        this._createdCocktails = this._createdCocktails.filter(x => x.id !== id);
        await this._localStorageService.updateCocktails(this._createdCocktails);
        this._cocktails = this._cocktails.filter(x => x.id !== id);

        this._cocktailInformation = this._cocktailInformation.filter(x => x.id !== id);
        await this._localStorageService.updateCocktailInformation(this._cocktailInformation);
    }

    public async deleteTag(id: string) {
        this._createdTags = this._createdTags.filter(x => x.id !== id);
        await this._localStorageService.updateTags(this._createdTags);
        this._tags = this._tags.filter(x => x.id !== id);
    }

    public updateDrinkTypeFilter(filter: DrinkTypeFilter) {
        this.applyDrinkTypeFilter(filter);
    }

    private applyDrinkTypeFilter(filter: DrinkTypeFilter) {
        // Get all cocktails (regular + created)
        const staticCocktails = this._cocktails.filter(x => !x.id.includes('x-'));
        const createdCocktails = this._createdCocktails;
        const allCocktails = [...staticCocktails, ...createdCocktails, ...this._mocktails];
        
        // Remove duplicates
        const uniqueCocktails = allCocktails.filter((cocktail, index, self) => 
            self.findIndex(c => c.id === cocktail.id) === index
        );
        
        switch (filter) {
            case DrinkTypeFilter.Both:
                this._cocktails = uniqueCocktails;
                break;
            case DrinkTypeFilter.OnlyCocktails:
                this._cocktails = uniqueCocktails.filter(x => x.category !== DrinkCategory.Mocktail);
                break;
            case DrinkTypeFilter.OnlyMocktails:
                this._cocktails = uniqueCocktails.filter(x => x.category === DrinkCategory.Mocktail);
                break;
        }
    }

    private setCocktailId(): string {
        this._highestId++;
        return 'x-' + this._highestId;
    }

    private setTagId(): string {
        this._highestTagId++;
        return 'x-' + this._highestTagId;
    }

    private isCocktailEdited(cocktailInformation?: CocktailInformation): boolean {
        if (cocktailInformation == null) {
            return false;
        }

        const result =
            cocktailInformation.tags !== undefined ||
            cocktailInformation.ingredientGroups !== undefined ||
            cocktailInformation.category !== undefined;
        return result;
    }

    private getMissingIngredientsCount(
        cocktails: CocktailWithMissingIngredient[],
        cocktail: CocktailWithMissingIngredient
    ) {
        return cocktails.filter(x => x.missingIngredient.id === cocktail.missingIngredient.id).length;
    }

    private ingredientIdExists(currentIngredients: string[], cocktailIngredientId: string) {
        if (currentIngredients.includes(cocktailIngredientId)) {
            return true;
        }

        const ingredient = this._ingredientService.getIngredientById(cocktailIngredientId);

        const replacementIds = ingredient?.replacementIds;
        if (replacementIds !== undefined && currentIngredients.some(x => replacementIds.includes(x))) {
            return true;
        }

        return false;
    }
}

export class UpdateCocktailInformationRequest {
    public id: string;
    private fields: CocktailInformationUpdateField<CocktailInformationUpdateProperties>[] = [];

    constructor(id: string) {
        this.fields = [];
        this.id = id;
    }

    addField<K extends CocktailInformationUpdateProperties>(key: K, value: CocktailInformation[K]) {
        this.fields.push({
            key,
            value
        });
    }

    getFields() {
        return this.fields;
    }
}

export type CocktailInformationUpdateField<K extends CocktailInformationUpdateProperties> = {
    key: K;
    value: CocktailInformation[K];
};

type CocktailInformationUpdateProperties = Exclude<keyof CocktailInformation, 'id'>;
