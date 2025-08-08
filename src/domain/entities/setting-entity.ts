import { DrinkTypeFilter } from '../enums/drink-type-filter';

export class SettingEntity {
    drinkTypeFilter: DrinkTypeFilter;
    language?: string;
    exploreWidgetState?: number;
    lastSelectedIngredientListId?: number;
    preferCl?: boolean;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(data?: any) {
        // Migration logic: if old data has showMocktails but no drinkTypeFilter
        if (data && data.showMocktails !== undefined && data.drinkTypeFilter === undefined) {
            this.drinkTypeFilter = data.showMocktails ? DrinkTypeFilter.Both : DrinkTypeFilter.OnlyCocktails;
        } else {
            this.drinkTypeFilter = data?.drinkTypeFilter ?? DrinkTypeFilter.OnlyCocktails;
        }
        
        this.language = data?.language;
        this.exploreWidgetState = data?.exploreWidgetState;
        this.lastSelectedIngredientListId = data?.lastSelectedIngredientListId;
        this.preferCl = data?.preferCl;
    }
}
