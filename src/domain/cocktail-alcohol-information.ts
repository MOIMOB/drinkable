import { isEmpty, sum } from '@moimob/common';
import { Cocktail, IngredientGroup } from './entities/cocktail';
import { formatToTwoDecimalsIfNeeded } from 'functions/utils';
import { Unit } from './enums/unit';
import { Ingredient } from './entities/ingredient';
import { AlcoholLevel } from './enums/alcohol-level';

export class CocktailAlcoholInformation {
    totalAmount: number;
    alcoholAmount: number;
    alcoholPercentage: number;
    level: AlcoholLevel;

    constructor(cocktail: Cocktail, ingredients: Ingredient[]) {
        let tempArray = [];

        cocktail.ingredientGroups.forEach(element => {
            let amount = this.getIngredientAmountInMl(element, cocktail.name);

            let abv = ingredients.find(x => x.id === element.ingredientId)?.abv ?? 0;

            let alcoholAmount = amount * (abv / 100);

            tempArray.push({
                amount: amount,
                abv: abv,
                alcoholAmount: alcoholAmount
            });
        });

        this.totalAmount = tempArray.map(x => x.amount).reduce(sum, 0);
        this.alcoholAmount = tempArray.map(x => x.alcoholAmount).reduce(sum, 0);

        this.alcoholPercentage = 0;

        if (this.totalAmount !== 0 && this.alcoholAmount !== 0) {
            this.alcoholPercentage = formatToTwoDecimalsIfNeeded((this.alcoholAmount / this.totalAmount) * 100);
        }

        this.level = this.getAlcoholLevel(this.alcoholPercentage);
    }
    private getAlcoholLevel(alcoholPercentage: number): AlcoholLevel {
        if (alcoholPercentage <= 0) {
            return AlcoholLevel.None;
        }
        if (alcoholPercentage > 0 && alcoholPercentage <= 10) {
            return AlcoholLevel.Weak;
        }
        if (alcoholPercentage > 10 && alcoholPercentage <= 20) {
            return AlcoholLevel.Medium;
        }
        if (alcoholPercentage > 20) {
            return AlcoholLevel.Strong;
        }
    }

    private getIngredientAmountInMl(ingredient: IngredientGroup, name: string) {
        let amount = isEmpty(ingredient.amount) ? 0 : Number(ingredient.amount);

        if (ingredient.unit === Unit.ML) {
            return amount;
        }

        if (ingredient.unit === undefined) {
            return 0;
        }

        switch (ingredient.unit) {
            case Unit.CL:
                return amount * 10;
            case Unit.CUP:
                return amount * 250;
            case Unit.DASH:
                return amount;
            case Unit.DL:
                return amount * 100;
            case Unit.FLOZ:
                return amount * 30;
            case Unit.G:
                return 0;
            case Unit.ML:
                return amount;
            case Unit.None:
                return 0;
            case Unit.SLICE:
                return 0;
            case Unit.SPLASH:
                return amount * 6;
            case Unit.TBSP:
                return amount * 15;
            case Unit.TSP:
                return amount * 5;
            case Unit.WEDGE:
                return 0;
            default:
                console.warn(`Convert ${ingredient.unit} to ml failed. Cocktail name: ${name}`);
                return 0;
        }
    }
}
