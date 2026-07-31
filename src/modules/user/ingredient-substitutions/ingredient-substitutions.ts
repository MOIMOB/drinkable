import { autoinject, computedFrom } from 'aurelia-framework';
import { Ingredient, IngredientSubstitutionModel } from 'domain/entities/ingredient';
import { IngredientService } from 'services/ingredient-service';

@autoinject()
export class IngredientSubstitutes {
    public userSubstitutions: IngredientSubstitutionModel[] = [];
    public defaultSubstitutions: IngredientSubstitutionModel[] = [];
    public allIngredients: Ingredient[] = [];
    public highlightedIngredientId: string;

    public isFormOpen = false;
    public editingIngredientId: string;
    public selectedSourceId = '';
    public selectedReplacementIds: string[] = [];
    public note = '';
    public replacementFilter = '';
    public defaultsElement: HTMLDetailsElement;

    constructor(private _ingredientService: IngredientService) {}

    activate(params: { ingredientId?: string }) {
        this.highlightedIngredientId = params?.ingredientId;
        this.load();
    }

    attached() {
        if (!this.highlightedIngredientId) {
            return;
        }

        if (this.defaultSubstitutions.some(x => x.id === this.highlightedIngredientId) && this.defaultsElement) {
            this.defaultsElement.open = true;
        }

        const row = document.getElementById(`substitution-row-${this.highlightedIngredientId}`);
        row?.scrollIntoView({ block: 'center' });
    }

    load() {
        const ingredients = this._ingredientService.getIngredinetWithsubstitutions();
        this.userSubstitutions = ingredients.filter(x => x.isUserDefined);
        this.defaultSubstitutions = ingredients.filter(x => !x.isUserDefined);
        this.allIngredients = this._ingredientService.getIngredients();
    }

    @computedFrom('allIngredients', 'selectedSourceId', 'replacementFilter')
    get filteredReplacementCandidates(): Ingredient[] {
        const filter = this.replacementFilter.trim().toLocaleLowerCase();

        return this.allIngredients.filter(
            x => x.id !== this.selectedSourceId && (!filter || x.name.toLocaleLowerCase().includes(filter))
        );
    }

    openAddForm() {
        this.isFormOpen = true;
        this.editingIngredientId = undefined;
        this.selectedSourceId = '';
        this.selectedReplacementIds = [];
        this.note = '';
        this.replacementFilter = '';
    }

    openEditForm(item: IngredientSubstitutionModel) {
        const existing = this._ingredientService.getUserSubstitution(item.id);

        this.isFormOpen = true;
        this.editingIngredientId = item.id;
        this.selectedSourceId = item.id;
        this.selectedReplacementIds = existing ? [...existing.replacementIds] : [];
        this.note = existing?.note ?? '';
        this.replacementFilter = '';
    }

    closeForm() {
        this.isFormOpen = false;
    }

    // No @computedFrom: selectedReplacementIds is mutated in place by the native
    // checkbox-array binding (checked.bind + model.bind), not reassigned, so a
    // computed-from dependency on it would never re-evaluate. Dirty-checking does.
    get canSave(): boolean {
        return this.selectedSourceId !== '' && this.selectedReplacementIds.length > 0;
    }

    async save() {
        if (!this.canSave) {
            return;
        }

        await this._ingredientService.saveUserSubstitution(
            this.selectedSourceId,
            this.selectedReplacementIds,
            this.note.trim() || undefined
        );

        this.isFormOpen = false;
        this.load();
    }

    async remove(ingredientId: string) {
        await this._ingredientService.deleteUserSubstitution(ingredientId);
        this.isFormOpen = false;
        this.load();
    }
}
