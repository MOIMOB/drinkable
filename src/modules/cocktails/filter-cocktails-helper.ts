import { Cocktail } from 'domain/entities/cocktail';
import { CocktailFilterDialogModel } from 'components/dialogs/cocktail-filter-dialog';
import { IngredientService } from 'services/ingredient-service';

export function filterCocktailList(request: FilterCocktailRequest) {
    let filterCount = 0;

    const searchFilter = request.searchText === undefined ? '' : request.searchText;
    let cocktails = request.cocktails.filter(x => x.name.toLowerCase().includes(searchFilter.toLowerCase()));

    if (searchFilter !== '') {
        cocktails.sort(a => (a.name.toLowerCase().startsWith(searchFilter.toLowerCase()) ? -1 : 1));
    }

    if (request.filterDialogModel.categoryFilter !== null) {
        cocktails = cocktails.filter(x => x.category === request.filterDialogModel.categoryFilter);
        filterCount++;
    }

    if (request.filterDialogModel.alcoholFilter !== null) {
        cocktails = cocktails.filter(x => x.alcoholInformation.level === request.filterDialogModel.alcoholFilter);
        filterCount++;
    }

    if (request.filterDialogModel.spiritFilter !== null) {
        const ingredientIds = request.ingredientService.getIngredientsBySpiritType(
            request.filterDialogModel.spiritFilter
        );

        cocktails = cocktails.filter(x =>
            x.ingredientGroups.some(y => ingredientIds.map(y => y.id).includes(y.ingredientId))
        );
        filterCount++;
    }

    if (request.filterDialogModel.ingredientFilter !== null) {
        const ingredientIds = request.ingredientService.getIngredientAndReplacementIds(
            request.filterDialogModel.ingredientFilter
        );

        cocktails = cocktails.filter(x => x.ingredientGroups.some(x => ingredientIds.includes(x.ingredientId)));
        filterCount++;
    }

    if (request.filterDialogModel.favoriteFilter !== null) {
        cocktails = cocktails.filter(x => x.isFavorite === true);
        filterCount++;
    }

    if (request.filterDialogModel.tagFilter !== null) {
        const tagIds = request.filterDialogModel.tagFilter;

        cocktails = cocktails.filter(x => tagIds.every(tagId => x.tags.includes(tagId)));
        filterCount = filterCount + tagIds.length;
    }

    const response: FilterCocktailResponse = {
        cocktails: cocktails,
        actvieFilterCount: filterCount > 0 ? filterCount : undefined
    };

    return response;
}

export type FilterCocktailResponse = {
    cocktails: Cocktail[];
    actvieFilterCount: number | undefined;
};

export type FilterCocktailRequest = {
    cocktails: Cocktail[];
    searchText: string;
    filterDialogModel: CocktailFilterDialogModel;
    ingredientService: IngredientService;
};
