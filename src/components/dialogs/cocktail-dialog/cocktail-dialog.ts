import { Cocktail, ExtendedIngredientGroup, IngredientGroup } from 'domain/entities/cocktail';
import { DialogController, DialogService } from 'aurelia-dialog';
import { LocalStorageService } from 'services/local-storage-service';
import { DrinkCategory, getDrinkCategories } from 'domain/enums/drink-category';
import { CocktailService, UpdateCocktailInformationRequest } from 'services/cocktail-service';
import { inject, NewInstance, observable, computedFrom } from 'aurelia-framework';
import { ValidationRules, ValidationController } from 'aurelia-validation';
import Compressor from 'compressorjs';
import { getUnitsForImperial, getUnitsForMetric, Unit } from 'domain/enums/unit';
import { MessuarementSystem } from 'domain/enums/messuarement-system';
import { Ingredient } from 'domain/entities/ingredient';
import { IngredientService } from 'services/ingredient-service';
import { EnumTranslationModel } from 'domain/models/enum-translation-model';
import { getTagsFromIds } from 'data/tags-data';
import { EditTagsDrawer } from './../edit-tags-drawer';
import { TagModel } from 'domain/entities/cocktail-tag';
import { ManageIngredientRow } from './manage-ingredient-row';
import { getStaticCocktailById } from 'data/cocktail-data';
import { isEqual } from 'functions/utils';
import { AmountFormatValueConverter } from 'converters/amount-format';
import { ToastService } from 'components/toast/toast-service';
import { I18N } from 'aurelia-i18n';
@inject(
    DialogController,
    LocalStorageService,
    CocktailService,
    NewInstance.of(ValidationController),
    IngredientService,
    DialogService,
    AmountFormatValueConverter,
    ToastService,
    I18N
)
export class CocktailDialog {
    @observable public searchFilter: string;
    @observable public selectedRating = 0;

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
    public tags: TagModel[] = [];
    public noteState: 'none' | 'edit' | 'exists' = 'none';
    public preferCl: boolean;

    public filteredIngredientTags: Ingredient[] = [];
    public isBusy: boolean;
    public showAddIngredientTag = false;

    public detailsElement: HTMLElement;

    private _ingredients: Ingredient[] = [];
    private _clickedIngredientIndex;
    private _messuarementSystem: MessuarementSystem;

    handleInputBlur: (e: FocusEvent) => void;
    updateImageDisplay: (e: Event) => void;
    public isUserCreatedCocktail = false;

    constructor(
        dialogContoller: DialogController,
        private _localStorageService: LocalStorageService,
        private _cocktailService: CocktailService,
        private _validationController: ValidationController,
        private _ingredientService: IngredientService,
        private _dialogService: DialogService,
        private _amountFormat: AmountFormatValueConverter,
        private _toastService: ToastService,
        private _i18n: I18N
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
            this.cocktail = { ...cocktail };
        }

        this.isUserCreatedCocktail = this.cocktail.id === undefined || this.cocktail.id?.includes('x-');
        this.selectedRating = this.cocktail.rating ?? 0;

        ValidationRules.ensure('name').required().on(this.cocktail);

        const ingredientIds = this._localStorageService.getIngredientIds();
        this.extendedIngredientGroup = this._ingredientService.toExtendedIngredientGroup(
            this.cocktail.ingredientGroups,
            ingredientIds
        );

        this.tags = getTagsFromIds(this.cocktail.tags);

        if (this.isNewCocktail) {
            const ingredientGroup = new ExtendedIngredientGroup();
            this.extendedIngredientGroup.push(ingredientGroup);
        }

        this._messuarementSystem = this._localStorageService.getMessuarementSystem();

        this.ingredientUnits =
            this._messuarementSystem === MessuarementSystem.Imperial ? getUnitsForImperial() : getUnitsForMetric();

