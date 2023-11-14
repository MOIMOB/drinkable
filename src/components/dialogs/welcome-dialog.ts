import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { LocalStorageService } from 'services/local-storage-service';
import { MessuarementSystem } from 'domain/enums/messuarement-system';
import { CocktailService } from 'services/cocktail-service';

@inject(DialogController, LocalStorageService, CocktailService)
export class WelcomeDialog {
    public showMocktails = false;

    public controller: DialogController;
    public messuarementSystems = [MessuarementSystem.Imperial, MessuarementSystem.Metric];
    public selectedMessuarementSystem: MessuarementSystem = MessuarementSystem.Imperial;

    constructor(
        dialogContoller: DialogController,
        private _localStorageService: LocalStorageService,
        private _cocktailService: CocktailService
    ) {
        this.controller = dialogContoller;
    }

    public selectMessuarementSystem(messuarementSystem: MessuarementSystem) {
        this.selectedMessuarementSystem = messuarementSystem;
    }

    async ok() {
        await this._localStorageService.updateMessuarmentSystem(this.selectedMessuarementSystem);
        await this.updateShowMocktails();

        this.controller.ok();
    }

    private async updateShowMocktails() {
        const settings = this._localStorageService.getSettings();
        settings.showMocktails = this.showMocktails;
        await this._localStorageService.updateSettings(settings);
        this._cocktailService.updateShowMocktails(settings.showMocktails);
    }
}
