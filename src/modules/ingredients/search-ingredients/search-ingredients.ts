import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';
import { Ingredient } from 'domain/entities/ingredient';
import { IngredientService } from 'services/ingredient-service';
import { LocalStorageService } from 'services/local-storage-service';

@inject(EventAggregator, LocalStorageService, IngredientService)
export class SearchIngredients {
    public selectedIngredients: Ingredient[] = [];
    public ingredients: Ingredient[] = [];

    private _activeIngredientIds: string[] = [];

    constructor(
        private _eventAggregator: EventAggregator,
        private _localStorageService: LocalStorageService,
        private _ingredientService: IngredientService
    ) {}

    bind() {
        this.ingredients = this._ingredientService.getIngredients();
        this._activeIngredientIds = this._localStorageService.getIngredientIds();

        this.selectedIngredients = this.ingredients.filter(x => this._activeIngredientIds.includes(x.id));
    }

    closeIngredientSearch() {
        this._eventAggregator.publish('navigation-fixed-position', false);
    }

    async addItem(ingredient: Ingredient) {
        this._activeIngredientIds.push(ingredient.id);
        await this._localStorageService.updateSavedIngredients(this._activeIngredientIds);
    }

    async removeItem(ingredient: Ingredient) {
        this.selectedIngredients = this.selectedIngredients.filter(x => x.id !== ingredient.id);

        this._activeIngredientIds = this._activeIngredientIds.filter(x => x !== ingredient.id);

        await this._localStorageService.updateSavedIngredients(this._activeIngredientIds);
    }
}
