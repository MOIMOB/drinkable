import PullToRefresh from 'pulltorefreshjs';
import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';
import { LocalStorageService } from 'services/local-storage-service';
import { WidgetOrder } from 'domain/entities/widget-order';
import { Widget } from 'domain/enums/widget';
import Snowflakes from 'magic-snowflakes';

@inject(EventAggregator, LocalStorageService)
export class Home {
    public ptr;
    public containerElement: HTMLElement;
    public snowflakes: Snowflakes;
    public ingredientIds: string[] = [];
    public widgetOrder: WidgetOrder[] = [];

    constructor(private _ea: EventAggregator, private _localStorageService: LocalStorageService) {}

    activate() {
        this.ingredientIds = this._localStorageService.getIngredientIds();
        this.widgetOrder = this._localStorageService.getWidgetOrder();
    }

    attached() {
        this.setupPTR();
        this.setupSnowflakes();
    }

    detached() {
        this.ptr.destroy();
        this.snowflakes?.destroy();
    }

    getOrderById(id: Widget) {
        const widget = this.widgetOrder.find(x => x.widgetId === id);
        if (widget !== undefined) {
            return 'order: ' + widget.order;
        }
        return 'order: ' + 0;
    }

    private setupPTR() {
        this.ptr = PullToRefresh.init({
            mainElement: '#pull-to-refresh',
            onRefresh: () => {
                this._ea.publish('refresh-event');
            },
            getStyles: () => {
                return '';
            },
            distIgnore: 100
        });
    }

    private setupSnowflakes() {
        if (new Date().getMonth() == 11) {
            this.snowflakes = new Snowflakes({
                count: 10,
                speed: 0.3,
                minOpacity: 0.4,
                maxOpacity: 0.7,
                minSize: 10,
                maxSize: 18,
                container: this.containerElement
            });
        }
    }
}
