import { Cocktail, ExtendedIngredientGroup, IngredientGroup } from 'domain/entities/cocktail';
import { DialogController, DialogService } from 'aurelia-dialog';
import { LocalStorageService } from 'services/local-storage-service';
import { DrinkCategory, getDrinkCategories } from 'domain/enums/drink-category';
import { CocktailService } from 'services/cocktail-service';
import { inject, NewInstance, observable } from 'aurelia-framework';
import { ValidationRules, ValidationController } from 'aurelia-validation';
import Compressor from 'compressorjs';
import { getUnitsForImperial, getUnitsForMetric, Unit } from 'domain/enums/unit';
import { MessuarementSystem } from 'domain/enums/messuarement-system';
import { Ingredient } from 'domain/entities/ingredient';
import { IngredientService } from 'services/ingredient-service';
import { cocktailSubmissionToast, createIngredientAddToast } from 'functions/toast-functions';
import { SupabaseService } from 'services/supabase-service';
import { EnumTranslationModel } from 'domain/models/enum-translation-model';
@inject(
    DialogController,
    LocalStorageService,
    CocktailService,
    NewInstance.of(ValidationController),
    IngredientService,
    SupabaseService,
    DialogService
)
export class CocktailDialog {
    @observable public searchFilter: string;
    @observable public selectedRating: number = 0;

    public cocktail: Cocktail;
    public extendedIngredientGroup: ExtendedIngredientGroup[];
    public controller: DialogController;
    public multiplier = 1;
    public cocktailCategories: EnumTranslationModel<DrinkCategory>[] = getDrinkCategories();
    public ingredientUnits: Unit[] = [];
    public isFavorite = false;
    public isEditMode = false;
    public isNewCocktail = false;
    public displayAddIngredients = false;
    public searchElement: HTMLElement;
    public imageInput: HTMLInputElement;
    public email: string;
    public formSent = false;
    public formSendFailed = false;

    public filteredIngredientTags: Ingredient[] = [];
    public isBusy: boolean;
    public showAddIngredientTag = false;

    private _ingredients: Ingredient[] = [];
    private _clickedIngredientIndex;

    handleInputBlur: (e: FocusEvent) => void;
    updateImageDisplay: (e: InputEvent) => void;
    public isUserCreatedCocktail = false;

