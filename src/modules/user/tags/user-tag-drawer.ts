import { autoinject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { CocktailService } from 'services/cocktail-service';
import { TagModel } from 'domain/entities/cocktail-tag';
import { isNullOrUndefined } from '@moimob/common';

@autoinject
export class UserTagDrawer {
    private _tag: TagModel;

    public name: string;

    constructor(private _dialogController: DialogController, private cocktailService: CocktailService) {}

    activate(tag: TagModel) {
        if (tag !== null) {
            this._tag = tag;
            this.name = tag.name;
        }
    }

    cancel() {
        this._dialogController.cancel();
    }

    async ok() {
        if (isNullOrUndefined(this._tag)) {
            await this.cocktailService.createTag(this.name);
            this._dialogController.ok();
            return;
        }

        this._tag.name = this.name;
        await this.cocktailService.updateTag(this._tag);

        this._dialogController.ok();
    }
}

export interface ActiveTagModel {
    tag: string;
    isActive: boolean;
    translation: string;
}
