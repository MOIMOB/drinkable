import { inject, NewInstance } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { CreatedIngredientModel, Ingredient } from 'domain/entities/ingredient';
import { IngredientService } from 'services/ingredient-service';
import { ValidationController, ValidationRules } from 'aurelia-validation';

@inject(DialogController, IngredientService, NewInstance.of(ValidationController))
export class IngredientDialog {
    public isEditMode: boolean;
    public ingredient: CreatedIngredientModel;
    public errorMessage = '';
    private _ingredients: Ingredient[] = [];

    constructor(
        private _dialogController: DialogController,
        private _ingredientService: IngredientService,
        private _validationController: ValidationController
    ) {}

    activate(ingredient: CreatedIngredientModel) {
        this.isEditMode = ingredient !== null;

        this.ingredient = this.isEditMode ? ingredient : new CreatedIngredientModel();

        this._ingredients = this._ingredientService.getIngredients().filter(x => x.id !== ingredient?.id);

        ValidationRules.customRule(
            'ingredientNotAlreadyCreated',
            (value, object, list: Ingredient[]) => {
                return list.find(y => y.name.toLocaleLowerCase() === value.toLocaleLowerCase()) === undefined;
            },
            'This ingredient does already exist!',
            list => ({ list })
        );

        ValidationRules.ensure('name')
            .required()
            .withMessage('Name is required')
            .then()
            .satisfiesRule('ingredientNotAlreadyCreated', this._ingredients)
            .on(this.ingredient);
    }

    async delete() {
        await this._ingredientService.deleteIngredient(this.ingredient.id);
        const ingredientDialogAction = {
            action: 'delete',
            ingredient: this.ingredient
        };
        this._dialogController.ok(ingredientDialogAction);
    }

    cancel() {
        this._dialogController.cancel();
    }
    async ok() {
        const result = await this._validationController.validate();

        if (!result.valid) {
            return;
        }

        if (this.isEditMode === false) {
            await this._ingredientService.createIngredient(this.ingredient.name);
        } else {
            await this._ingredientService.updateIngredient(this.ingredient);
        }

        this._dialogController.ok();
    }
}
