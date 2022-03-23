import PullToRefresh from 'pulltorefreshjs';
import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';

@inject(EventAggregator)
export class App {
    public message = 'App';

    constructor(private _ea: EventAggregator) {}

    attached() {
        const ptr = PullToRefresh.init({
            mainElement: '#pull-to-refresh',
            onRefresh: () => {
                this._ea.publish('refresh-event');
            },
            getStyles: () => {
                return '';
            },
        });
    }
}
