import { Cocktail, ExtendedIngredientGroup, IngredientGroup } from 'models/cocktail';
import { DialogController } from 'aurelia-dialog';
import { getIngredients, getRandomIngredients, toExtendedIngredientGroup } from 'functions/ingredient-functions';
import { LocalStorageService } from 'services/local-storage-service';
import { DrinkCategory } from 'enums/drink-category';
import { CocktailService } from 'services/cocktail-service';
import { inject, NewInstance, observable } from 'aurelia-framework';
import { ValidationRules, ValidationController } from 'aurelia-validation';
import Compressor from 'compressorjs';
import { Unit } from 'enums/unit';
import { MessuarementSystem } from 'enums/messuarement-system';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Ingredient } from 'models/ingredient';

@inject(DialogController, LocalStorageService, CocktailService, NewInstance.of(ValidationController), EventAggregator)
export class CocktailViewModel {
    @observable public searchFilter: string;
    public cocktail: Cocktail;
    public extendedIngredientGroup: ExtendedIngredientGroup[];
    public controller: DialogController;
    public multiplier = 1;
    public multiplierValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    public cocktailCategories = [DrinkCategory.Cocktail, DrinkCategory.Shot, DrinkCategory.Other];
    public ingredientUnits = [];
    public isFavorite = false;
    public isEditMode = false;
    public isNewCocktail = false;
    public displayAddIngredients = false;
    public searchElement: HTMLElement;
    public imageInput: HTMLInputElement;

    public filteredIngredientTags: Ingredient[] = [];
    public isBusy: boolean;

    private _ingredients: Ingredient[] = [];
    private _favoriteCocktails: string[] = [];
    private _clickedIngredientIndex;

    handleInputBlur: (e: FocusEvent) => void;
    updateImageDisplay: (e: InputEvent) => void;

    constructor(
        dialogContoller: DialogController,
        private _localStorageService: LocalStorageService,
        private _cocktailService: CocktailService,
        private _validationController: ValidationController,
        private _ea: EventAggregator
    ) {
        this.controller = dialogContoller;
        this.handleInputBlur = e => {
            this.displayAddIngredients = false;
        };
        this.updateImageDisplay = e => {
            const image = this.imageInput.files[0];

            if (image === undefined) {
                return;
            }

            this.isBusy = true;

            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const that = this;

            new Compressor(image, {
                quality: 0.75,
                maxWidth: 500,
                maxHeight: 500,
                success: async result => {
                    const imageSrc = await that.getBase64FromUrl(result);
                    that.cocktail.imageSrc = imageSrc;
                    this.isBusy = false;
                },
                error: err => {
                    this.isBusy = false;
                },
            });
        };
    }

    activate(cocktail: Cocktail) {
        if (cocktail === null) {
            this.cocktail = new Cocktail();
            this.isEditMode = true;
            this.isNewCocktail = true;
        } else {
            this.cocktail = cocktail;
        }

        ValidationRules.ensure('name').required().on(this.cocktail);

        const ingredientIds = this._localStorageService.getIngredientIds();
        this.extendedIngredientGroup = toExtendedIngredientGroup(this.cocktail.ingredientGroups, ingredientIds);
        this._favoriteCocktails = this._localStorageService.getFavoriteCocktails();
        this.isFavorite = this._favoriteCocktails.includes(this.cocktail.id);

        if (this.isNewCocktail) {
            const ingredientGroup = new ExtendedIngredientGroup();
            this.extendedIngredientGroup.push(ingredientGroup);
        }

        const messuarementSystem = this._localStorageService.getMessuarementSystem();
        if (messuarementSystem === MessuarementSystem.Imperial) {
            this.ingredientUnits = [Unit.None, Unit.FLOZ, Unit.TBSP, Unit.TSP];
            if (this.cocktail.ingredientGroups.some(x => x.unit === Unit.CL)) {
                this.ingredientUnits.push(Unit.CL);
            }
        } else {
            this.ingredientUnits = [Unit.None, Unit.CL, Unit.TBSP, Unit.TSP];
            if (this.cocktail.ingredientGroups.some(x => x.unit === Unit.FLOZ)) {
                this.ingredientUnits.push(Unit.FLOZ);
            }
        }

        this._ingredients = getIngredients();
        this.filteredIngredientTags = this._ingredients.filter(
            x => !this.extendedIngredientGroup.map(x => x.ingredientId).includes(x.id)
        );
    }

