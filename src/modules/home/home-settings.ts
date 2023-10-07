import { Widget } from 'domain/enums/widget';
import Sortable from 'sortablejs';
import { inject } from 'aurelia-framework';
import { LocalStorageService } from 'services/local-storage-service';
import { WidgetOrder } from 'domain/entities/widget-order';

@inject(LocalStorageService)
export class HomeSettings {
    public widgets = [
        { name: 'Seasonal Cocktails', id: Widget.SeasonalCocktails },
        { name: 'Navigation', id: Widget.Navigation },
        { name: 'Cocktails from Ingredients', id: Widget.IngredientWidget },
        { name: 'Random Cocktails', id: Widget.ExploreSection },
        { name: 'Quick Add Ingredients', id: Widget.AddIngredients }
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
        Sortable.create(el, {
            animation: 150,
            direction: 'vertical',
            onUpdate: async (event: { oldIndex: number; newIndex: number }) => {
                this.arraymove(this.widgets, event.oldIndex, event.newIndex);

                const newWidgetOrder: WidgetOrder[] = this.widgets.map((x, y) => ({
                    order: y,
                    widgetId: x.id
                }));

                await this._localStorageService.updateWidgetOrder(newWidgetOrder);
            }
        });
    }

    arraymove<T>(arr: T[], fromIndex: number, toIndex: number): void {
        const element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
    }
}
