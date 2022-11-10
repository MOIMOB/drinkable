import { EventAggregator } from 'aurelia-event-aggregator';
import { inject, observable } from 'aurelia-framework';
import { Ingredient } from 'domain/entities/ingredient';
import { IngredientService } from 'services/ingredient-service';
import { LocalStorageService } from 'services/local-storage-service';

@inject(EventAggregator, LocalStorageService, IngredientService)
export class SearchIngredients {
    @observable public searchFilter: string;

    public searchElement: HTMLElement;
    public filteredIngredientTags: Ingredient[] = [];
    public selectedIngredients: Ingredient[] = [];
    public showIngredientTags: boolean;
    public ingredients: Ingredient[] = [];

    private _activeIngredientIds: string[] = [];

    handleInputFocus: (e: FocusEvent) => void;
    handleInputBlur: (e: FocusEvent) => void;

    constructor(
        private _eventAggregator: EventAggregator,
        private _localStorageService: LocalStorageService,
        private _ingredientService: IngredientService
    ) {
        this.handleInputFocus = () => {
            this._eventAggregator.publish('navigation-fixed-position', true);
            this.showIngredientTags = true;
        };
        this.handleInputBlur = () => {
            this._eventAggregator.publish('navigation-fixed-position', false);
            this.showIngredientTags = false;
        };
        this.searchFilter = '';
    }

    bind() {
        this.ingredients = this._ingredientService.getIngredients();
        this._activeIngredientIds = this._localStorageService.getIngredientIds();

        this.selectedIngredients = this.ingredients.filter(x => this._activeIngredientIds.includes(x.id));

        this.filteredIngredientTags = this.ingredients.filter(x => !this._activeIngredientIds.includes(x.id));
    }

    attached() {
        this.searchElement.addEventListener('focus', this.handleInputFocus, true);
        this.searchElement.addEventListener('blur', this.handleInputBlur, true);
    }

    closeIngredientSearch() {
        this._eventAggregator.publish('navigation-fixed-position', false);
        this.showIngredientTags = false;
    }

    searchFilterChanged(newValue: string) {
        this.filteredIngredientTags = this.ingredients.filter(
            x => !this._activeIngredientIds.includes(x.id) && x.name.toLowerCase().includes(newValue.toLowerCase())
        );

        if (newValue !== '') {
            this.filteredIngredientTags.sort(a => (a.name.toLowerCase().startsWith(newValue.toLowerCase()) ? -1 : 1));
        }
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

        await this._localStorageService.updateSavedIngredients(this._activeIngredientIds);
    }

    async removeItem(ingredient: Ingredient) {
        this.selectedIngredients = this.selectedIngredients.filter(x => x.id !== ingredient.id);

        this._activeIngredientIds = this._activeIngredientIds.filter(x => x !== ingredient.id);

        this.filteredIngredientTags = this.ingredients.filter(
            x =>
                !this._activeIngredientIds.includes(x.id) &&
                x.name.toLowerCase().includes(this.searchFilter.toLowerCase())
        );
        await this._localStorageService.updateSavedIngredients(this._activeIngredientIds);
    }
}
