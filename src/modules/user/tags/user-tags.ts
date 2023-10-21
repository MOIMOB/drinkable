import { DialogService } from 'aurelia-dialog';
import { autoinject } from 'aurelia-framework';
import { CocktailService } from 'services/cocktail-service';
import { TagModel } from 'domain/entities/cocktail-tag';
import { UserTagDrawer } from './user-tag-drawer';

@autoinject
export class UserTags {
    public tags: CreatedTagModel[] = [];

    constructor(
        private _dialogService: DialogService,
        private _cocktailService: CocktailService
    ) {}

    bind() {
        const createdTags = this._cocktailService.getCreatedTags();
        const cocktails = this._cocktailService.getCocktails();

        this.tags = createdTags.map(tag => ({
            ...tag,
            usedInCocktailNames: cocktails
                .filter(cocktail => cocktail.tags.includes(tag.id))
                .map(cocktail => cocktail.name)
        }));
    }

    openDialog(tag: CreatedTagModel) {
        this._dialogService.open({ viewModel: UserTagDrawer, model: tag, lock: true }).whenClosed(() => {
            this.bind();
        });
    }
}

export type CreatedTagModel = {
    usedInCocktailNames: string[];
} & TagModel;
