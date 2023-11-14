import { autoinject, observable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { IngredientList } from 'domain/entities/ingredient-list';
import { LocalStorageService } from 'services/local-storage-service';

@autoinject
export class UserPage {
    public listItems: UserListItem[] = [
        {
            title: 'user.cocktails-title',
            subtitle: 'user.cocktails-subtitle',
            iconView: './../../components/icons/icon-wine.html',
            route: 'user-cocktails'
        },
        {
            title: 'user.ingredients-title',
            subtitle: 'user.ingredients-subtitle',
            iconView: './../../components/icons/icon-leaf.html',
            route: 'user-ingredients'
        },
        {
            title: 'user.tags-title',
            subtitle: 'user.tags-subtitle',
            iconView: './../../components/icons/icon-bookmark.html',
            route: 'user-tags'
        },
        {
            title: 'shopping-list.title',
            subtitle: 'shopping-list.subtitle',
            iconView: './../../components/icons/icon-reader.html',
            route: 'user-shopping-lists'
        }
    ];

    public otherListItems: UserListItem[] = [
        {
            title: 'user.settings-title',
            subtitle: 'user.settings-subtitle',
            iconView: './../../components/icons/icon-settings.html',
            route: 'settings'
        },
        {
            title: 'user.contact-title',
            subtitle: 'user.contact-subtitle',
            iconView: './../../components/icons/icon-mail.html',
            route: 'contact'
        }
    ];

    @observable public selectedIngredientListId: number;
    public ingredientLists: IngredientList[];

    constructor(
        private _router: Router,
        private _localStorageService: LocalStorageService
    ) {}

    activate() {
        this.ingredientLists = this._localStorageService.getIngredientLists();
        this.selectedIngredientListId = this._localStorageService.getActiveIngredientListId();
    }

    async selectedIngredientListIdChanged(newValue: number, oldValue: number) {
        if (oldValue === undefined) {
            return;
        }

        await this._localStorageService.setActiveIngredientListId(newValue);
    }

    navigateToRoute(route: string) {
        this._router.navigateToRoute(route);
    }
}

export type UserListItem = {
    title: string;
    subtitle: string;
    iconView: string;
    route: string;
    newBadge?: boolean;
};
