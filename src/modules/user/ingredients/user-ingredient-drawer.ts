import { inject, NewInstance } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { CreatedIngredientModel, Ingredient } from 'domain/entities/ingredient';
import { IngredientService, UpdateIngredientRequest } from 'services/ingredient-service';
import { ValidationController, ValidationRules } from 'aurelia-validation';
import { getSpiritTypeFilters, SpiritType } from 'domain/enums/spirit-type';

@inject(DialogController, IngredientService, NewInstance.of(ValidationController))
export class UserIngredientDrawer {
    public ingredient: CreatedIngredientModel;
    public spirits = getSpiritTypeFilters();
    public selectedSpirit: SpiritType = SpiritType.None;
    public isNew = true;
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
        this.selectedSpirit = this.ingredient.spiritType ?? null;

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
            .ensure('abv')
            .min(0)
            .when(x => x !== null && x !== undefined)
            .max(100)
            .when(x => x !== null && x !== undefined)
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

        if (this.isNew) {
            const request = {
                name: this.ingredient.name,
                abv: Number(this.ingredient.abv),
                spiritType: this.selectedSpirit ?? SpiritType.None
            };
            await this._ingredientService.createIngredient(request);
        } else {
            const request: UpdateIngredientRequest = {
                id: this.ingredient.id,
                name: this.ingredient.name,
                abv: Number(this.ingredient.abv),
                spiritType: this.selectedSpirit ?? SpiritType.None
            };
            await this._ingredientService.updateIngredient(request);
        }

        this._dialogController.ok();
    }
}
