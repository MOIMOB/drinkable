import { DrinkCategory } from 'domain/enums/drink-category';
import { SpiritType } from 'domain/enums/spirit-type';
import { Unit } from 'domain/enums/unit';

export type BaseBackupEntity = {
    version: BackupVersion;
};

export type BackupVersion = 1;

export type BackupEntity = BaseBackupEntity & {
    tags: BackupTagModel[];
    ingredients: BackupIngredient[];
    cocktails: BackupCocktail[];
    cocktailInformation: BackupCocktailInformation[];
    shoppingLists: BackupShoppingList[];
};

export class BackupShoppingList {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly ingredients: BackupShoppingListIngredient[]
    ) {}
}

export class BackupShoppingListIngredient {
    constructor(
        public readonly id: string,
        public readonly shopped: boolean
    ) {}
}

export class BackupTagModel {
    constructor(
        public readonly id: string,
        public readonly name: string
    ) {}
}

export class BackupIngredient {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly abv: number,
        public readonly spiritType: SpiritType
    ) {}
}

export class BackupCocktail {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly imageSrc: string,
        public readonly category: DrinkCategory,
        public readonly instructions: string,
        public readonly notes: string,
        public readonly isFavorite: boolean,
        public readonly tags: string[],
        public readonly ingredientGroups: BackupIngredientGroup[]
    ) {}
}

export class BackupCocktailInformation {
    constructor(
        public readonly id: string,
        public readonly rating?: number,
        public readonly isFavorite?: boolean,
        public readonly notes?: string,
        public readonly category?: DrinkCategory,
        public readonly tags?: string[],
        public readonly ingredientGroups?: BackupIngredientGroup[]
    ) {}
}

export class BackupIngredientGroup {
    constructor(
        public readonly ingredientId: string,
        public readonly amount: string,
        public readonly unit: Unit | string
    ) {}
}
