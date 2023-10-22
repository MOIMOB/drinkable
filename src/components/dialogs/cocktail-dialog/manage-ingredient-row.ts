import { DialogController } from 'aurelia-dialog';
import { autoinject } from 'aurelia-framework';
import { ExtendedIngredientGroup } from 'domain/entities/cocktail';
import { LocalStorageService } from 'services/local-storage-service';
import { Clipboard } from '@capacitor/clipboard';

@autoinject
export class ManageIngredientRow {
    constructor(
        private dialogController: DialogController,
        private localStorageService: LocalStorageService
    ) {}

    public name: string;
    public isInStorage: boolean;
    public selectedBarName: string;
    public showBarName: boolean;
    public textCopied = false;
    private _ingredientId: string;
    private _savedIngredientIds: string[] = [];

    activate(params: ExtendedIngredientGroup) {
        this.isInStorage = params.isInStorage;
        this.name = params.ingredient.name;

        const selectedBar = this.localStorageService.getIngredientList();
        this.selectedBarName = selectedBar.name;
        this._savedIngredientIds = selectedBar.ingredients;

        this.showBarName = this.localStorageService.getIngredientLists().length > 1;

        this._ingredientId = params.ingredient.id;
    }

    cancel() {
        this.dialogController.cancel();
    }

    async toggleIngredientStorageStatus() {
        this.isInStorage = !this.isInStorage;

        if (this.isInStorage === true) {
            this._savedIngredientIds.push(this._ingredientId);
        } else {
            this._savedIngredientIds = this._savedIngredientIds.filter(x => x !== this._ingredientId);
        }

        await this.localStorageService.updateSavedIngredients(this._savedIngredientIds);

        const response: ManageIngredientRowResponse = {
            isInStorage: this.isInStorage
        };

        this.dialogController.ok(response);
    }

    async copyToClipboard() {
        if (this.textCopied === true) {
            return;
        }

        await Clipboard.write({
            string: this.name
        });

        this.textCopied = true;

        setTimeout(() => {
            this.textCopied = false;
        }, 3000);
    }
}

export type ManageIngredientRowResponse = {
    isInStorage: boolean;
};
