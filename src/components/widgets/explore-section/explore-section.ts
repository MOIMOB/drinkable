import { Cocktail } from 'domain/entities/cocktail';
import { autoinject } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { CocktailDialog } from 'components/dialogs/cocktail-dialog/cocktail-dialog';
import { CocktailService } from 'services/cocktail-service';
import { createCocktailDeleteToast } from 'functions/toast-functions';
import { LocalStorageService } from 'services/local-storage-service';

@autoinject
export class ExploreSection {
    public cocktails: Cocktail[] = [];
    public isNew = true;
    private widgetState: number;
    private readonly _cocktailCount = 10;
    public imageWrapper: HTMLElement;

    constructor(
        private _dialogService: DialogService,
        private _cocktailService: CocktailService,
        private _localStorageService: LocalStorageService
    ) {}

    bind() {
        this.widgetState = this._localStorageService.getSettings().exploreWidgetState ?? 0;
        this.isNew = this.widgetState > 0;

        this.getCocktailByWidgetState(this.widgetState);
    }

    async toggleUpdate() {
        this.widgetState = this.isNew ? 1 : 0;

        let settings = this._localStorageService.getSettings();
        settings.exploreWidgetState = this.widgetState;
        await this._localStorageService.updateSettings(settings);

        this.getCocktailByWidgetState(this.widgetState);

        this.imageWrapper.scrollTo({ left: 0, behavior: 'auto' });
    }

    private getCocktailByWidgetState(widgetState: number) {
        if (widgetState === 0) {
            this.cocktails = this._cocktailService.getRandomCocktails(this._cocktailCount);
        } else {
            this.cocktails = this._cocktailService.getLatestCocktails(this._cocktailCount);
        }
    }

    openDialog(cocktail: Cocktail) {
        this._dialogService.open({ viewModel: CocktailDialog, model: cocktail, lock: false }).whenClosed(response => {
            if (response.output?.action?.toLowerCase() === 'delete') {
                createCocktailDeleteToast(response.output.cocktail);
                this.cocktails = this.cocktails.filter(x => x.id !== cocktail.id);
            }
        });
    }

    refresh() {
        this.getCocktailByWidgetState(this.widgetState);
        this.imageWrapper.scrollTo({ left: 0, behavior: 'smooth' });
    }
}
