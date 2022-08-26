import { getRandomIngredients } from 'functions/ingredient-functions';
import { ManageIngredientModel } from 'domain/models/ingredient';
import { bindable, inject } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { LocalStorageService } from 'services/local-storage-service';

@inject(EventAggregator, LocalStorageService)
export class AddIngredients {
    @bindable ingredientIds: number[];
    public ingredients: ManageIngredientModel[] = [];

    private _subscription: Subscription;

    constructor(private _ea: EventAggregator, private _localStorageService: LocalStorageService) {}
    bind() {
        this.ingredients = getRandomIngredients(3, this.ingredientIds);
    }

    attached() {
        this._subscription = this._ea.subscribe('refresh-event', () => {
            this.ingredients = getRandomIngredients(3, this.ingredientIds);
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
        await this._localStorageService.updateIngredients(this.ingredientIds);
    }
}
