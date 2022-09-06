import PullToRefresh from 'pulltorefreshjs';
import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';
import { LocalStorageService } from 'services/local-storage-service';
import { WidgetOrder } from 'domain/entities/widget-order';
import { Widget } from 'domain/enums/widget';

@inject(EventAggregator, LocalStorageService)
export class Home {
    public ptr;
    public ingredientIds: string[] = [];
    public widgetOrder: WidgetOrder[] = [];

    constructor(private _ea: EventAggregator, private _localStorageService: LocalStorageService) {}

    activate() {
        this.ingredientIds = this._localStorageService.getIngredientIds();
        this.widgetOrder = this._localStorageService.getWidgetOrder();
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
            distIgnore: 100,
        });
    }

    detached() {
        this.ptr.destroy();
    }

    getOrderById(id: Widget) {
        const widget = this.widgetOrder.find(x => x.widgetId === id);
        if (widget !== undefined) {
            return 'order: ' + widget.order;
        }
        return 'order: ' + 0;
    }
}
