import { LocalStorageService } from './local-storage-service';
import { inject } from 'aurelia-framework';
import { Cocktail, CocktailWithMissingIngredient } from 'domain/entities/cocktail';
import { getStaticCocktails, toCocktailWithMissingIngredients } from 'functions/cocktail-functions';
import { IngredientService } from './ingredient-service';

@inject(LocalStorageService, IngredientService)
export class CocktailService {
    private _cocktails: Cocktail[] = getStaticCocktails();
    private _createdCocktails: Cocktail[] = [];
    private _highestId = 0;
    constructor(private _localStorageService: LocalStorageService, private _ingredientService: IngredientService) {
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

    public getCocktailsByIngredientIds(ingredientIds: string[]): Cocktail[] {
        const validCocktails = [];

        [...this._cocktails].forEach(element => {
            const ids = element.ingredientGroups.map(x => x.ingredientId);
            if (ids.every(x => ingredientIds.includes(x))) {
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
                if (ingredientIds.includes(element)) {
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

    getMissingIngredientsCount(cocktails: CocktailWithMissingIngredient[], cocktail: CocktailWithMissingIngredient) {
        return cocktails.filter(x => x.missingIngredient.id === cocktail.missingIngredient.id).length;
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