    attached() {
        this.searchElement.addEventListener('blur', this.handleInputBlur, true);
        this.imageInput.addEventListener('change', this.updateImageDisplay, true);
    }

    searchFilterChanged(newValue: string, _: string) {
        this.filteredIngredientTags = this._ingredients.filter(
            x =>
                !this.extendedIngredientGroup.map(x => x.ingredientId).includes(x.id) &&
                x.name.toLowerCase().includes(newValue.toLowerCase())
        );

        if (newValue !== '') {
            this.filteredIngredientTags.sort(a => (a.name.toLowerCase().startsWith(newValue.toLowerCase()) ? -1 : 1));
        }
    }

    checkIngredient(ingredient: ExtendedIngredientGroup) {
        if (this.isEditMode) {
            return;
        }
        ingredient.isChecked = !ingredient.isChecked;
    }

    openAddIngredients(index: number) {
        this.displayAddIngredients = true;
        this._clickedIngredientIndex = index;
        setTimeout(() => {
            this.searchElement.focus();
        }, 150);
    }

    closeIngredientSearch() {
        this.displayAddIngredients = false;
    }

    selectItem(ingredient: Ingredient) {
        const ingredientGroup = this.extendedIngredientGroup[this._clickedIngredientIndex];

        if (ingredientGroup === undefined) {
            return;
        }

        ingredientGroup.ingredient = ingredient;
        ingredientGroup.ingredientId = ingredient.id;

        this.searchElement.blur();
        this.searchFilterChanged('', '');
    }

    async toggleHeart() {
        this.isFavorite = !this.isFavorite;

        if (this.isFavorite) {
            this._favoriteCocktails.push(this.cocktail.id);
        } else {
            this._favoriteCocktails = this._favoriteCocktails.filter(id => id !== this.cocktail.id);
        }

        await this._localStorageService.updateFavoriteCocktails(this._favoriteCocktails);
    }

    editCocktail() {
        this.isEditMode = true;
    }

    deleteCocktail() {
        this._cocktailService.deleteCocktail(this.cocktail.id);
        this.controller.ok();
    }

    addRow() {
        const ingredientGroup = new ExtendedIngredientGroup();
        this.extendedIngredientGroup.push(ingredientGroup);
    }
    deleteRow(index: number) {
        this.extendedIngredientGroup.splice(index, 1);
    }

    removeImage() {
        this.cocktail.imageSrc = undefined;
    }

    async createOrUpdateCocktail() {
        const result = await this._validationController.validate();

        if (!result.valid) {
            return;
        }

        this.cocktail.ingredientGroups = this.extendedIngredientGroup
            .filter(x => x.ingredient !== undefined)
            .map(x => {
                const group: IngredientGroup = {
                    amount: x.amount,
                    ingredientId: x.ingredient.id,
                    unit: x.unit,
                };
                return group;
            });

        this.isNewCocktail
            ? await this._cocktailService.createCocktail(this.cocktail)
            : await this._cocktailService.updateCocktail(this.cocktail);

        this.isEditMode = false;

        const ingredientIds = this._localStorageService.getIngredientIds();
        this.extendedIngredientGroup = toExtendedIngredientGroup(this.cocktail.ingredientGroups, ingredientIds);
        this.isNewCocktail = false;
        this.searchFilter = '';
    }

    getBase64FromUrl(blob): Promise<string> {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result;
                resolve(base64data as string);
            };
        });
    }
}
