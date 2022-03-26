import PullToRefresh from 'pulltorefreshjs';
import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';
import { LocalStorageService } from 'services/local-storage-service';

@inject(EventAggregator, LocalStorageService)
export class Home {
    public ptr;
    public ingredientIds: number[] = [];

    constructor(private _ea: EventAggregator, private _localStorageService: LocalStorageService) {}

    activate() {
        this.ingredientIds = this._localStorageService.getIngredientIds();
    }

    attached() {
        this.ptr = PullToRefresh.init({
            mainElement: '#pull-to-refresh',
            onRefresh: () => {
                this._ea.publish('refresh-event');
            },
            getStyles: () => {
                return '';
            },
        });
    }

    detached() {
        this.ptr.destroy();
    }
}
