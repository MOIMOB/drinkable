export class SettingEntity {
    showMocktails: boolean;
    language?: string;
    exploreWidgetState?: number;
    lastSelectedIngredientListId?: number;
    preferCl?: boolean;

    constructor() {
        this.showMocktails = false;
    }
}
