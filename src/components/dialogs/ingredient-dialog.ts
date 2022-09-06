import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { CreatedIngredientModel, Ingredient } from 'domain/entities/ingredient';
import { IngredientService } from 'services/ingredient-service';

@inject(DialogController, IngredientService)
export class ingredientDialog {
    public isEditMode: boolean;
    public ingredient: CreatedIngredientModel;
    public errorMessage = '';
    private _ingredients: Ingredient[] = [];

    constructor(private _dialogController: DialogController, private _ingredientService: IngredientService) {}

    activate(ingredient: CreatedIngredientModel) {
        this.isEditMode = ingredient !== null;

        this.ingredient = this.isEditMode ? ingredient : new CreatedIngredientModel();

        this._ingredients = this._ingredientService.getIngredients().filter(x => x.id !== ingredient?.id);
    }

    async delete() {
        await this._ingredientService.deleteIngredient(this.ingredient.id);
        const ingredientDialogAction = {
            action: 'delete',
            ingredient: this.ingredient,
        };
        this._dialogController.ok(ingredientDialogAction);
    }

    cancel() {
        this._dialogController.cancel();
    }
    async ok() {
        if (
            this._ingredients.find(x => x.name.toLocaleLowerCase() === this.ingredient.name.toLocaleLowerCase()) !==
            undefined
        ) {
            this.errorMessage = 'This ingredient does already exist!';
            setTimeout(() => {
                this.errorMessage = '';
            }, 5000);
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
