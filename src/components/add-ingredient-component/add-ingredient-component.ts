import { EventAggregator } from 'aurelia-event-aggregator';
import { observable, bindable, autoinject } from 'aurelia-framework';
import { Ingredient } from 'domain/entities/ingredient';
import { IngredientService } from 'services/ingredient-service';

@autoinject
export class AddIngredientComponent {
    @observable public searchFilter: string;
    @bindable selectedIngredients: Ingredient[] = [];
    @bindable addIngredientCallback: (data: { ingredient: Ingredient }) => void;

    public searchElement: HTMLElement;
    public isActive: boolean;
    public filteredIngredientTags: Ingredient[];

    private ingredients: Ingredient[] = [];

    handleInputFocus: (e: FocusEvent) => void;
    handleInputBlur: (e: FocusEvent) => void;

    constructor(
        private _ingredientService: IngredientService,
        private _eventAggregator: EventAggregator
    ) {
        this.handleInputFocus = () => {
            this.isActive = true;
            this._eventAggregator.publish('navigation-fixed-position', true);

            this.filteredIngredientTags = this.ingredients.filter(
                x =>
                    !this.selectedIngredients.map(x => x.id).includes(x.id) &&
                    x.name.toLowerCase().includes(this.searchFilter.toLowerCase())
            );
        };
        this.handleInputBlur = () => {
            this._eventAggregator.publish('navigation-fixed-position', false);
            this.isActive = false;
        };
    }

    bind() {
        this.searchFilter = '';
        this.ingredients = this._ingredientService.getIngredients();
    }

    attached() {
        this.searchElement.addEventListener('focus', this.handleInputFocus, true);
        this.searchElement.addEventListener('blur', this.handleInputBlur, true);
    }

    searchFilterChanged(newValue: string) {
        this.filteredIngredientTags = this.ingredients.filter(
            x =>
                !this.selectedIngredients.map(x => x.id).includes(x.id) &&
                x.name.toLowerCase().includes(newValue.toLowerCase())
        );

        if (newValue !== '') {
            this.filteredIngredientTags.sort(a => (a.name.toLowerCase().startsWith(newValue.toLowerCase()) ? -1 : 1));
        }
    }

    async addItem(ingredient: Ingredient) {
        this.selectedIngredients.unshift(ingredient);

        this.searchFilter = '';

        this.filteredIngredientTags = this.ingredients.filter(
            x =>
                !this.selectedIngredients.map(x => x.id).includes(x.id) &&
                x.name.toLowerCase().includes(this.searchFilter.toLowerCase())
        );

        this.addIngredientCallback({ ingredient: ingredient });
    }

    public closeIngredientSearch() {
        this._eventAggregator.publish('navigation-fixed-position', false);
        this.isActive = false;
    }
}
