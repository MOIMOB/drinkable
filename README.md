# `Drinkable`

<a href='https://play.google.com/store/apps/details?id=com.moimob.drinkable&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img width="200px" alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/></a>
<a href="https://f-droid.org/en/packages/com.moimob.drinkable">
<img src="https://fdroid.gitlab.io/artwork/badge/get-it-on.png"
    alt="Get it on F-Droid"
    width="200">
</a>
<a href="https://apps.apple.com/us/app/drinkable/id6480014126?itsct=apps_box_badge&amp;itscg=30200" style="display: inline-block; overflow: hidden; border-radius: 13px; width: 250px; height: 83px;"><img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1711929600" alt="Download on the App Store" style="border-radius: 13px; width: 170px; height: 75px; padding-left: 11px;"></a>

![Alt text](/android/app/src/main/feature-graphic.png?raw=true)

## Getting Started

This project is bootstrapped by [aurelia-cli](https://github.com/aurelia/cli).
For more information, go to https://aurelia.io/docs/cli/webpack

### Run dev app

Run `npm start`, then open `http://localhost:8080`

You can change the standard webpack configurations from CLI easily with something like this: `npm start -- --open --port 8888`. However, it is better to change the respective npm scripts or `webpack.config.js` with these options, as per your need.

To enable Webpack Bundle Analyzer, do `npm run analyze` (production build).

To enable hot module reload, do `npm start -- --hmr`.

To change dev server port, do `npm start -- --port 8888`.

To change dev server host, do `npm start -- --host 127.0.0.1`

**PS:** You could mix all the flags as well, `npm start -- --host 127.0.0.1 --port 7070 --open --hmr`

### Build for production

Run `npm run build`

### Copying Web Code

Once your web code is built, it needs to be copied into each native project:

`npx cap copy`
Run this command each time you perform a build and consider adding it to the end of your build script in package.json.

### Building Native Project

#### Add Native Projects

`npx cap add ios`
`npx cap add android`
`npx cap sync`

#### iOS

iOS relies on Xcode to do the final app compile:

`npx cap copy ios`
`npx cap open ios`
Once Xcode launches, you can build your app binary through the standard Xcode workflow.

#### Android

Android relies on Android Studio (or, optionally, the Android CLI tools) to build the app:

`npx cap copy android`
`npx cap open android`
`npx cap run android`

Once Android Studio launches, you can build your app through the standard Android Studio workflow.

## Contributing

### Add Ingredient

Locate `src/data/ingredient-data.ts`

Add ingredient to the end of the list. Example:

```json
{ id: '165', translation: 'chocolate-sauce', spiritType: SpiritType.None }
```

Id - Id should be unique. Just add one from the previous row

Translation - This is the translation key and will used in the translation files found here `src/locales/en/ingedients.json`

SpiritType - Specifies what type of spirit the ingredient is. Use any of these

    None
    Gin
    Vodka
    Rum
    WiskeyScotch
    Tequila
    CognacBrandy

### Add Cocktail

Locate `src/data/cocktail-data.ts`

Add cocktail to the end of the list. Example

```json
{
    id: '191',
    imageSrc: 'images/salted_toffee_martini.jpg',
    isImagePortrait: false,
    translation: 'salted-toffee-martini',
    category: DrinkCategory.Cocktail,
    ingredientGroups: [
        { amount: '60', ingredientId: '6', unit: Unit.ML },
        { amount: '30', ingredientId: '164', unit: Unit.ML },
        { amount: '15', ingredientId: '22', unit: Unit.ML },
        { amount: '', ingredientId: '165', unit: '' }
    ],
    tags: []
}
```

Id - Id should be unique. Just add one from the previous row

ImageSrc - Where the image is located. images directory is found at `static/images/`. Add a new image if needed

isImagePortrait - Set to true if image is portrait. Scales the image differntly in the app

Translation - This is the translation key and will used in the translation files found here `src/locales/en/cocktails.json` and here `src/locales/en/instructions.json`

Category - Specifies what cocktail category. Use any of these

    Cocktail
    Shot
    Other
    Ingredient
    Mocktail

IngredientGroups - Specify a list of ingredients. Fill in amount ingredientId and unit. You will find the ingredients and ingredientIds in `src/data/ingredient-data.ts`. Use Metric here and the app will automatically convert to either imperial or metric.

### Add Translation

If you want to add a new language to the app follow these steps. The best experience is to clone the repo and run the web code.

There is currently three files that you can translate
`translation.json` is used for overall app translations, this file is required
`ingredients.json` is used for ingredient translations, this file is optional but highly appreciated
`cocktails.json` is used for cocktail translations, this file is optional but highly appreciated

#### Add a new Folder

Under src/locales add a folder with your languages ISO Code. For example if you want to add Swedish translation you add a folder called 'sv'

#### Copy content

Copy `locales/en/translation.json` into your new folder. Example `locales/sv/translation.json`

Copy `locales/en/ingredients.json` into your new folder. Example `locales/sv/ingredients.json`

Copy `locales/en/cocktails.json` into your new folder. Example `locales/sv/cocktails.json`

#### Translate

Now edit the file and replace the english words with your language of choice.

#### Check Translation Completeness

Use the translation checker script to verify your translations:

```bash
# Check specific language
python scripts/check.py zh

# List available languages
python scripts/check.py --list

# Check specific files only
python scripts/check.py zh --files translation.json ingredients.json
```

The script will show:
- Missing translations with their source file locations
- Completion percentage for each file
- Concise summary of translation status

#### Add Language to selection

Locate `src/data/languages.ts`

Add your language to this array.

```
const languages = [
    { value: undefined, name: 'English' },
    { value: 'de', name: 'Deutsch' },
    { value: 'sv', name: 'Svenska' },
    { value: 'it', name: 'Italiano' },
    { value: 'es', name: 'Español' },
    { value: 'ca', name: 'Català' },
    { value: 'nl', name: 'Nederlands' },
    { value: 'fr', name: 'Français' },
    { value: 'ru', name: 'Русский' },
    { value: 'pl', name: 'Polski' },
    { value: 'pt-BR', name: 'Português do Brasil' },
    { value: 'si', name: 'සිංහල (sĩhala)' },
    { value: 'kr', name: '한국어' },
    { value: 'zh', name: '简体中文'}
];
```
