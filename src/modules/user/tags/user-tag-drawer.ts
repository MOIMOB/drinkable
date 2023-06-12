import { autoinject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { CocktailService } from 'services/cocktail-service';
import { CreatedTagModel } from './user-tags';
import { TagModel } from 'domain/entities/cocktail-tag';

@autoinject
export class UserTagDrawer {
    private _tag: CreatedTagModel;

    public name: string;
    public isNew: boolean = true;
    public usedInCocktailNames: string[] = [];

    constructor(private _dialogController: DialogController, private cocktailService: CocktailService) {}

    activate(tag: CreatedTagModel) {
        if (tag !== null) {
            this._tag = tag;
            this.name = tag.name;
            this.usedInCocktailNames = tag.usedInCocktailNames;
            this.isNew = false;
        }
    }

    cancel() {
        this._dialogController.cancel();
    }

    async ok() {
        if (this.isNew === true) {
            await this.cocktailService.createTag(this.name);
            this._dialogController.ok();
            return;
        }

        this._tag.name = this.name;

        let tagToUpdate: TagModel = {
            id: this._tag.id,
            name: this._tag.name,
            translation: this._tag.translation
        };

        await this.cocktailService.updateTag(tagToUpdate);

        this._dialogController.ok();
    }

    async delete() {
        if (this.isNew === true) {
            return;
        }

        await this.cocktailService.deleteTag(this._tag.id);
        this._dialogController.ok();
    }
}

export interface ActiveTagModel {
    tag: string;
    isActive: boolean;
    translation: string;
}
