import { LocalStorageService } from './local-storage-service';
import { inject } from 'aurelia-framework';
import { Cocktail, CocktailWithMissingIngredient } from 'domain/entities/cocktail';
import { getStaticCocktails, toCocktailWithMissingIngredients } from 'data/cocktail-data';
import { IngredientService } from './ingredient-service';
import { CocktailInformation } from 'domain/entities/cocktail-information';
import { DrinkCategory } from 'domain/enums/drink-category';

@inject(LocalStorageService, IngredientService)
export class CocktailService {
    private _cocktails: Cocktail[] = getStaticCocktails();
    private _createdCocktails: Cocktail[] = [];
    private _cocktailInformation: CocktailInformation[] = [];
    private _mocktails: Cocktail[] = [];
    private _highestId = 0;
    constructor(private _localStorageService: LocalStorageService, private _ingredientService: IngredientService) {
        this._createdCocktails = this._localStorageService.getCocktails();
        this._cocktailInformation = this._localStorageService.getCocktailInformation();

        this._createdCocktails.forEach(x => {
            const id = Number(x.id.split('-')[1]);
            if (id > this._highestId) {
                this._highestId = id;
            }

            x.tags = x.tags === undefined ? [] : x.tags;

            this._cocktails.push(x);
        });

        this._cocktailInformation.forEach(element => {
            let cocktail = this._cocktails.find(x => x.id === element.id);
            if (cocktail !== undefined) {
                cocktail.rating = element.rating ?? 0;
                cocktail.isFavorite = element.isFavorite ?? false;
            }
        });

        this._mocktails = this._cocktails.filter(x => x.category === DrinkCategory.Mocktail);

        if (this._localStorageService.getSettings().showMocktails !== true) {
            this.hideMocktails();
        }
    }

    public getCocktails() {
        return [...this._cocktails].sort((a, b) => a.name?.localeCompare(b.name));
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

        await this._localStorageService.updateCocktails(this._createdCocktails);

        this._cocktails.push(cocktail);
    }

    public async updateCocktail(cocktail: Cocktail) {
        this._createdCocktails = this._createdCocktails.filter(x => x.id !== cocktail.id);
        this._createdCocktails.push(cocktail);

        await this._localStorageService.updateCocktails(this._createdCocktails);

        this._cocktails = this._cocktails.filter(x => x.id !== cocktail.id);
        this._cocktails.push(cocktail);
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

    public async deleteCocktail(id: string) {
        this._createdCocktails = this._createdCocktails.filter(x => x.id !== id);
        await this._localStorageService.updateCocktails(this._createdCocktails);
        this._cocktails = this._cocktails.filter(x => x.id !== id);

        this._cocktailInformation = this._cocktailInformation.filter(x => x.id !== id);
        await this._localStorageService.updateCocktailInformation(this._cocktailInformation);
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

        let replacementIds = this._ingredientService.getIngredientById(cocktailIngredientId).replacementIds;
        if (replacementIds !== undefined && currentIngredients.some(x => replacementIds.includes(x))) {
            return true;
        }

        return false;
    }
    private hideMocktails() {
        this._cocktails = this._cocktails.filter(x => !this._mocktails.map(y => y.id).includes(x.id));
    }
}
