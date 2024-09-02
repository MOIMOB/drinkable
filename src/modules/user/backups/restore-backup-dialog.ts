import { DialogController } from 'aurelia-dialog';
import { LocalStorageService } from 'services/local-storage-service';

import { autoinject } from 'aurelia-framework';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { drinkableBackupsPath } from './constants';
import { BackupEntity } from './backup-entity';
import { BackupFileMetadata } from './backups';
import { CocktailService } from 'services/cocktail-service';
import { IngredientService } from 'services/ingredient-service';
import { ToastService } from 'components/toast/toast-service';
import { I18N } from 'aurelia-i18n';

@autoinject
export class RestoreBackupDialog {
    public errorMessage: string;

    private backup: BackupEntity;
    private fileMetadata: BackupFileMetadata;

    constructor(
        private _dialogController: DialogController,
        private _localStorageService: LocalStorageService,
        private _cocktailService: CocktailService,
        private _ingredientService: IngredientService,
        private _toastService: ToastService,
        private _i18n: I18N
    ) {}

    async activate(data: BackupFileMetadata) {
        try {
            this.fileMetadata = data;

            const response = await Filesystem.readFile({
                path: drinkableBackupsPath + '/' + this.fileMetadata.name,
                directory: Directory.Documents,
                encoding: Encoding.UTF8
            });
            this.backup = JSON.parse(response.data as string) as BackupEntity;
        } catch (error) {
            this.errorMessage = (error as Error).message;
        }
    }

    async deleteBackup() {
        try {
            await Filesystem.deleteFile({
                path: drinkableBackupsPath + '/' + this.fileMetadata.name,
                directory: Directory.Documents
            });
            this._dialogController.ok();
        } catch (error) {
            this.errorMessage = (error as Error).message;
        }
    }

    async restoreBackup() {
        try {
            await this._localStorageService.restoreBackup(this.backup);
            this._ingredientService.reloadService();
            this._cocktailService.reloadService();

            this._toastService.addToastElement({
                className: 'alert-success',
                text: this._i18n.tr('backup-restored-successfully')
            });

            this._dialogController.ok();
        } catch (error) {
            this.errorMessage = (error as Error).message;
        }
    }

    cancel() {
        this._dialogController.cancel();
    }
}
