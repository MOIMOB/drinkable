import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { DialogController } from 'aurelia-dialog';
import { inject, NewInstance } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import { ValidationController, ValidationRules } from 'aurelia-validation';
import { LocalStorageService } from 'services/local-storage-service';
import { BackupEntityBuilder } from './backup-builder';
import { drinkableBackupsPath } from './constants';

@inject(DialogController, NewInstance.of(ValidationController), LocalStorageService, I18N)
export class BackupDrawer {
    public name: string;
    public placeholder: string;
    errorMessage: string;

    constructor(
        private _dialogController: DialogController,
        private _validationController: ValidationController,
        private _localStorageService: LocalStorageService,
        private _i18n: I18N
    ) {
        ValidationRules.ensure('name')
            .required()
            .when(() => this.placeholder == null)
            .withMessage('Name cannot be empty')
            .on(this);
    }

    activate() {
        const locale = this._localStorageService.getSettings().language ?? 'en';
        const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit' };
        const today = new Date().toLocaleDateString(locale, options);

        this.placeholder = this._i18n.tr('backup-name-placeholder', {
            date: today
        });
    }

    cancel() {
        this._dialogController.cancel();
    }

    async ok() {
        try {
            const result = await this._validationController.validate();

            if (!result.valid) {
                return;
            }

            if (this.name == null || this.name === '') {
                this.name = this.placeholder;
            }

            const backupBuilder = new BackupEntityBuilder(this._localStorageService)
                .withTags()
                .withIngredients()
                .withCocktails()
                .withCocktailInformation()
                .withShoppingLists();

            const formattedName = this.name.replaceAll(' ', '_');

            await Filesystem.writeFile({
                path: `${drinkableBackupsPath}/${formattedName}.json`,
                data: JSON.stringify(backupBuilder.build()),
                directory: Directory.Documents,
                encoding: Encoding.UTF8
            });

            this._dialogController.ok();
        } catch (error) {
            const err = error as Error;
            this.errorMessage = err.message;
        }
    }

    async delete() {
        this._dialogController.ok();
    }
}
