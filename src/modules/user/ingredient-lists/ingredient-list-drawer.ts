import { inject, NewInstance } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { ValidationController, ValidationRules } from 'aurelia-validation';
import { LocalStorageService } from 'services/local-storage-service';
import { IngredientList } from 'domain/entities/ingredient-list';

@inject(DialogController, NewInstance.of(ValidationController), LocalStorageService)
export class IngredientListDrawer {
    public name: string;
    public isNew = true;
    public canDelete = false;

    private ingredientList: IngredientList;

    constructor(
        private _dialogController: DialogController,
        private _validationController: ValidationController,
        private localStorageService: LocalStorageService
    ) {
        ValidationRules.ensure('name').required().withMessage('Name is required').on(this);
    }

    activate(ingredientList: IngredientList) {
        if (ingredientList !== null) {
            this.ingredientList = ingredientList;
            this.name = ingredientList.name;
            this.isNew = false;
            if (this.ingredientList.id !== 0) {
                this.canDelete = true;
            }
        }
    }

    cancel() {
        this._dialogController.cancel();
    }

    async ok() {
        const result = await this._validationController.validate();

        if (!result.valid) {
            return;
        }

        if (this.isNew === true) {
            await this.localStorageService.createIngredientList(this.name);
            this._dialogController.ok();
            return;
        }

        const ingredientListToUpdate: IngredientList = {
            id: this.ingredientList.id,
            name: this.name,
            ingredients: this.ingredientList.ingredients
        };

        await this.localStorageService.updateIngredientList(ingredientListToUpdate);

        this._dialogController.ok();
    }

    async delete() {
        if (this.isNew === true) {
            return;
        }

        await this.localStorageService.deleteIngredientList(this.ingredientList.id);
        this._dialogController.ok();
    }
}
