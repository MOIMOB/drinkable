import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { LocalStorageService } from 'services/local-storage-service';
import { MessuarementSystem } from 'domain/enums/messuarement-system';
import { CocktailService } from 'services/cocktail-service';
import { DrinkTypeFilter, getDrinkTypeFilterTranslations } from 'domain/enums/drink-type-filter';

@inject(DialogController, LocalStorageService, CocktailService)
export class WelcomeDialog {
    public selectedDrinkTypeFilter: DrinkTypeFilter = DrinkTypeFilter.Both;

    public controller: DialogController;
    public messuarementSystems = [MessuarementSystem.Imperial, MessuarementSystem.Metric];
    public selectedMessuarementSystem: MessuarementSystem = MessuarementSystem.Imperial;
    public drinkTypeFilters = getDrinkTypeFilterTranslations();

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
        await this.updateDrinkTypeSettings();

        this.controller.ok();
    }

    private async updateDrinkTypeSettings() {
        const settings = this._localStorageService.getSettings();
        settings.drinkTypeFilter = this.selectedDrinkTypeFilter;
        await this._localStorageService.updateSettings(settings);
        this._cocktailService.updateDrinkTypeFilter(this.selectedDrinkTypeFilter);
    }
}