    constructor(
        dialogContoller: DialogController,
        private _localStorageService: LocalStorageService,
        private _cocktailService: CocktailService,
        private _validationController: ValidationController,
        private _ingredientService: IngredientService,
        private _supabaseService: SupabaseService,
        private _dialogService: DialogService
    ) {
        this.controller = dialogContoller;
        this.handleInputBlur = () => {
            this.displayAddIngredients = false;
        };
        this.updateImageDisplay = () => {
            const image = this.imageInput.files[0];

            if (image === undefined) {
                return;
            }

            this.isBusy = true;

            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const that = this;

            new Compressor(image, {
                quality: 0.85,
                maxWidth: 800,
                maxHeight: 800,
                success: async result => {
                    const imageSrc = await that.getBase64FromUrl(result);
                    that.cocktail.imageSrc = imageSrc;
                    this.isBusy = false;
                },
                error: () => {
                    this.isBusy = false;
                }
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

        this.isUserCreatedCocktail = this.cocktail.id === undefined || this.cocktail.id?.includes('x-');
        this.selectedRating = this.cocktail.rating ?? 0;

        ValidationRules.ensure('name').required().on(this.cocktail);

        const ingredientIds = this._localStorageService.getIngredientIds();
        this.extendedIngredientGroup = this._ingredientService.toExtendedIngredientGroup(
            this.cocktail.ingredientGroups,
            ingredientIds
        );

        if (this.isNewCocktail) {
            const ingredientGroup = new ExtendedIngredientGroup();
            this.extendedIngredientGroup.push(ingredientGroup);
        }

        const messuarementSystem = this._localStorageService.getMessuarementSystem();

        this.ingredientUnits =
            messuarementSystem === MessuarementSystem.Imperial ? getUnitsForImperial() : getUnitsForMetric();

        this._ingredients = this._ingredientService.getIngredients();
        this.filteredIngredientTags = this._ingredients.filter(
            x => !this.extendedIngredientGroup.map(x => x.ingredientId).includes(x.id)
        );
    }

    attached() {
        this.searchElement.addEventListener('blur', this.handleInputBlur, true);
        this.imageInput.addEventListener('change', this.updateImageDisplay, true);
    }

    searchFilterChanged(newValue: string) {
        this.filteredIngredientTags = this._ingredients.filter(
            x =>
                !this.extendedIngredientGroup.map(x => x.ingredientId).includes(x.id) &&
                x.name.toLowerCase().includes(newValue.toLowerCase())
        );

        if (newValue !== '') {
            this.filteredIngredientTags.sort(a => (a.name.toLowerCase().startsWith(newValue.toLowerCase()) ? -1 : 1));

            this.showAddIngredientTag = !this._ingredients.map(x => x.name).some(y => y === newValue);
        }
    }

    async selectedRatingChanged(newValue: number, oldValue: number) {
        if (oldValue === undefined) {
            return;
        }

        this.cocktail.rating = newValue;

        this.isUserCreatedCocktail
            ? await this._cocktailService.updateCocktail(this.cocktail)
            : await this._cocktailService.updateCocktailInformation(this.cocktail);
    }

    clearRating() {
        this.selectedRating = 0;
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
        this.searchFilter = '';
    }

    async addNewIngredient() {
        const ingredientGroup = this.extendedIngredientGroup[this._clickedIngredientIndex];

        if (ingredientGroup === undefined) {
            return;
        }

        const ingredient = await this._ingredientService.createIngredient(this.searchFilter);
        this._ingredients = this._ingredientService.getIngredients();

        ingredientGroup.ingredient = ingredient;
        ingredientGroup.ingredientId = ingredient.id;

        this.searchElement.blur();
        this.searchFilter = '';

        createIngredientAddToast(ingredient);
    }

    async toggleHeart() {
        this.cocktail.isFavorite = !this.cocktail.isFavorite;
        await this._cocktailService.updateCocktailInformation(this.cocktail);
    }

    editCocktail() {
        this.isEditMode = true;

        this.extendedIngredientGroup.forEach(element => {
            element.isChecked = false;
        });
    }

    async deleteCocktail() {
        await this._cocktailService.deleteCocktail(this.cocktail.id);
        const cocktailDialogAction = {
            action: 'delete',
            cocktail: this.cocktail
        };
        this.controller.ok(cocktailDialogAction);
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
        this.imageInput.value = '';
    }

    navigateToCocktailIngredient(event: Event, ingredient: Ingredient) {
        event.stopPropagation();
        let cocktail = this._cocktailService.getCocktailById(ingredient.recipeId);
        this._dialogService.open({ viewModel: CocktailDialog, model: cocktail, lock: false });
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
                    unit: x.unit
                };
                return group;
            });

        this.isNewCocktail
            ? await this._cocktailService.createCocktail(this.cocktail)
            : await this._cocktailService.updateCocktail(this.cocktail);

        this.isEditMode = false;

        const ingredientIds = this._localStorageService.getIngredientIds();
        this.extendedIngredientGroup = this._ingredientService.toExtendedIngredientGroup(
            this.cocktail.ingredientGroups,
            ingredientIds
        );
        this.isNewCocktail = false;
        this.searchFilter = '';
    }

    async submitCocktail() {
        ValidationRules.ensure('email').required().email().on(this);
        const result = await this._validationController.validate();

        if (result.valid) {
            const ingredientIds = this._localStorageService.getIngredientIds();
            const mappedIngredientsGroups = this._ingredientService.toExtendedIngredientGroup(
                this.cocktail.ingredientGroups,
                ingredientIds
            );

            await this._supabaseService.createCocktailSubmission(this.cocktail, mappedIngredientsGroups, this.email);

            this.cocktail.isSubmitted = true;
            await this._cocktailService.updateCocktail(this.cocktail);

            cocktailSubmissionToast();
        }
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
