import { LocalStorageService } from './local-storage-service';
import { autoinject } from 'aurelia-framework';
import { Cocktail, CocktailWithMissingIngredient } from 'domain/entities/cocktail';
import { getStaticCocktails, toCocktailWithMissingIngredients } from 'data/cocktail-data';
import { IngredientService } from './ingredient-service';
import { CocktailInformation } from 'domain/entities/cocktail-information';
import { DrinkCategory } from 'domain/enums/drink-category';
import { TagModel } from 'domain/entities/cocktail-tag';
import { getTags } from 'data/tags-data';
import { I18N } from 'aurelia-i18n';
import { CocktailAlcoholInformation } from 'domain/cocktail-alcohol-information';

@autoinject
export class CocktailService {
    private _cocktails: Cocktail[] = [];
    private _createdCocktails: Cocktail[] = [];
    private _cocktailInformation: CocktailInformation[] = [];
    private _mocktails: Cocktail[] = [];
    private _highestId = 0;

    private _tags: TagModel[] = getTags();
    private _createdTags: TagModel[] = [];
    private _highestTagId = 0;

    constructor(
        private _localStorageService: LocalStorageService,
        private _ingredientService: IngredientService,
        private i18n: I18N
    ) {
        this._createdCocktails = this._localStorageService.getCocktails();
        this._cocktailInformation = this._localStorageService.getCocktailInformation();

        const ingredients = this._ingredientService.getIngredients();

        let staticCocktails = getStaticCocktails();
        staticCocktails.forEach(element => {
            let cocktail: Cocktail = {
                id: element.id,
                category: element.category,
                imageSrc: element.imageSrc,
                ingredientGroups: element.ingredientGroups,
                isImagePortrait: element.isImagePortrait,
                name: this.i18n.tr(element.translation, { ns: 'cocktails' }),
                tags: element.tags,
                translation: element.translation,
                isFavorite: this._cocktailInformation.find(x => x.id === element.id)?.isFavorite ?? false,
                rating: this._cocktailInformation.find(x => x.id === element.id)?.rating ?? 0
            };

            cocktail.alcoholInformation = new CocktailAlcoholInformation(cocktail, ingredients);

            this._cocktails.push(cocktail);
        });

        this._createdCocktails.forEach(x => {
            const id = Number(x.id.split('-')[1]);
            if (id > this._highestId) {
                this._highestId = id;
            }

            x.tags = x.tags === undefined ? [] : x.tags;
            x.alcoholInformation = new CocktailAlcoholInformation(x, ingredients);

            // Created Cocktails saved isFavorite in CocktailInformation before so this is for backwards compatibility
            if (x.isFavorite === undefined) {
                x.isFavorite = this._cocktailInformation.find(x => x.id === x.id)?.isFavorite ?? false;
            }

            this._cocktails.push(x);
        });

        this._mocktails = this._cocktails.filter(x => x.category === DrinkCategory.Mocktail);

        if (this._localStorageService.getSettings().showMocktails !== true) {
            this.hideMocktails();
        }

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
            .filter(x => x.id.includes('x') === false)
            .slice(amount * -1)
            .reverse();
    }

    public getCocktailsByIngredientIds(ingredientIds: string[]): Cocktail[] {
        const validCocktails = [];

        [...this._cocktails].forEach(element => {
            let cocktailIngredients = element.ingredientGroups.map(x => x.ingredientId);

            let result = [...new Set(cocktailIngredients.map(x => this.ingredientIdExists(ingredientIds, x)))];
            if (result.length === 1 && result[0] === true) {
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

    public async createCocktail(cocktail: Cocktail) {
        cocktail.id = this.setCocktailId();
        this._createdCocktails.push(cocktail);
        this._cocktails.push(cocktail);
        await this._localStorageService.updateCocktails(this._createdCocktails);
    }

    public async createTag(name: string) {
        let newTag: TagModel = {
            id: this.setTagId(),
            translation: undefined,
            name: name
        };

        this._createdTags.push(newTag);

        await this._localStorageService.updateTags(this._createdTags);

        this._tags.push(newTag);
    }

    public async updateCocktail(cocktail: Cocktail) {
        this._createdCocktails = this._createdCocktails.filter(x => x.id !== cocktail.id);
        this._createdCocktails.push(cocktail);

        await this._localStorageService.updateCocktails(this._createdCocktails);

        this._cocktails = this._cocktails.filter(x => x.id !== cocktail.id);
        this._cocktails.push(cocktail);
    }

    public async updateTag(tag: TagModel) {
        this._createdTags = this._createdTags.filter(x => x.id !== tag.id);
        this._createdTags.push(tag);

        await this._localStorageService.updateTags(this._createdTags);

        this._tags = this._tags.filter(x => x.id !== tag.id);
        this._tags.push(tag);
    }

    public async updateCocktailInformation(cocktail: Cocktail) {
        this._cocktailInformation = this._cocktailInformation.filter(x => x.id !== cocktail.id);
        this._cocktailInformation.push({
            id: cocktail.id,
            rating: cocktail.rating,
            isFavorite: cocktail.isFavorite
        });

        let cocktailtoUpdate = this._cocktails.find(x => x.id === cocktail.id);
        if (cocktailtoUpdate !== undefined) {
            cocktailtoUpdate.isFavorite = cocktail.isFavorite;
            cocktailtoUpdate.rating = cocktail.rating;
        }

        await this._localStorageService.updateCocktailInformation(this._cocktailInformation);
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

    public updateShowMocktails(value: boolean) {
        if (value === true) {
            this._cocktails.push(...this._mocktails);
        } else {
            this.hideMocktails();
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

        let ingredient = this._ingredientService.getIngredientById(cocktailIngredientId);

        let replacementIds = ingredient?.replacementIds;
        if (replacementIds !== undefined && currentIngredients.some(x => replacementIds.includes(x))) {
            return true;
        }

        return false;
    }
    private hideMocktails() {
        this._cocktails = this._cocktails.filter(x => !this._mocktails.map(y => y.id).includes(x.id));
    }
}
