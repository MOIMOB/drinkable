import { Directory, FileInfo, Filesystem } from '@capacitor/filesystem';
import { DialogService } from 'aurelia-dialog';
import { autoinject } from 'aurelia-framework';
import { LocalStorageService } from 'services/local-storage-service';
import { BackupDrawer } from './backup-drawer';
import { drinkableBackupsPath } from './constants';
import { RestoreBackupDialog } from './restore-backup-dialog';

@autoinject
export class Backups {
    public backups: BackupFileMetadata[] = [];

    errorMessage: string;

    constructor(private _dialogService: DialogService) {}

    async attached() {
        const permissionResult = await Filesystem.checkPermissions();
        const permissionState = permissionResult.publicStorage;

        if (permissionState !== 'granted') {
            const permissionResult = await Filesystem.requestPermissions();
            if (permissionResult.publicStorage !== 'granted') {
                this.errorMessage = 'Permissions not granted';
                return;
            }
        }

        const result = await this.getFiles();

        if (result.error) {
            this.errorMessage = result.error.message;
            return;
        }
        this.backups = result.data
            .filter(x => x.type === 'file')
            .map(file => ({
                name: file.name,
                createdDate: new Date(file.ctime),
                modifiedDate: new Date(file.mtime),
                size: file.size,
                prettyName: file.name.replace('.json', '')
            }));
    }

    async getFiles(): Promise<DataOrErrorResponse<FileInfo[]>> {
        try {
            const response = await Filesystem.readdir({
                path: drinkableBackupsPath,
                directory: Directory.Documents
            });
            return { data: response.files, error: null };
        } catch (error) {
            const errorResponse = await this.createDirectoryIfNotExists();
            if (errorResponse != null) {
                return { data: [], error: errorResponse };
            }

            return {
                data: [],
                error: null
            };
        }
    }

    private async createDirectoryIfNotExists() {
        try {
            await Filesystem.mkdir({
                path: drinkableBackupsPath,
                directory: Directory.Documents,
                recursive: true
            });
            return null;
        } catch (error) {
            return error as Error;
        }
    }

    openDialog() {
        this._dialogService.open({ viewModel: BackupDrawer, model: null, lock: true }).whenClosed(async () => {
            await this.attached();
        });
    }

    restoreBackup(backup: BackupFileMetadata) {
        this._dialogService
            .open({
                viewModel: RestoreBackupDialog,
                model: backup,
                lock: false
            })
            .whenClosed(async () => {
                await this.attached();
            });
    }
}

export type BackupFileMetadata = {
    name: string;
    size: number;
    createdDate: Date;
    modifiedDate: Date;
    prettyName: string;
};

export type DataOrErrorResponse<T> = {
    data: T;
    error: Error;
};

@autoinject
export class DateFormatValueConverter {
    constructor(private _localStorageService: LocalStorageService) {}

    toView(value: Date) {
        try {
            return value.toLocaleString(this._localStorageService.getSettings().language, {
                dateStyle: 'medium',
                timeStyle: 'short'
            });
        } catch (error) {
            console.error(error);
        }
    }
}
