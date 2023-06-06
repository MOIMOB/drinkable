import { Tag, getTags } from 'data/tags-data';
import { autoinject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@autoinject
export class EditTagsDrawer {
    public tags: ActiveTagModel[] = [];

    constructor(private _dialogController: DialogController) {}

    activate(activeTags: Tag[]) {
        getTags().forEach(element => {
            let model = {
                tag: element.id,
                isActive: activeTags.includes(element.id),
                translation: element.translation
            };

            this.tags.push(model);
        });
    }

    cancel() {
        this._dialogController.cancel();
    }

    ok() {
        this._dialogController.ok(this.tags.filter(x => x.isActive).map(x => x.tag));
    }

    toggleTag(tag: ActiveTagModel) {
        tag.isActive = !tag.isActive;
    }
}

export interface ActiveTagModel {
    tag: Tag;
    isActive: boolean;
    translation: string;
}
