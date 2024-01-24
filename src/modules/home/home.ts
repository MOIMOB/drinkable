import { inject } from 'aurelia-framework';
import { LocalStorageService } from 'services/local-storage-service';
import { WidgetOrder } from 'domain/entities/widget-order';
import { Widget } from 'domain/enums/widget';
import Snowflakes from 'magic-snowflakes';

@inject(LocalStorageService)
export class Home {
    public containerElement: HTMLElement;
    public snowflakes: Snowflakes;
    public ingredientIds: string[] = [];
    public widgetOrder: WidgetOrder[] = [];

    constructor(private _localStorageService: LocalStorageService) {}

    activate() {
        this.ingredientIds = this._localStorageService.getIngredientIds();
        this.widgetOrder = this._localStorageService.getWidgetOrder();
    }

    attached() {
        this.setupSnowflakes();
    }

    detached() {
        this.snowflakes?.destroy();
    }

    getOrderById(id: Widget) {
        const widget = this.widgetOrder.find(x => x.widgetId === id);
        if (widget !== undefined) {
            return 'order: ' + widget.order;
        }
        return 'order: ' + 0;
    }

    private setupSnowflakes() {
        if (new Date().getMonth() === 11) {
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
