import { DialogController } from 'aurelia-dialog';
import { inject, NewInstance } from 'aurelia-framework';
import { ValidationController, ValidationRules } from 'aurelia-validation';
import { ShoppingListService } from 'services/shopping-list-service';
import { ShoppingList } from './shopping-list-models';

@inject(DialogController, NewInstance.of(ValidationController), ShoppingListService)
export class ShoppingListDrawer {
    public name: string;
    public isNew = true;

    private _id: number;

    constructor(
        private _dialogController: DialogController,
        private _validationController: ValidationController,
        private _shoppingListService: ShoppingListService
    ) {
        ValidationRules.ensure('name').required().withMessage('Name is required').on(this);
    }

    activate(model: ShoppingList) {
        if (model) {
            this.name = model.name;
            this._id = model.id;
            this.isNew = false;
        }
    }

    cancel() {
        this._dialogController.cancel();
    }

    async ok() {
        let result = await this._validationController.validate();
        if (!result.valid) {
            return;
        }

        if (this.isNew) {
            this._shoppingListService.createShoppingList({ name: this.name });
        } else {
            this._shoppingListService.updateShoppingList({ id: this._id, name: this.name });
        }

        this._dialogController.ok();
    }
}
