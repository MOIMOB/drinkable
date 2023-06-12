import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

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

    constructor(private _router: Router) {}

    navigateToRoute(route: string) {
        this._router.navigateToRoute(route);
    }
}

export interface UserListItem {
    title: string;
    subtitle: string;
    iconView: string;
    route: string;
}
