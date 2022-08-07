import { Cocktail, ExtendedIngredientGroup } from 'models/cocktail';
import { DialogController } from 'aurelia-dialog';
import { inject } from 'aurelia-framework';
import { toExtendedIngredientGroup } from 'functions/ingredient-functions';
import { LocalStorageService } from 'services/local-storage-service';
import { AdMob, BannerAdOptions, BannerAdPosition, BannerAdSize } from '@capacitor-community/admob';
import { DrinkCategory } from 'enums/drink-category';
import { Camera, CameraResultType } from '@capacitor/camera';

@inject(DialogController, LocalStorageService)
export class CocktailViewModel {
    public cocktail: Cocktail;
    public extendedIngredientGroup: ExtendedIngredientGroup[];
    public controller: DialogController;
    public multiplier = 1;
    public multiplierValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    public cocktailCategories = [DrinkCategory.Cocktail, DrinkCategory.Shot, DrinkCategory.Other];
    public isFavorite = false;
    public isEditMode = false;

    private _favoriteCocktails: number[] = [];

    constructor(dialogContoller: DialogController, private _localStorageService: LocalStorageService) {
        this.controller = dialogContoller;
    }

    activate(cocktail: Cocktail) {
        if (cocktail === null) {
            this.cocktail = new Cocktail();
            this.isEditMode = true;
        } else {
            this.cocktail = cocktail;
        }

        const ingredientIds = this._localStorageService.getIngredientIds();
        this.extendedIngredientGroup = toExtendedIngredientGroup(this.cocktail.ingredientGroups, ingredientIds);
        this._favoriteCocktails = this._localStorageService.getFavoriteCocktails();
        this.isFavorite = this._favoriteCocktails.includes(this.cocktail.id);
    }

    checkIngredient(ingredient: ExtendedIngredientGroup) {
        ingredient.isChecked = !ingredient.isChecked;
    }

    async takePicture() {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Uri,
        });

        this.cocktail.imageSrc = image.webPath;
    }

    attached() {
        // const options: BannerAdOptions = {
        //     adId: 'ca-app-pub-5803000491420516/5986605105',
        //     adSize: BannerAdSize.BANNER,
        //     position: BannerAdPosition.BOTTOM_CENTER,
        //     margin: 0,
        //     isTesting: true,
        //     npa: true,
        // };
        // AdMob.showBanner(options);
    }

    detached() {
        // AdMob.removeBanner();
    }

    async toggleHeart() {
        this.isFavorite = !this.isFavorite;

        if (this.isFavorite) {
            this._favoriteCocktails.push(this.cocktail.id);
        } else {
            this._favoriteCocktails = this._favoriteCocktails.filter(id => id !== this.cocktail.id);
        }

        await this._localStorageService.updateFavoriteCocktails(this._favoriteCocktails);
    }
}
