import { DialogController } from 'aurelia-dialog';
import { autoinject, observable } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import { ToastService } from 'components/toast/toast-service';
import { CocktailService } from 'services/cocktail-service';
import { IngredientService } from 'services/ingredient-service';
import { LocalStorageService } from 'services/local-storage-service';

@autoinject()
export class LoadBackupDialog {
    public controller: DialogController;
    @observable public backupJson: string;
    public isValid = false;
    errorMessage: string;

    constructor(
        private _dialogContoller: DialogController,
        private _localStorageService: LocalStorageService,
        private _ingredientService: IngredientService,
        private _cocktailService: CocktailService,
        private _toastService: ToastService,
        private _i18n: I18N
    ) {}

    backupJsonChanged(newValue: string) {
        this.isValid = this.IsValidJsonString(newValue.trim());
    }

    private IsValidJsonString(str: string): boolean {
        try {
            const json = JSON.parse(str);
            console.log(json);
            return typeof json === 'object';
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async restoreBackup() {
        try {
            this.errorMessage = '';
            const backup = JSON.parse(this.backupJson);

            await this._localStorageService.restoreBackup(backup);
            this._ingredientService.reloadService();
            this._cocktailService.reloadService();

            this._toastService.addToastElement({
                className: 'alert-success',
                text: this._i18n.tr('backup-restored-successfully')
            });

            this._dialogContoller.ok();
        } catch (error) {
            console.log(error);
            this.errorMessage = (error as Error).message;
        }
    }

    cancel() {
        this._dialogContoller.cancel();
    }
}
