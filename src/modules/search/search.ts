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
    public activeIngredientIds: number[] = [];

    private _ingredients: Ingredient[] = [];

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
        this._ingredients = getIngredients();
        this.activeIngredientIds = this._localStorageService.getIngredientIds();

        this.selectedIngredients = this._ingredients.filter(x => this.activeIngredientIds.includes(x.id));

        this.filteredIngredientTags = this._ingredients.filter(x => !this.activeIngredientIds.includes(x.id));
    }

    attached() {
        this.searchElement.addEventListener('focus', this.handleInputFocus, true);
        this.searchElement.addEventListener('blur', this.handleInputBlur, true);
    }

    searchFilterChanged(newValue: string, _: string) {
        this.filteredIngredientTags = this._ingredients.filter(
            x => !this.activeIngredientIds.includes(x.id) && x.name.toLowerCase().includes(newValue.toLowerCase())
        );
    }

    addItem(ingredient: Ingredient) {
        this.selectedIngredients.push(ingredient);
        this.filteredIngredientTags = this.filteredIngredientTags.filter(x => x.id !== ingredient.id);

        this.activeIngredientIds.push(ingredient.id);
        this._localStorageService.updateIngredients(this.activeIngredientIds);
    }

    removeItem(ingredient: Ingredient) {
        this.selectedIngredients = this.selectedIngredients.filter(x => x.id !== ingredient.id);

        this.activeIngredientIds = this.activeIngredientIds.filter(x => x !== ingredient.id);

        this.filteredIngredientTags = this._ingredients.filter(
            x =>
                !this.activeIngredientIds.includes(x.id) &&
                x.name.toLowerCase().includes(this.searchFilter.toLowerCase())
        );
        this._localStorageService.updateIngredients(this.activeIngredientIds);
    }
}
