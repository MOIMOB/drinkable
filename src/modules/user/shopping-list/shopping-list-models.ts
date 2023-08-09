export type ShoppingList = {
    id: number;
    name: string;
    ingredients: ShoppingListIngredient[];
};

export type ShoppingListIngredient = {
    id: string;
    shopped: boolean;
};

export type CreateShoppingListRequest = Pick<ShoppingList, 'name'>;
export type UpdateShoppingListRequest = Partial<ShoppingList> & Required<Pick<ShoppingList, 'id'>>;
