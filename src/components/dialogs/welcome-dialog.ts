import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { LocalStorageService } from 'services/local-storage-service';
import { MessuarementSystem } from 'domain/enums/messuarement-system';

@inject(DialogController, LocalStorageService)
export class WelcomeDialog {
    public controller: DialogController;
    public messuarementSystems = [MessuarementSystem.Imperial, MessuarementSystem.Metric];
    public selectedMessuarementSystem: MessuarementSystem = MessuarementSystem.Imperial;

    constructor(dialogContoller: DialogController, private _localStorageService: LocalStorageService) {
        this.controller = dialogContoller;
    }

    public async selectMessuarementSystem(messuarementSystem: MessuarementSystem) {
        this.selectedMessuarementSystem = messuarementSystem;
    }

    async ok() {
        await this._localStorageService.updateMessuarmentSystem(this.selectedMessuarementSystem);
        this.controller.ok();
    }
}
