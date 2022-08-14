import { LocalStorageService } from './local-storage-service';
import { inject } from 'aurelia-framework';
import { Cocktail, CocktailWithMissingIngredients } from 'models/cocktail';
import { getStaticCocktails, toCocktailWithMissingIngredients } from 'functions/cocktail-functions';
import { getIngredientsByIds } from 'functions/ingredient-functions';

@inject(LocalStorageService)
export class CocktailService {
    private _localStorageService: LocalStorageService;
    private _cocktails: Cocktail[] = getStaticCocktails();
    private _createdCocktails = [];
    private _highestId = 0;
    constructor(_localStorageService: LocalStorageService) {
        this._localStorageService = _localStorageService;

        this._createdCocktails = this._localStorageService.getCocktails();

        this._createdCocktails.forEach(x => {
            const id = Number(x.id.split('-')[1]);
            if (id > this._highestId) {
                this._highestId = id;
            }

            this._cocktails.push(x);
        });
    }

    public getCocktails() {
        return [...this._cocktails].sort((a, b) => a.name?.localeCompare(b.name));
    }

    public getCocktailsByIds(ids: string[]) {
        return [...this._cocktails].filter(x => ids.includes(x.id)).sort((a, b) => a.name.localeCompare(b.name));
    }

    public getRandomCocktails(amount: number) {
        return [...this._cocktails].sort(() => 0.5 - Math.random()).slice(0, amount);
    }

    public getCocktailsByIngredientIds(ingredientIds: number[]): Cocktail[] {
        const validCocktails = [];

        [...this._cocktails].forEach(element => {
            const ids = element.ingredientGroups.map(x => x.ingredientId);
            if (ids.every(x => ingredientIds.includes(x))) {
                validCocktails.push(element);
            }
        });

        return validCocktails.sort((a, b) => a.name.localeCompare(b.name));
    }

    public getCocktailsByIngredientIds2(ingredientIds: number[], missingIngredients: number) {
        const validCocktails: CocktailWithMissingIngredients[] = [];

        [...this._cocktails].forEach(element => {
            const ids = element.ingredientGroups.map(x => x.ingredientId);

            let validIds = 0;
            const missingIngredientIds = [];

            ids.forEach(element => {
                if (ingredientIds.includes(element)) {
                    validIds++;
                } else {
                    missingIngredientIds.push(element);
                }
            });

            if (validIds === ids.length - missingIngredients) {
                const cocktailWithMissingIngredients = toCocktailWithMissingIngredients(
                    element,
                    getIngredientsByIds(missingIngredientIds)
                );
                validCocktails.push(cocktailWithMissingIngredients);
            }
        });

        return validCocktails.sort((a, b) => a.name.localeCompare(b.name));
    }

    public async createCocktail(cocktail: Cocktail) {
        cocktail.id = this.setCocktailId();
        console.log(cocktail);
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

    public async deleteCocktail(id: string) {
        this._createdCocktails = this._createdCocktails.filter(x => x.id !== id);
        await this._localStorageService.updateCocktails(this._createdCocktails);
        this._cocktails = this._cocktails.filter(x => x.id !== id);

        let favoriteCocktails = this._localStorageService.getFavoriteCocktails();
        favoriteCocktails = favoriteCocktails.filter(x => x !== id);
        await this._localStorageService.updateFavoriteCocktails(favoriteCocktails);
    }

    private setCocktailId(): string {
        this._highestId++;
        return 'x-' + this._highestId;
    }
}
