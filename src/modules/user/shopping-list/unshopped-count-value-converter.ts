import { ShoppingListIngredient } from './shopping-list-models';

export class UnshoppedCountValueConverter {
    toView(value: ShoppingListIngredient[]) {
        return value.filter(x => !x.shopped).length;
    }
}
