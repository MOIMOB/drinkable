import { ThemeService } from 'services/theme-service';
import { inject, observable } from 'aurelia-framework';

@inject(ThemeService)
export class Settings {
    @observable public selectedTheme: string;

    public themes = [
        { value: null, name: 'Use system setting' },
        { value: 'dark', name: 'Dark' },
        { value: 'light', name: 'Light' },
    ];

    constructor(private _themeService: ThemeService) {}

    public activate() {
        this.selectedTheme = this._themeService.getLocalStorageResult();
    }

    selectedThemeChanged(newValue: string, _) {
        this._themeService.updateTheme(newValue);
    }
}