        this._ingredients = this._ingredientService.getIngredients();
        this.filteredIngredientTags = this._ingredients.filter(
            x => !this.extendedIngredientGroup.map(x => x.ingredientId).includes(x.id)
        );
        this.noteState = this.cocktail.notes?.length > 0 ? 'exists' : 'none';
        this.preferCl = this._localStorageService.getPreferCl();
    }

    attached() {
        this.searchElement.addEventListener('blur', this.handleInputBlur, true);
        this.imageInput.addEventListener('change', this.updateImageDisplay, true);

        const bgColorClass = /*tw*/ 'bg-base-200';

        this.extendedIngredientGroup.forEach(element => {
            const el = document.getElementById('ingredient-group-' + element.ingredientId);
            if (el != null) {
                el.addEventListener('long-press', () => {
                    this.longClick(element);
                });
                el.addEventListener('long-press-timer-start', () => {
                    el.classList.add(bgColorClass);
                });
                el.addEventListener('long-press-timer-stop', () => {
                    if (el.classList.contains(bgColorClass)) {
                        el.classList.remove(bgColorClass);
                    }
                });
            }
        });
    }

    @computedFrom('cocktail.isEdited')
    public get isCocktailEdited(): boolean {
        console.log(this.cocktail.isEdited);
        return this.cocktail.isEdited;
    }

    async restoreCocktail() {
        this.closeDetailsElement();

        this.cocktail = await this._cocktailService.restoreCocktail(this.cocktail);

        const ingredientIds = this._localStorageService.getIngredientIds();
        this.extendedIngredientGroup = this._ingredientService.toExtendedIngredientGroup(
            this.cocktail.ingredientGroups,
            ingredientIds
        );

        this.tags = getTagsFromIds(this.cocktail.tags);
    }

    private closeDetailsElement() {
        this.detailsElement?.attributes?.removeNamedItem('open');
    }

    editTags() {
        this._dialogService
            .open({ viewModel: EditTagsDrawer, model: this.tags.map(x => x.id), lock: false })
            .whenClosed(response => {
                if (response.wasCancelled) {
                    return;
                }
                this.tags = getTagsFromIds(response.output);
            });
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

        if (this.isUserCreatedCocktail) {
            this.cocktail = await this._cocktailService.updateCocktail(this.cocktail);
            return;
        }

        const updateRequest = new UpdateCocktailInformationRequest(this.cocktail.id);
        updateRequest.addField('rating', this.cocktail.rating !== 0 ? this.cocktail.rating : undefined);

        this.cocktail = await this._cocktailService.updateCocktailInformationByRequest(updateRequest);
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

    longClick(group: ExtendedIngredientGroup) {
        this._dialogService.open({ viewModel: ManageIngredientRow, model: group, lock: false }).whenClosed(response => {
            if (!response.wasCancelled) {
                group.isInStorage = response.output.isInStorage;
            }
        });
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

        const ingredient = await this._ingredientService.createIngredient({
            name: this.searchFilter
        });
        this._ingredients = this._ingredientService.getIngredients();

        ingredientGroup.ingredient = ingredient;
        ingredientGroup.ingredientId = ingredient.id;

        this.searchElement.blur();
        this.searchFilter = '';
    }

    async toggleHeart() {
        this.cocktail.isFavorite = !this.cocktail.isFavorite;

        if (this.isUserCreatedCocktail) {
            this.cocktail = await this._cocktailService.updateCocktail(this.cocktail);
        } else {
            const updateRequest = new UpdateCocktailInformationRequest(this.cocktail.id);
            updateRequest.addField('isFavorite', this.cocktail.isFavorite ? this.cocktail.isFavorite : undefined);

            this.cocktail = await this._cocktailService.updateCocktailInformationByRequest(updateRequest);
        }
    }

    editCocktail() {
        this.closeDetailsElement();

        this.extendedIngredientGroup.forEach(element => {
            element.isChecked = false;
        });

        if (!this.isUserCreatedCocktail && this._messuarementSystem === MessuarementSystem.Imperial) {
            this.extendedIngredientGroup.forEach(element => {
                if (element.amount == null) {
                    return;
                }

                const newUnit = this._amountFormat.getUnit(element.unit as Unit, this._messuarementSystem);
                const unitMultiplier = this._amountFormat.getUnitMultiplier(
                    element.unit as Unit,
                    this._messuarementSystem
                );

                const newValue = +parseFloat((Number(element.amount) * unitMultiplier).toString()).toFixed(2);

                element.unit = newUnit;
                element.amount = newValue.toString();
            });
        }

        this.isEditMode = true;
    }

    async deleteCocktail() {
        await this._cocktailService.deleteCocktail(this.cocktail.id);
        const cocktailDialogAction = {
            action: 'delete',
            cocktail: this.cocktail
        };
        this.controller.ok(cocktailDialogAction);

        const text = this._i18n.tr('cocktail-deleted', {
            name: this.cocktail.name
        });

        this._toastService.addToastElement({
            text: text,
            className: 'alert-warning'
        });
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
        const cocktail = this._cocktailService.getCocktailById(ingredient.recipeId);
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

        this.cocktail.tags = this.tags?.map(x => x.id);

        if (this.isUserCreatedCocktail) {
            this.cocktail = this.isNewCocktail
                ? await this._cocktailService.createCocktail(this.cocktail)
                : await this._cocktailService.updateCocktail(this.cocktail);
        } else {
            const staticCocktail = getStaticCocktailById(this.cocktail.id);

            const updateRequest = new UpdateCocktailInformationRequest(this.cocktail.id);
            updateRequest.addField(
                'category',
                staticCocktail.category !== this.cocktail.category ? this.cocktail.category : undefined
            );
            updateRequest.addField(
                'ingredientGroups',
                !isEqual(staticCocktail.ingredientGroups, this.cocktail.ingredientGroups)
                    ? this.cocktail.ingredientGroups
                    : undefined
            );
            updateRequest.addField(
                'tags',
                !isEqual(staticCocktail.tags, this.cocktail.tags) ? this.cocktail.tags : undefined
            );

            this.cocktail = await this._cocktailService.updateCocktailInformationByRequest(updateRequest);
        }

        this.isEditMode = false;

        const ingredientIds = this._localStorageService.getIngredientIds();
        this.extendedIngredientGroup = this._ingredientService.toExtendedIngredientGroup(
            this.cocktail.ingredientGroups,
            ingredientIds
        );
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

    editNotes() {
        this.noteState = 'edit';
    }

    clearNotes() {
        this.cocktail.notes = '';
    }

    async saveNotes() {
        if (this.isUserCreatedCocktail) {
            await this._cocktailService.updateCocktail(this.cocktail);
        } else {
            const updateRequest = new UpdateCocktailInformationRequest(this.cocktail.id);
            updateRequest.addField(
                'notes',
                this.cocktail.notes != null && this.cocktail.notes !== '' ? this.cocktail.notes : undefined
            );

            await this._cocktailService.updateCocktailInformationByRequest(updateRequest);
        }

        if (this.cocktail.notes?.length > 0) {
            this.noteState = 'exists';
        } else {
            this.noteState = 'none';
        }
    }
}
