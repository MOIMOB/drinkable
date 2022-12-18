export class SettingEntity {
    appRateTimestamp: number;
    language?: string;
    showMocktails: boolean;

    constructor() {
        this.appRateTimestamp = 0;
        this.showMocktails = false;
    }
}
