export class ThemeService {
    private storageKey = 'theme-preference';
    private currentTheme: string;

    constructor() {
        this.currentTheme = localStorage.getItem(this.storageKey);
        const colorPreference = this.getColorPreference(this.currentTheme);
        this.reflectPreference(colorPreference);
    }

    public getLocalStorageResult() {
        return this.currentTheme;
    }

    public updateTheme(theme: string) {
        if (theme === null) {
            localStorage.removeItem(this.storageKey);
            this.currentTheme = theme;
        } else {
            localStorage.setItem(this.storageKey, theme);
            this.currentTheme = theme;
        }

        const colorPreference = this.getColorPreference(this.currentTheme);
        this.reflectPreference(colorPreference);
    }

    private getColorPreference(value: string) {
        if (value !== null) {
            return value;
        }

        return 'myTheme';
    }

    private reflectPreference(theme: string) {
        document.firstElementChild.setAttribute('data-theme', theme);
    }
}
