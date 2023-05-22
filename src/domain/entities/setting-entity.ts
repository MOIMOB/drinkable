export class SettingEntity {
    language?: string;
    showMocktails: boolean;
    exploreWidgetState?: number;

    constructor() {
        this.showMocktails = false;
    }
}
