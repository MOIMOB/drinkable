import { autoinject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { CocktailService } from 'services/cocktail-service';
import { TagModel } from 'domain/entities/cocktail-tag';

@autoinject
export class EditTagsDrawer {
    public tags: ActiveTagModel[] = [];

    constructor(
        private _dialogController: DialogController,
        private cocktailService: CocktailService
    ) {}

    activate(activeTags: string[]) {
        const tags = this.cocktailService.getTags();

        tags.forEach(element => {
            const model: ActiveTagModel = {
                id: element.id,
                isActive: activeTags.includes(element.id),
                translation: element.translation,
                name: element.name
            };

            this.tags.push(model);
        });
    }

    cancel() {
        this._dialogController.cancel();
    }

    ok() {
        this._dialogController.ok(this.tags.filter(x => x.isActive).map(x => x.id));
    }

    toggleTag(tag: ActiveTagModel) {
        tag.isActive = !tag.isActive;
    }
}

export type ActiveTagModel = {
    id: string;
    isActive: boolean;
    translation: string;
    name: string;
} & TagModel;
