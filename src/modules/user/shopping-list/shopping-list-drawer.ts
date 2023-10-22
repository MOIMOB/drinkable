import { DialogController } from 'aurelia-dialog';
import { inject, NewInstance } from 'aurelia-framework';
import { ValidationController, ValidationRules } from 'aurelia-validation';
import { ShoppingListService } from 'services/shopping-list-service';
import { ShoppingList } from './shopping-list-models';
import { I18N } from 'aurelia-i18n';
import { LocalStorageService } from 'services/local-storage-service';

@inject(DialogController, NewInstance.of(ValidationController), ShoppingListService, I18N, LocalStorageService)
export class ShoppingListDrawer {
    public name = '';
    public isNew = true;
    public placeholder: string;

    private _id: number;

    constructor(
        private _dialogController: DialogController,
        private _validationController: ValidationController,
        private _shoppingListService: ShoppingListService,
        private _i18n: I18N,
        private _localStorageService: LocalStorageService
    ) {
        ValidationRules.ensure('name')
            .required()
            .when(() => this.placeholder === '' || (this.placeholder.length > 0 && this.name.length > 0))
            .withMessage('Name cannot be empty')
            .on(this);
    }

    activate(model: ShoppingList) {
        if (model) {
            this.name = model.name;
            this._id = model.id;
            this.isNew = false;
            this.placeholder = '';
        } else {
            const locale = this._localStorageService.getSettings().language ?? 'en';

            const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit' };
            const today = new Date().toLocaleDateString(locale, options);

            this.placeholder = this._i18n.tr('shopping-list.to-shop-on-date', {
                date: today
            });
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

        if (this.name === '') {
            this.name = this.placeholder;
        }

        if (this.isNew) {
            this._shoppingListService.createShoppingList({ name: this.name });
        } else {
            this._shoppingListService.updateShoppingList({ id: this._id, name: this.name });
        }

        this._dialogController.ok();
    }
}
