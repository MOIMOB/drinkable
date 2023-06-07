import { DialogService } from 'aurelia-dialog';
import { autoinject } from 'aurelia-framework';
import { CocktailService } from 'services/cocktail-service';
import { TagModel } from 'domain/entities/cocktail-tag';
import { UserTagDrawer } from './user-tag-drawer';

@autoinject
export class UserTags {
    public tags: TagModel[] = [];

    constructor(private _dialogService: DialogService, private _cocktailService: CocktailService) {}

    bind() {
        this.tags = this._cocktailService.getCreatedTags();
    }

    openDialog(tag: TagModel) {
        this._dialogService.open({ viewModel: UserTagDrawer, model: tag, lock: true }).whenClosed(response => {
            this.tags = this._cocktailService.getCreatedTags();
        });
    }
}
