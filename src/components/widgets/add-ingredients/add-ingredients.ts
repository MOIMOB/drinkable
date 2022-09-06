import { ManageIngredientModel } from 'domain/entities/ingredient';
import { bindable, inject } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { LocalStorageService } from 'services/local-storage-service';
import { IngredientService } from 'services/ingredient-service';

@inject(EventAggregator, LocalStorageService, IngredientService)
export class AddIngredients {
    @bindable ingredientIds: string[];
    public ingredients: ManageIngredientModel[] = [];

    private _subscription: Subscription;

    constructor(
        private _ea: EventAggregator,
        private _localStorageService: LocalStorageService,
        private _ingredientService: IngredientService
    ) {}
    bind() {
        this.ingredients = this._ingredientService.getRandomIngredients(3, this.ingredientIds);
    }

    attached() {
        this._subscription = this._ea.subscribe('refresh-event', () => {
            this.ingredients = this._ingredientService.getRandomIngredients(3, this.ingredientIds);
        });
    }

    detached() {
        this._subscription.dispose();
    }

    async toggleIngredient(ingredient: ManageIngredientModel) {
        ingredient.isActive = !ingredient.isActive;
        if (ingredient.isActive) {
            // for aurelia Changed method to trigger on array push.
            const temp = [...this.ingredientIds];
            temp.push(ingredient.id);
            this.ingredientIds = temp;
        } else {
            this.ingredientIds = this.ingredientIds.filter(id => id !== ingredient.id);
        }
        await this._localStorageService.updateSavedIngredients(this.ingredientIds);
    }
}
