import { inject, NewInstance } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { CreatedIngredientModel, Ingredient } from 'domain/entities/ingredient';
import { IngredientService } from 'services/ingredient-service';
import { ValidationController, ValidationRules } from 'aurelia-validation';

@inject(DialogController, IngredientService, NewInstance.of(ValidationController))
export class UserIngredientDrawer {
    public ingredient: CreatedIngredientModel;
    public isNew: boolean = true;
    public usedInCocktailNames: string[] = [];
    private _ingredients: Ingredient[] = [];

    constructor(
        private _dialogController: DialogController,
        private _ingredientService: IngredientService,
        private _validationController: ValidationController
    ) {}

    activate(ingredient: CreatedIngredientModel) {
        this.isNew = ingredient === null;
        this.ingredient = this.isNew ? new CreatedIngredientModel() : ingredient;
        this.usedInCocktailNames = this.ingredient.usedInCocktailNames;

        this._ingredients = this._ingredientService.getIngredients().filter(x => x.id !== ingredient?.id);

        ValidationRules.customRule(
            'ingredientNotAlreadyCreated',
            (value, _, list: Ingredient[]) => {
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

        this.isNew === true
            ? await this._ingredientService.createIngredient(this.ingredient.name)
            : await this._ingredientService.updateIngredient(this.ingredient);

        this._dialogController.ok();
    }
}
