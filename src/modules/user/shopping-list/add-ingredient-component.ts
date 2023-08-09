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

    constructor(private _ingredientService: IngredientService) {
        this.handleInputFocus = () => {
            this.isActive = true;

            this.filteredIngredientTags = this.ingredients.filter(
                x => !this.selectedIngredients.map(x => x.id).includes(x.id)
            );
            console.log(this.ingredients);
            console.log(this.filteredIngredientTags);
        };
        this.handleInputBlur = () => {
            this.isActive = false;
        };
    }

    bind() {
        this.ingredients = this._ingredientService.getIngredients();
        console.log(this.selectedIngredients);
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

        console.log(ingredient);

        this.addIngredientCallback({ ingredient: ingredient });
    }

    public closeIngredientSearch() {
        this.isActive = false;
    }
}
