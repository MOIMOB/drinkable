import { autoinject } from 'aurelia-framework';
import { IngredientSubstitutionModel } from 'domain/entities/ingredient';
import { IngredientService } from 'services/ingredient-service';

@autoinject()
export class IngredientSubstitutes {
    public ingredients: IngredientSubstitutionModel[] = [];

    constructor(private ingredientService: IngredientService) {}

    activate() {
        this.ingredients = this.ingredientService.getIngredinetWithsubstitutions();
    }
}
