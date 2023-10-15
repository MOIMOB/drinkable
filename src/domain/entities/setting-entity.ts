export class SettingEntity {
    language?: string;
    showMocktails: boolean;
    exploreWidgetState?: number;
    lastSelectedIngredientListId?: number;

    constructor() {
        this.showMocktails = false;
    }
}
