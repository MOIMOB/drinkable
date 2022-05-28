import { Widget } from 'enums/widget';
import Sortable from 'sortablejs';
import { inject } from 'aurelia-framework';
import { LocalStorageService } from 'services/local-storage-service';
import { WidgetOrder } from 'models/widget-order';

@inject(LocalStorageService)
export class HomeSettings {
    public widgets = [
        { name: 'ExploreSection', id: Widget.ExploreSection },
        { name: 'IngredientWidget', id: Widget.IngredientWidget },
        { name: 'AddIngredients', id: Widget.AddIngredients },
    ];

    public widgetOrder: WidgetOrder[] = [];

    constructor(private _localStorageService: LocalStorageService) {}

    public activate() {
        const widgetOrder = this._localStorageService.getWidgetOrder();
        this.widgets = this.widgets.sort((a, b) => this.getOrder(widgetOrder, a.id) - this.getOrder(widgetOrder, b.id));
    }

    getOrder(widgetOrder: WidgetOrder[], widget: Widget): number {
        const order = widgetOrder.find(x => x.widgetId === widget)?.order;
        return order !== undefined ? order : 0;
    }

    public attached() {
        const el = document.getElementById('widget-items');
        const sortable = Sortable.create(el, {
            animation: 150,
            onUpdate: (event: { oldIndex: number; newIndex: number }) => {
                this.arraymove(this.widgets, event.oldIndex, event.newIndex);

                const newWidgetOrder: WidgetOrder[] = this.widgets.map((x, y) => ({
                    order: y,
                    widgetId: x.id,
                }));

                this._localStorageService.updateWidgetOrder(newWidgetOrder);
            },
        });
    }

    arraymove<T>(arr: T[], fromIndex: number, toIndex: number): void {
        const element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
    }
}
