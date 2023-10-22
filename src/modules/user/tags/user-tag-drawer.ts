import { inject, NewInstance } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { CocktailService } from 'services/cocktail-service';
import { CreatedTagModel } from './user-tags';
import { TagModel } from 'domain/entities/cocktail-tag';
import { ValidationController, ValidationRules } from 'aurelia-validation';

@inject(DialogController, CocktailService, NewInstance.of(ValidationController))
export class UserTagDrawer {
    private _tag: CreatedTagModel;

    public name: string;
    public isNew = true;
    public usedInCocktailNames: string[] = [];

    constructor(
        private _dialogController: DialogController,
        private cocktailService: CocktailService,
        private _validationController: ValidationController
    ) {
        ValidationRules.ensure('name').required().withMessage('Name is required').on(this);
    }

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
        const result = await this._validationController.validate();

        if (!result.valid) {
            return;
        }

        if (this.isNew === true) {
            await this.cocktailService.createTag(this.name);
            this._dialogController.ok();
            return;
        }

        this._tag.name = this.name;

        const tagToUpdate: TagModel = {
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

export type ActiveTagModel = {
    tag: string;
    isActive: boolean;
    translation: string;
};
