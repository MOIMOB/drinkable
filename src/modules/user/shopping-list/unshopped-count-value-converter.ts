import { ShoppingList, ShoppingListIngredient } from './shopping-list-models';

export class UnshoppedCountValueConverter {
    toView(value: ShoppingListIngredient[]) {
        return value.filter(x => x.shopped === false).length;
    }
}
