import PullToRefresh from 'pulltorefreshjs';
import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';

@inject(EventAggregator)
export class Home {
    public ptr;

    constructor(private _ea: EventAggregator) {}

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
