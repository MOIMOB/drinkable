export class LocalStorageService {
    private _savedIngredientIds: number[] = [];

    constructor() {
        const item = this.getIngredientsFromLocalStorage();
        this._savedIngredientIds = item !== null ? item : [];
    }

    public updateIngredients(numbers: number[]) {
        localStorage.removeItem('saved-ingredients');
        localStorage.setItem('saved-ingredients', JSON.stringify(numbers));
        this._savedIngredientIds = numbers;
    }

    public getIngredientIds() {
        return this._savedIngredientIds;
    }

    private getIngredientsFromLocalStorage() {
        const data = localStorage.getItem('saved-ingredients');
        if (data !== null) {
            try {
                return JSON.parse(data);
            } catch {
                localStorage.clear();
            }
        }
        return null;
    }
}
