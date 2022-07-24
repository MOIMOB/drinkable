import { EventAggregator } from 'aurelia-event-aggregator';
import { inject, observable } from 'aurelia-framework';
import { getIngredients } from 'functions/ingredient-functions';
import { Ingredient } from 'models/ingredient';
import { LocalStorageService } from 'services/local-storage-service';

@inject(EventAggregator, LocalStorageService)
export class Search {
    @observable public searchFilter: string;

    public searchElement: HTMLElement;
    public filteredIngredientTags: Ingredient[] = [];
    public selectedIngredients: Ingredient[] = [];
    public showIngredientTags: boolean;
    public ingredients: Ingredient[] = [];

    private _activeIngredientIds: number[] = [];

    handleInputFocus: (e: FocusEvent) => void;
    handleInputBlur: (e: FocusEvent) => void;

    constructor(private _ea: EventAggregator, private _localStorageService: LocalStorageService) {
        this.handleInputFocus = e => {
            this._ea.publish('navigation-fixed-position', true);
            this.showIngredientTags = true;
        };
        this.handleInputBlur = e => {
            this._ea.publish('navigation-fixed-position', false);
            this.showIngredientTags = false;
        };
        this.searchFilter = '';
    }

    activate() {
        this.ingredients = getIngredients();
        this._activeIngredientIds = this._localStorageService.getIngredientIds();

        this.selectedIngredients = this.ingredients.filter(x => this._activeIngredientIds.includes(x.id));

        this.filteredIngredientTags = this.ingredients.filter(x => !this._activeIngredientIds.includes(x.id));
    }

    attached() {
        this.searchElement.addEventListener('focus', this.handleInputFocus, true);
        this.searchElement.addEventListener('blur', this.handleInputBlur, true);
    }

    closeIngredientSearch() {
        this._ea.publish('navigation-fixed-position', false);
        this.showIngredientTags = false;
    }

    searchFilterChanged(newValue: string, _: string) {
        this.filteredIngredientTags = this.ingredients.filter(
            x => !this._activeIngredientIds.includes(x.id) && x.name.toLowerCase().includes(newValue.toLowerCase())
        );
    }

    async addItem(ingredient: Ingredient) {
        this.selectedIngredients.unshift(ingredient);

        this._activeIngredientIds.push(ingredient.id);

        this.searchFilter = '';

        this.filteredIngredientTags = this.ingredients.filter(
            x =>
                !this._activeIngredientIds.includes(x.id) &&
                x.name.toLowerCase().includes(this.searchFilter.toLowerCase())
        );

        await this._localStorageService.updateIngredients(this._activeIngredientIds);
    }

    async removeItem(ingredient: Ingredient) {
        this.selectedIngredients = this.selectedIngredients.filter(x => x.id !== ingredient.id);

        this._activeIngredientIds = this._activeIngredientIds.filter(x => x !== ingredient.id);

        this.filteredIngredientTags = this.ingredients.filter(
            x =>
                !this._activeIngredientIds.includes(x.id) &&
                x.name.toLowerCase().includes(this.searchFilter.toLowerCase())
        );
        await this._localStorageService.updateIngredients(this._activeIngredientIds);
    }
}
