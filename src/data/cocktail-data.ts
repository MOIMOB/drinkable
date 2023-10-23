import { DrinkCategory } from 'domain/enums/drink-category';
import { Unit } from 'domain/enums/unit';
import { Cocktail, CocktailWithMissingIngredient, StaticCocktail } from 'domain/entities/cocktail';
import { Ingredient } from 'domain/entities/ingredient';
import { Tag } from './tags-data';

export function getStaticCocktails() {
    return [...cocktails];
}

export function toCocktailWithMissingIngredients(
    cocktail: Cocktail,
    ingredient: Ingredient
): CocktailWithMissingIngredient {
    return {
        category: cocktail.category,
        id: cocktail.id,
        imageSrc: cocktail.imageSrc,
        isImagePortrait: cocktail.isImagePortrait,
        ingredientGroups: cocktail.ingredientGroups,
        instructions: cocktail.instructions,
        missingIngredient: ingredient,
        translation: cocktail.translation,
        name: cocktail.name,
        notes: cocktail.notes,
        isFavorite: cocktail.isFavorite,
        rating: cocktail.rating,
        tags: cocktail.tags
    };
}

const cocktails: StaticCocktail[] = [
    {
        id: '1',
        imageSrc: 'images/mojito.jpg',
        isImagePortrait: false,
        translation: 'mojito',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '40', ingredientId: '1', unit: Unit.ML },
            { amount: '30', ingredientId: '2', unit: Unit.ML },
            { amount: '30', ingredientId: '3', unit: Unit.ML },
            { amount: '40', ingredientId: '4', unit: Unit.ML },
            { amount: '', ingredientId: '5', unit: '' }
        ],
        tags: [Tag.IBA, Tag.ContemporaryClassics]
    },
    {
        id: '2',
        imageSrc: 'images/gin_tonic.jpg',
        isImagePortrait: false,
        translation: 'gin-&-tonic',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '40', ingredientId: '6', unit: Unit.ML },
            { amount: '120', ingredientId: '7', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '3',
        imageSrc: 'images/bloody_mary.jpg',
        isImagePortrait: false,
        translation: 'bloody-mary',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '40', ingredientId: '8', unit: Unit.ML },
            { amount: '120', ingredientId: '9', unit: Unit.ML },
            { amount: '20', ingredientId: '10', unit: Unit.ML },
            { amount: '10', ingredientId: '3', unit: Unit.ML },
            { amount: '', ingredientId: '11', unit: '' },
            { amount: '', ingredientId: '12', unit: '' },
            { amount: '', ingredientId: '13', unit: '' },
            { amount: '', ingredientId: '14', unit: '' },
            { amount: '', ingredientId: '15', unit: '' }
        ],
        tags: [Tag.IBA, Tag.ContemporaryClassics]
    },
    {
        id: '4',
        imageSrc: 'images/cosmopolitan.jpg',
        isImagePortrait: true,
        translation: 'cosmopolitan',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '8', unit: Unit.ML },
            { amount: '20', ingredientId: '19', unit: Unit.ML },
            { amount: '20', ingredientId: '17', unit: Unit.ML },
            { amount: '15', ingredientId: '2', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.ContemporaryClassics]
    },
    {
        id: '5',
        imageSrc: 'images/margarita.jpg',
        isImagePortrait: true,
        translation: 'margarita',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '40', ingredientId: '18', unit: Unit.ML },
            { amount: '20', ingredientId: '19', unit: Unit.ML },
            { amount: '20', ingredientId: '2', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.ContemporaryClassics]
    },
    {
        id: '6',
        imageSrc: 'images/strawberry_daiquiri.jpg',
        isImagePortrait: false,
        translation: 'frozen-strawberry-daiquiri',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '50', ingredientId: '1', unit: Unit.ML },
            { amount: '30', ingredientId: '2', unit: Unit.ML },
            { amount: '30', ingredientId: '3', unit: Unit.ML },
            { amount: '150', ingredientId: '20', unit: Unit.G }
        ],
        tags: []
    },
    {
        id: '7',
        imageSrc: 'images/amaretto_sour.jpg',
        isImagePortrait: false,
        translation: 'amaretto-sour',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '50', ingredientId: '22', unit: Unit.ML },
            { amount: '30', ingredientId: '10', unit: Unit.ML },
            { amount: '20', ingredientId: '3', unit: Unit.ML },
            { amount: '1', ingredientId: '23', unit: '' }
        ],
        tags: []
    },
    {
        id: '8',
        imageSrc: 'images/moscow_mule.jpg',
        isImagePortrait: false,
        translation: 'moscow-mule',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '40', ingredientId: '8', unit: Unit.ML },
            { amount: '20', ingredientId: '2', unit: Unit.ML },
            { amount: '100', ingredientId: '24', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.ContemporaryClassics]
    },
    {
        id: '9',
        imageSrc: 'images/pina_colada.jpg',
        isImagePortrait: true,
        translation: 'pina-colada',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '1', unit: Unit.ML },
            { amount: '30', ingredientId: '25', unit: Unit.ML },
            { amount: '90', ingredientId: '26', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.ContemporaryClassics]
    },
    {
        id: '10',
        imageSrc: 'images/whiskey_sour.jpg',
        isImagePortrait: false,
        translation: 'whiskey-sour',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '50', ingredientId: '28', unit: Unit.ML },
            { amount: '30', ingredientId: '10', unit: Unit.ML },
            { amount: '20', ingredientId: '3', unit: Unit.ML },
            { amount: '1', ingredientId: '23', unit: '' },
            { amount: '', ingredientId: '27', unit: '' }
        ],
        tags: [Tag.IBA, Tag.TheUnforgettables]
    },
    {
        id: '11',
        imageSrc: 'images/pink_lady.jpg',
        isImagePortrait: false,
        translation: 'pink-lady',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '6', unit: Unit.ML },
            { amount: '20', ingredientId: '19', unit: Unit.ML },
            { amount: '20', ingredientId: '10', unit: Unit.ML },
            { amount: '20', ingredientId: '30', unit: Unit.ML },
            { amount: '1', ingredientId: '23', unit: '' }
        ],
        tags: []
    },
    {
        id: '12',
        imageSrc: 'images/gin_sour.jpg',
        isImagePortrait: false,
        translation: 'gin-sour',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '6', unit: Unit.ML },
            { amount: '30', ingredientId: '10', unit: Unit.ML },
            { amount: '20', ingredientId: '3', unit: Unit.ML },
            { amount: '1', ingredientId: '23', unit: '' }
        ],
        tags: []
    },
    {
        id: '13',
        imageSrc: 'images/dry_martini.jpg',
        isImagePortrait: false,
        translation: 'dry-martini',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '6', unit: Unit.ML },
            { amount: '10', ingredientId: '31', unit: Unit.ML },
            { amount: '', ingredientId: '32', unit: '' }
        ],
        tags: [Tag.IBA, Tag.TheUnforgettables]
    },
    {
        id: '14',
        imageSrc: 'images/hot_shot.jpg',
        isImagePortrait: false,
        translation: 'hot-shot',
        category: DrinkCategory.Shot,
        ingredientGroups: [
            { amount: '20', ingredientId: '33', unit: Unit.ML },
            { amount: '20', ingredientId: '34', unit: Unit.ML },
            { amount: '20', ingredientId: '35', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '15',
        imageSrc: 'images/placeholder.jpg',
        isImagePortrait: false,
        translation: 'frozen-margarita',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '18', unit: Unit.ML },
            { amount: '20', ingredientId: '19', unit: Unit.ML },
            { amount: '30', ingredientId: '2', unit: Unit.ML },
            { amount: '20', ingredientId: '3', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '16',
        imageSrc: 'images/negroni.jpg',
        isImagePortrait: false,
        translation: 'negroni',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '6', unit: Unit.ML },
            { amount: '30', ingredientId: '36', unit: Unit.ML },
            { amount: '30', ingredientId: '37', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.TheUnforgettables]
    },
    {
        id: '17',
        imageSrc: 'images/daiquiri.jpg',
        isImagePortrait: false,
        translation: 'daiquiri',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '1', unit: Unit.ML },
            { amount: '30', ingredientId: '2', unit: Unit.ML },
            { amount: '1', ingredientId: '16', unit: Unit.TBSP }
        ],
        tags: [Tag.IBA, Tag.TheUnforgettables]
    },
    {
        id: '18',
        imageSrc: 'images/after_dinner_cocktail.jpg',
        isImagePortrait: false,
        translation: 'after-dinner-cocktail',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '29', unit: Unit.ML },
            { amount: '30', ingredientId: '38', unit: Unit.ML },
            { amount: '60', ingredientId: '2', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '19',
        imageSrc: 'images/manhattan.jpg',
        isImagePortrait: false,
        translation: 'manhattan',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '37', unit: Unit.ML },
            { amount: '80', ingredientId: '28', unit: Unit.ML },
            { amount: '', ingredientId: '27', unit: '' }
        ],
        tags: [Tag.IBA, Tag.TheUnforgettables]
    },
    {
        id: '20',
        imageSrc: 'images/alabama_slammer.jpg',
        isImagePortrait: false,
        translation: 'alabama-slammer',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '39', unit: Unit.ML },
            { amount: '30', ingredientId: '22', unit: Unit.ML },
            { amount: '20', ingredientId: '40', unit: Unit.ML },
            { amount: '1', ingredientId: '10', unit: Unit.DASH }
        ],
        tags: []
    },
    {
        id: '21',
        imageSrc: 'images/irish_coffee.jpg',
        isImagePortrait: false,
        translation: 'irish-coffee',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '41', unit: Unit.ML },
            { amount: '240', ingredientId: '34', unit: Unit.ML },
            { amount: '1', ingredientId: '42', unit: Unit.TSP },
            { amount: '', ingredientId: '35', unit: '' }
        ],
        tags: [Tag.IBA, Tag.ContemporaryClassics]
    },
    {
        id: '22',
        imageSrc: 'images/black_russian.jpg',
        isImagePortrait: false,
        translation: 'black-russian',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '8', unit: Unit.ML },
            { amount: '30', ingredientId: '43', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.ContemporaryClassics]
    },
    {
        id: '23',
        imageSrc: 'images/blackthorn.jpg',
        isImagePortrait: false,
        translation: 'blackthorn',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '37', unit: Unit.ML },
            { amount: '45', ingredientId: '40', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '24',
        imageSrc: 'images/blue_lagoon.jpg',
        isImagePortrait: false,
        translation: 'blue-lagoon',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '8', unit: Unit.ML },
            { amount: '30', ingredientId: '44', unit: Unit.ML },
            { amount: '120', ingredientId: '45', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '25',
        imageSrc: 'images/blue_margarita.jpg',
        isImagePortrait: false,
        translation: 'blue-margarita',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '18', unit: Unit.ML },
            { amount: '30', ingredientId: '44', unit: Unit.ML },
            { amount: '30', ingredientId: '2', unit: Unit.ML },
            { amount: '', ingredientId: '46', unit: '' }
        ],
        tags: []
    },
    {
        id: '26',
        imageSrc: 'images/alexander.jpg',
        isImagePortrait: false,
        translation: 'alexander',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '6', unit: Unit.ML },
            { amount: '30', ingredientId: '47', unit: Unit.ML },
            { amount: '30', ingredientId: '48', unit: Unit.ML },
            { amount: '', ingredientId: '49', unit: '' }
        ],
        tags: [Tag.IBA, Tag.TheUnforgettables]
    },
    {
        id: '27',
        imageSrc: 'images/brandy_alexander.jpg',
        isImagePortrait: false,
        translation: 'brandy-alexander',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '50', unit: Unit.ML },
            { amount: '30', ingredientId: '47', unit: Unit.ML },
            { amount: '30', ingredientId: '48', unit: Unit.ML },
            { amount: '', ingredientId: '49', unit: '' }
        ],
        tags: []
    },
    {
        id: '28',
        imageSrc: 'images/alfie_cocktail.jpg',
        isImagePortrait: false,
        translation: 'alfie-cocktail',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '51', unit: Unit.ML },
            { amount: '20', ingredientId: '38', unit: Unit.ML },
            { amount: '30', ingredientId: '26', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '29',
        imageSrc: 'images/algonquin.jpg',
        isImagePortrait: false,
        translation: 'algonquin',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '52', unit: Unit.ML },
            { amount: '30', ingredientId: '31', unit: Unit.ML },
            { amount: '30', ingredientId: '26', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '30',
        imageSrc: 'images/allegheny.jpg',
        isImagePortrait: false,
        translation: 'allegheny',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '31', unit: Unit.ML },
            { amount: '30', ingredientId: '28', unit: Unit.ML },
            { amount: '75', ingredientId: '26', unit: Unit.ML },
            { amount: '75', ingredientId: '10', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '31',
        imageSrc: 'images/almeria.jpg',
        isImagePortrait: false,
        translation: 'almeria',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '54', unit: Unit.ML },
            { amount: '30', ingredientId: '55', unit: Unit.ML },
            { amount: '1', ingredientId: '23', unit: '' }
        ],
        tags: []
    },
    {
        id: '32',
        imageSrc: 'images/almond_joy.jpg',
        isImagePortrait: false,
        translation: 'almond-joy',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '22', unit: Unit.ML },
            { amount: '30', ingredientId: '47', unit: Unit.ML },
            { amount: '60', ingredientId: '48', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '33',
        imageSrc: 'images/amaretto_rose.jpg',
        isImagePortrait: false,
        translation: 'amaretto-rose',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '22', unit: Unit.ML },
            { amount: '15', ingredientId: '2', unit: Unit.ML },
            { amount: '120', ingredientId: '4', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '34',
        imageSrc: 'images/balmoral.jpg',
        isImagePortrait: false,
        translation: 'balmoral',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '56', unit: Unit.ML },
            { amount: '15', ingredientId: '37', unit: Unit.ML },
            { amount: '15', ingredientId: '31', unit: Unit.ML },
            { amount: '', ingredientId: '27', unit: '' }
        ],
        tags: []
    },
    {
        id: '35',
        imageSrc: 'images/bermuda_highball.jpg',
        isImagePortrait: false,
        translation: 'bermuda-highball',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '50', unit: Unit.ML },
            { amount: '30', ingredientId: '6', unit: Unit.ML },
            { amount: '30', ingredientId: '31', unit: Unit.ML },
            { amount: '120', ingredientId: '4', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '36',
        imageSrc: 'images/bluebird.jpg',
        isImagePortrait: false,
        translation: 'bluebird',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '6', unit: Unit.ML },
            { amount: '15', ingredientId: '38', unit: Unit.ML },
            { amount: '15', ingredientId: '44', unit: Unit.ML },
            { amount: '', ingredientId: '27', unit: '' }
        ],
        tags: []
    },
    {
        id: '37',
        imageSrc: 'images/boxcar.jpg',
        isImagePortrait: false,
        translation: 'boxcar',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '6', unit: Unit.ML },
            { amount: '30', ingredientId: '38', unit: Unit.ML },
            { amount: '45', ingredientId: '10', unit: Unit.ML },
            { amount: '30', ingredientId: '30', unit: Unit.ML },
            { amount: '1', ingredientId: '23', unit: '' }
        ],
        tags: []
    },
    {
        id: '38',
        imageSrc: 'images/california_lemonade.jpg',
        isImagePortrait: false,
        translation: 'california-lemonade',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '52', unit: Unit.ML },
            { amount: '30', ingredientId: '2', unit: Unit.ML },
            { amount: '30', ingredientId: '10', unit: Unit.ML },
            { amount: '1', ingredientId: '16', unit: Unit.TBSP },
            { amount: '15', ingredientId: '30', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '39',
        imageSrc: 'images/casino_royale.jpg',
        isImagePortrait: false,
        translation: 'casino-royale',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '6', unit: Unit.ML },
            { amount: '15', ingredientId: '10', unit: Unit.ML },
            { amount: '1', ingredientId: '57', unit: Unit.TSP },
            { amount: '', ingredientId: '58', unit: '' },
            { amount: '1', ingredientId: '59', unit: '' }
        ],
        tags: []
    },
    {
        id: '40',
        imageSrc: 'images/champagne_cocktail.jpg',
        isImagePortrait: false,
        translation: 'champagne-cocktail',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '90', ingredientId: '60', unit: Unit.ML },
            { amount: '', ingredientId: '42', unit: '' },
            { amount: '', ingredientId: '27', unit: '' },
            { amount: '15', ingredientId: '61', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.ContemporaryClassics]
    },
    {
        id: '41',
        imageSrc: 'images/chocolate_black_russian.jpg',
        isImagePortrait: false,
        translation: 'chocolate-black-russian',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '55', unit: Unit.ML },
            { amount: '15', ingredientId: '8', unit: Unit.ML },
            { amount: '10', ingredientId: '62', unit: Unit.TBSP }
        ],
        tags: []
    },
    {
        id: '42',
        imageSrc: 'images/city_slicker.jpg',
        isImagePortrait: false,
        translation: 'city-slicker',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '50', unit: Unit.ML },
            { amount: '15', ingredientId: '38', unit: Unit.ML },
            { amount: '1', ingredientId: '10', unit: Unit.TBSP }
        ],
        tags: []
    },
    {
        id: '43',
        imageSrc: 'images/cuba_libre.jpg',
        isImagePortrait: false,
        translation: 'cuba-libre',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '1', unit: Unit.ML },
            { amount: '15', ingredientId: '2', unit: Unit.ML },
            { amount: '120', ingredientId: '63', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.ContemporaryClassics]
    },
    {
        id: '44',
        imageSrc: 'images/foxy_lady.jpg',
        isImagePortrait: false,
        translation: 'foxy-lady',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '15', ingredientId: '22', unit: Unit.ML },
            { amount: '15', ingredientId: '47', unit: Unit.ML },
            { amount: '60', ingredientId: '48', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '45',
        imageSrc: 'images/harvey_wallbanger.jpg',
        isImagePortrait: false,
        translation: 'harvey-wallbanger',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '8', unit: Unit.ML },
            { amount: '15', ingredientId: '33', unit: Unit.ML },
            { amount: '120', ingredientId: '64', unit: Unit.ML }
        ],
        tags: [Tag.FormerIBA]
    },
    {
        id: '46',
        imageSrc: 'images/havana_cocktail.jpg',
        isImagePortrait: false,
        translation: 'havana-cocktail',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '1', unit: Unit.ML },
            { amount: '30', ingredientId: '26', unit: Unit.ML },
            { amount: '1', ingredientId: '10', unit: Unit.TSP }
        ],
        tags: []
    },
    {
        id: '47',
        imageSrc: 'images/jack_rose_cocktail.jpg',
        isImagePortrait: false,
        translation: 'jack-rose-cocktail',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '65', unit: Unit.ML },
            { amount: '1', ingredientId: '30', unit: Unit.TSP },
            { amount: '15', ingredientId: '2', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '48',
        imageSrc: 'images/kamikaze.jpg',
        isImagePortrait: false,
        translation: 'kamikaze',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '8', unit: Unit.ML },
            { amount: '30', ingredientId: '38', unit: Unit.ML },
            { amount: '30', ingredientId: '2', unit: Unit.ML }
        ],
        tags: [Tag.FormerIBA]
    },
    {
        id: '49',
        imageSrc: 'images/mai_tai.jpg',
        isImagePortrait: false,
        translation: 'mai-tai',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '20', ingredientId: '1', unit: Unit.ML },
            { amount: '15', ingredientId: '38', unit: Unit.ML },
            { amount: '15', ingredientId: '66', unit: Unit.ML },
            { amount: '45', ingredientId: '67', unit: Unit.ML },
            { amount: '10', ingredientId: '54', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.ContemporaryClassics]
    },
    {
        id: '50',
        imageSrc: 'images/screwdriver.jpg',
        isImagePortrait: false,
        translation: 'screwdriver',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '8', unit: Unit.ML },
            { amount: '150', ingredientId: '64', unit: Unit.ML }
        ],
        tags: [Tag.FormerIBA]
    },
    {
        id: '51',
        imageSrc: 'images/sloe_gin_cocktail.jpg',
        isImagePortrait: false,
        translation: 'sloe-gin-cocktail',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '40', unit: Unit.ML },
            { amount: '20', ingredientId: '31', unit: Unit.ML },
            { amount: '', ingredientId: '58', unit: '' }
        ],
        tags: []
    },
    {
        id: '52',
        imageSrc: 'images/stone_sour.jpg',
        isImagePortrait: false,
        translation: 'stone-sour',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '29', unit: Unit.ML },
            { amount: '30', ingredientId: '64', unit: Unit.ML },
            { amount: '10', ingredientId: '67', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '53',
        imageSrc: 'images/tequila_sour.jpg',
        isImagePortrait: false,
        translation: 'tequila-sour',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '18', unit: Unit.ML },
            { amount: '60', ingredientId: '10', unit: Unit.ML },
            { amount: '1', ingredientId: '16', unit: Unit.TSP }
        ],
        tags: []
    },
    {
        id: '54',
        imageSrc: 'images/tom_collins.jpg',
        isImagePortrait: false,
        translation: 'tom-collins',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '6', unit: Unit.ML },
            { amount: '30', ingredientId: '10', unit: Unit.ML },
            { amount: '1', ingredientId: '42', unit: Unit.TSP },
            { amount: '90', ingredientId: '4', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '55',
        imageSrc: 'images/valencia_cocktail.jpg',
        isImagePortrait: false,
        translation: 'valencia-cocktail',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '29', unit: Unit.ML },
            { amount: '30', ingredientId: '64', unit: Unit.ML },
            { amount: '', ingredientId: '58', unit: '' }
        ],
        tags: []
    },
    {
        id: '56',
        imageSrc: 'images/vermouth_cassis.jpg',
        isImagePortrait: false,
        translation: 'vermouth-cassis',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '31', unit: Unit.ML },
            { amount: '30', ingredientId: '68', unit: Unit.ML },
            { amount: '90', ingredientId: '4', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '57',
        imageSrc: 'images/sex_on_the_beach.jpg',
        isImagePortrait: false,
        translation: 'sex-on-the-beach',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '8', unit: Unit.ML },
            { amount: '30', ingredientId: '69', unit: Unit.ML },
            { amount: '60', ingredientId: '17', unit: Unit.ML },
            { amount: '60', ingredientId: '70', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.ContemporaryClassics]
    },
    {
        id: '58',
        imageSrc: 'images/tequila_sunrise.jpg',
        isImagePortrait: false,
        translation: 'tequila-sunrise',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '18', unit: Unit.ML },
            { amount: '90', ingredientId: '64', unit: Unit.ML },
            { amount: '15', ingredientId: '30', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.ContemporaryClassics]
    },
    {
        id: '59',
        imageSrc: 'images/mimosa.jpg',
        isImagePortrait: false,
        translation: 'mimosa',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '75', ingredientId: '60', unit: Unit.ML },
            { amount: '75', ingredientId: '64', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.ContemporaryClassics]
    },
    {
        id: '60',
        imageSrc: 'images/dark_and_stormy.jpg',
        isImagePortrait: false,
        translation: 'dark-and-stormy',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '54', unit: Unit.ML },
            { amount: '90', ingredientId: '24', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.NewEraDrinks]
    },
    {
        id: '61',
        imageSrc: 'images/happy_skipper.jpg',
        isImagePortrait: false,
        translation: 'happy-skipper',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '21', unit: Unit.ML },
            { amount: '150', ingredientId: '24', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '62',
        imageSrc: 'images/brave_bull_shooter.jpg',
        isImagePortrait: false,
        translation: 'brave-bull-shooter',
        category: DrinkCategory.Shot,
        ingredientGroups: [
            { amount: '15', ingredientId: '18', unit: Unit.ML },
            { amount: '15', ingredientId: '11', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '63',
        imageSrc: 'images/at&t.jpg',
        isImagePortrait: false,
        translation: 'at&t',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '8', unit: Unit.ML },
            { amount: '30', ingredientId: '6', unit: Unit.ML },
            { amount: '120', ingredientId: '7', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '64',
        imageSrc: 'images/belgian_blue.jpg',
        isImagePortrait: false,
        translation: 'belgian-blue',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '20', ingredientId: '8', unit: Unit.ML },
            { amount: '10', ingredientId: '71', unit: Unit.ML },
            { amount: '10', ingredientId: '44', unit: Unit.ML },
            { amount: '10', ingredientId: '45', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '65',
        imageSrc: 'images/grand_blue.jpg',
        isImagePortrait: false,
        translation: 'grand-blue',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '15', ingredientId: '72', unit: Unit.ML },
            { amount: '15', ingredientId: '69', unit: Unit.ML },
            { amount: '15', ingredientId: '44', unit: Unit.ML },
            { amount: '30', ingredientId: '67', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '66',
        imageSrc: 'images/americano.jpg',
        isImagePortrait: false,
        translation: 'americano',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '36', unit: Unit.ML },
            { amount: '30', ingredientId: '37', unit: Unit.ML },
            { amount: '1', ingredientId: '4', unit: Unit.SPLASH }
        ],
        tags: [Tag.IBA, Tag.TheUnforgettables]
    },
    {
        id: '67',
        imageSrc: 'images/campari_beer.jpg',
        isImagePortrait: false,
        translation: 'campari-beer',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '15', ingredientId: '36', unit: Unit.ML },
            { amount: '330', ingredientId: '73', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '68',
        imageSrc: 'images/moranguito.jpg',
        isImagePortrait: false,
        translation: 'moranguito',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '20', ingredientId: '74', unit: Unit.ML },
            { amount: '20', ingredientId: '18', unit: Unit.ML },
            { amount: '10', ingredientId: '30', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '69',
        imageSrc: 'images/swedish_blueberry_shot.jpg',
        isImagePortrait: false,
        translation: 'swedish-blueberry-shot',
        category: DrinkCategory.Shot,
        ingredientGroups: [
            { amount: '20', ingredientId: '75', unit: Unit.ML },
            { amount: '20', ingredientId: '76', unit: Unit.ML },
            { amount: '20', ingredientId: '35', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '70',
        imageSrc: 'images/pink_panther.jpg',
        isImagePortrait: true,
        translation: 'pink-panther',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '20', ingredientId: '8', unit: Unit.ML },
            { amount: '20', ingredientId: '75', unit: Unit.ML },
            { amount: '15', ingredientId: '30', unit: Unit.ML },
            { amount: '120', ingredientId: '77', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '71',
        imageSrc: 'images/arizona_antifreeze.jpg',
        isImagePortrait: false,
        translation: 'arizona-antifreeze',
        category: DrinkCategory.Shot,
        ingredientGroups: [
            { amount: '10', ingredientId: '8', unit: Unit.ML },
            { amount: '10', ingredientId: '78', unit: Unit.ML },
            { amount: '10', ingredientId: '67', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '72',
        imageSrc: 'images/gt_blue.jpg',
        isImagePortrait: false,
        translation: 'gt-blue',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '6', unit: Unit.ML },
            { amount: '15', ingredientId: '44', unit: Unit.ML },
            { amount: '120', ingredientId: '7', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '73',
        imageSrc: 'images/melon_sour.jpg',
        isImagePortrait: false,
        translation: 'melon-sour',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '78', unit: Unit.ML },
            { amount: '30', ingredientId: '10', unit: Unit.ML },
            { amount: '15', ingredientId: '3', unit: Unit.ML },
            { amount: '1', ingredientId: '23', unit: '' }
        ],
        tags: []
    },
    {
        id: '74',
        imageSrc: 'images/zorbatini.jpg',
        isImagePortrait: false,
        translation: 'zorbatini',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '40', ingredientId: '8', unit: Unit.ML },
            { amount: '10', ingredientId: '79', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '75',
        imageSrc: 'images/ruby_tuesday.jpg',
        isImagePortrait: false,
        translation: 'ruby-tuesday',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '6', unit: Unit.ML },
            { amount: '150', ingredientId: '17', unit: Unit.ML },
            { amount: '15', ingredientId: '30', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '76',
        imageSrc: 'images/espresso_martini.jpg',
        isImagePortrait: false,
        translation: 'espresso-martini',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '8', unit: Unit.ML },
            { amount: '30', ingredientId: '55', unit: Unit.ML },
            { amount: '15', ingredientId: '3', unit: Unit.ML },
            { amount: '1', ingredientId: '128', unit: '' }
        ],
        tags: [Tag.IBA, Tag.NewEraDrinks]
    },
    {
        id: '77',
        imageSrc: 'images/english_highball.jpg',
        isImagePortrait: false,
        translation: 'english-highball',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '20', ingredientId: '50', unit: Unit.ML },
            { amount: '20', ingredientId: '6', unit: Unit.ML },
            { amount: '20', ingredientId: '37', unit: Unit.ML },
            { amount: '120', ingredientId: '4', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '78',
        imageSrc: 'images/english_rose_cocktail.jpg',
        isImagePortrait: false,
        translation: 'english-rose-cocktail',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '20', ingredientId: '29', unit: Unit.ML },
            { amount: '40', ingredientId: '6', unit: Unit.ML },
            { amount: '20', ingredientId: '31', unit: Unit.ML },
            { amount: '30', ingredientId: '30', unit: Unit.ML },
            { amount: '15', ingredientId: '2', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '79',
        imageSrc: 'images/imperial_cocktail.jpg',
        isImagePortrait: false,
        translation: 'imperial-cocktail',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '40', ingredientId: '2', unit: Unit.ML },
            { amount: '20', ingredientId: '6', unit: Unit.ML },
            { amount: '40', ingredientId: '80', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '80',
        imageSrc: 'images/irish_spring.jpg',
        isImagePortrait: false,
        translation: 'irish-spring',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '41', unit: Unit.ML },
            { amount: '15', ingredientId: '81', unit: Unit.ML },
            { amount: '30', ingredientId: '64', unit: Unit.ML },
            { amount: '30', ingredientId: '67', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '81',
        imageSrc: 'images/kiwi_martini.jpg',
        isImagePortrait: false,
        translation: 'kiwi-martini',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '1', ingredientId: '82', unit: '' },
            { amount: '1', ingredientId: '3', unit: Unit.TSP },
            { amount: '45', ingredientId: '8', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '82',
        imageSrc: 'images/lazy_coconut_paloma.jpg',
        isImagePortrait: false,
        translation: 'lazy-coconut-paloma',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '71', unit: Unit.ML },
            { amount: '75', ingredientId: '70', unit: Unit.ML },
            { amount: '60', ingredientId: '4', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '83',
        imageSrc: 'images/lemon_elderflower_spritzer.jpg',
        isImagePortrait: false,
        translation: 'lemon-elderflower-spritzer',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '2', ingredientId: '83', unit: Unit.TSP },
            { amount: '60', ingredientId: '8', unit: Unit.ML },
            { amount: '75', ingredientId: '4', unit: Unit.ML },
            { amount: '15', ingredientId: '10', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '84',
        imageSrc: 'images/orange_crush.jpg',
        isImagePortrait: false,
        translation: 'orange-crush',
        category: DrinkCategory.Shot,
        ingredientGroups: [
            { amount: '30', ingredientId: '8', unit: Unit.ML },
            { amount: '30', ingredientId: '38', unit: Unit.ML },
            { amount: '30', ingredientId: '64', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '85',
        imageSrc: 'images/mountain_bramble.jpg',
        isImagePortrait: false,
        translation: 'mountain-bramble',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '6', unit: Unit.ML },
            { amount: '20', ingredientId: '10', unit: Unit.ML },
            { amount: '20', ingredientId: '3', unit: Unit.ML },
            { amount: '', ingredientId: '84', unit: '' },
            { amount: '120', ingredientId: '4', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '86',
        imageSrc: 'images/gin_swizzle.jpg',
        isImagePortrait: false,
        translation: 'gin-swizzle',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '40', ingredientId: '2', unit: Unit.ML },
            { amount: '60', ingredientId: '6', unit: Unit.ML },
            { amount: '1', ingredientId: '42', unit: Unit.TSP },
            { amount: '', ingredientId: '27', unit: '' },
            { amount: '90', ingredientId: '4', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '87',
        imageSrc: 'images/cocktail_horses_neck.jpg',
        isImagePortrait: false,
        translation: 'cocktail-horses-neck',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '40', ingredientId: '61', unit: Unit.ML },
            { amount: '100', ingredientId: '24', unit: Unit.ML },
            { amount: '', ingredientId: '27', unit: '' }
        ],
        tags: [Tag.IBA, Tag.ContemporaryClassics]
    },
    {
        id: '88',
        imageSrc: 'images/vodka_tonic.jpg',
        isImagePortrait: false,
        translation: 'vodka-tonic',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '40', ingredientId: '8', unit: Unit.ML },
            { amount: '100', ingredientId: '7', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '89',
        imageSrc: 'images/bombay_cassis.jpg',
        isImagePortrait: false,
        translation: 'bombay-cassis',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '50', ingredientId: '6', unit: Unit.ML },
            { amount: '20', ingredientId: '68', unit: Unit.ML },
            { amount: '15', ingredientId: '2', unit: Unit.ML },
            { amount: '75', ingredientId: '24', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '90',
        imageSrc: 'images/pegu_club.jpg',
        isImagePortrait: false,
        translation: 'pegu-club',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '40', ingredientId: '6', unit: Unit.ML },
            { amount: '20', ingredientId: '85', unit: Unit.ML },
            { amount: '20', ingredientId: '2', unit: Unit.ML },
            { amount: '', ingredientId: '27', unit: '' },
            { amount: '', ingredientId: '58', unit: '' }
        ],
        tags: []
    },
    {
        id: '91',
        imageSrc: 'images/greyhound.jpg',
        isImagePortrait: false,
        translation: 'greyhound',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '40', ingredientId: '8', unit: Unit.ML },
            { amount: '90', ingredientId: '70', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '92',
        imageSrc: 'images/gimlet.jpg',
        isImagePortrait: false,
        translation: 'gimlet',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '6', unit: Unit.ML },
            { amount: '20', ingredientId: '2', unit: Unit.ML },
            { amount: '20', ingredientId: '3', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '93',
        imageSrc: 'images/a_furlong_too_late.jpg',
        isImagePortrait: false,
        translation: 'a-furlong-too-late',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '1', unit: Unit.ML },
            { amount: '120', ingredientId: '24', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '94',
        imageSrc: 'images/spritz_veneziano.jpg',
        isImagePortrait: false,
        translation: 'spritz-veneziano',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '86', unit: Unit.ML },
            { amount: '40', ingredientId: '80', unit: Unit.ML },
            { amount: '120', ingredientId: '4', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.NewEraDrinks]
    },
    {
        id: '95',
        imageSrc: 'images/amaretto_fizz.jpg',
        isImagePortrait: false,
        translation: 'amaretto-fizz',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '40', ingredientId: '22', unit: Unit.ML },
            { amount: '60', ingredientId: '64', unit: Unit.ML },
            { amount: '150', ingredientId: '87', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '96',
        imageSrc: 'images/aperol_spritz.jpg',
        isImagePortrait: false,
        translation: 'aperol-spritz',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '100', ingredientId: '80', unit: Unit.ML },
            { amount: '150', ingredientId: '86', unit: Unit.ML },
            { amount: '240', ingredientId: '4', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.NewEraDrinks]
    },
    {
        id: '97',
        imageSrc: 'images/the_philosopher.jpg',
        isImagePortrait: false,
        translation: 'the-philosopher',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '40', ingredientId: '6', unit: Unit.ML },
            { amount: '40', ingredientId: '78', unit: Unit.ML },
            { amount: '', ingredientId: '58', unit: '' },
            { amount: '20', ingredientId: '10', unit: Unit.ML },
            { amount: '120', ingredientId: '86', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '98',
        imageSrc: 'images/bounty_hunter.jpg',
        isImagePortrait: false,
        translation: 'bounty-hunter',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '40', ingredientId: '54', unit: Unit.ML },
            { amount: '40', ingredientId: '71', unit: Unit.ML },
            { amount: '60', ingredientId: '26', unit: Unit.ML },
            { amount: '120', ingredientId: '86', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '99',
        imageSrc: 'images/blueberry_mojito.jpg',
        isImagePortrait: false,
        translation: 'blueberry-mojito',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '54', unit: Unit.ML },
            { amount: '30', ingredientId: '2', unit: Unit.ML },
            { amount: '', ingredientId: '42', unit: '' },
            { amount: '120', ingredientId: '45', unit: Unit.ML },
            { amount: '', ingredientId: '88', unit: '' }
        ],
        tags: []
    },
    {
        id: '100',
        imageSrc: 'images/autumn_garibaldi.jpg',
        isImagePortrait: false,
        translation: 'autumn-garibaldi',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '36', unit: Unit.ML },
            { amount: '75', ingredientId: '64', unit: Unit.ML },
            { amount: '75', ingredientId: '24', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '101',
        imageSrc: 'images/simple_long_island_ice_tea.jpg',
        isImagePortrait: false,
        translation: 'simple-long-island-ice-tea',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '15', ingredientId: '8', unit: Unit.ML },
            { amount: '15', ingredientId: '18', unit: Unit.ML },
            { amount: '15', ingredientId: '1', unit: Unit.ML },
            { amount: '15', ingredientId: '6', unit: Unit.ML },
            { amount: '120', ingredientId: '63', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '102',
        imageSrc: 'images/white_russian.jpg',
        isImagePortrait: false,
        translation: 'white-russian',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '8', unit: Unit.ML },
            { amount: '45', ingredientId: '43', unit: Unit.ML },
            { amount: '45', ingredientId: '48', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '103',
        imageSrc: 'images/mezcal_old_fashioned.jpg',
        isImagePortrait: true,
        translation: 'mezcal-old-fashioned',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '18', unit: Unit.ML },
            { amount: '15', ingredientId: '90', unit: Unit.ML },
            { amount: '7.5', ingredientId: '89', unit: Unit.ML },
            { amount: '', ingredientId: '27', unit: '' }
        ],
        tags: []
    },
    {
        id: '104',
        imageSrc: 'images/old_fashioned.jpg',
        isImagePortrait: false,
        translation: 'old-fashioned',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '28', unit: Unit.ML },
            { amount: '5', ingredientId: '27', unit: Unit.DASH },
            { amount: '', ingredientId: '42', unit: '' },
            { amount: '3', ingredientId: '91', unit: Unit.DASH }
        ],
        tags: [Tag.IBA, Tag.TheUnforgettables]
    },
    {
        id: '105',
        imageSrc: 'images/sidecar.jpg',
        isImagePortrait: false,
        translation: 'sidecar',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '61', unit: Unit.ML },
            { amount: '15', ingredientId: '92', unit: Unit.ML },
            { amount: '30', ingredientId: '10', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.TheUnforgettables]
    },
    {
        id: '106',
        imageSrc: 'images/french75.jpg',
        isImagePortrait: false,
        translation: 'french-75',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '6', unit: Unit.ML },
            { amount: '2', ingredientId: '42', unit: Unit.TSP },
            { amount: '45', ingredientId: '10', unit: Unit.ML },
            { amount: '120', ingredientId: '60', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.ContemporaryClassics]
    },
    {
        id: '107',
        imageSrc: 'images/mint_julep.jpg',
        isImagePortrait: false,
        translation: 'mint-julep',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '4', ingredientId: '5', unit: '' },
            { amount: '75', ingredientId: '28', unit: Unit.ML },
            { amount: '1', ingredientId: '16', unit: Unit.TSP },
            { amount: '2', ingredientId: '91', unit: Unit.TSP }
        ],
        tags: [Tag.IBA, Tag.ContemporaryClassics]
    },
    {
        id: '108',
        imageSrc: 'images/pisco_sour.jpg',
        isImagePortrait: false,
        translation: 'pisco-sour',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '93', unit: Unit.ML },
            { amount: '30', ingredientId: '10', unit: Unit.ML },
            { amount: '1.5', ingredientId: '42', unit: Unit.TSP },
            { amount: '1', ingredientId: '23', unit: '' }
        ],
        tags: [Tag.IBA, Tag.ContemporaryClassics]
    },
    {
        id: '109',
        imageSrc: 'images/aquafaba_gin_fizz.png',
        isImagePortrait: false,
        translation: 'aquafaba-gin-fizz',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '15', ingredientId: '94', unit: Unit.ML },
            { amount: '25', ingredientId: '2', unit: Unit.ML },
            { amount: '50', ingredientId: '6', unit: Unit.ML },
            { amount: '30', ingredientId: '3', unit: Unit.ML },
            { amount: '20', ingredientId: '4', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '110',
        imageSrc: 'images/bellini.jpg',
        isImagePortrait: false,
        translation: 'bellini',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '180', ingredientId: '60', unit: Unit.ML },
            { amount: '30', ingredientId: '69', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.ContemporaryClassics]
    },
    {
        id: '111',
        imageSrc: 'images/mango_mojito.jpg',
        isImagePortrait: false,
        translation: 'mango-mojito',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '2', unit: Unit.ML },
            { amount: '1', ingredientId: '95', unit: '' },
            { amount: '', ingredientId: '5', unit: '' },
            { amount: '30', ingredientId: '1', unit: Unit.ML },
            { amount: '120', ingredientId: '4', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '112',
        imageSrc: 'images/pornstar_martini.jpg',
        isImagePortrait: false,
        translation: 'pornstar-martini',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '8', unit: Unit.ML },
            { amount: '30', ingredientId: '96', unit: Unit.ML },
            { amount: '20', ingredientId: '2', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '113',
        imageSrc: 'images/pink_moon.jpg',
        isImagePortrait: false,
        translation: 'pink-moon',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '6', unit: Unit.ML },
            { amount: '30', ingredientId: '71', unit: Unit.ML },
            { amount: '25', ingredientId: '83', unit: Unit.ML },
            { amount: '30', ingredientId: '2', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '114',
        imageSrc: 'images/simple_syrup.jpg',
        isImagePortrait: false,
        translation: 'simple-syrup',
        category: DrinkCategory.Ingredient,
        ingredientGroups: [
            { amount: '2.5', ingredientId: '91', unit: Unit.DL },
            { amount: '2.5', ingredientId: '42', unit: Unit.DL }
        ],
        tags: []
    },
    {
        id: '115',
        imageSrc: 'images/sweet_and_sour.jpg',
        isImagePortrait: false,
        translation: 'sweet-and-sour',
        category: DrinkCategory.Ingredient,
        ingredientGroups: [
            { amount: '2.5', ingredientId: '3', unit: Unit.DL },
            { amount: '1.25', ingredientId: '2', unit: Unit.DL },
            { amount: '1.25', ingredientId: '10', unit: Unit.DL }
        ],
        tags: []
    },
    {
        id: '116',
        imageSrc: 'images/afterglow.jpg',
        isImagePortrait: false,
        translation: 'afterglow',
        category: DrinkCategory.Mocktail,
        ingredientGroups: [
            { amount: '20', ingredientId: '30', unit: Unit.ML },
            { amount: '80', ingredientId: '64', unit: Unit.ML },
            { amount: '80', ingredientId: '26', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '117',
        imageSrc: 'images/alice_cocktail.jpg',
        isImagePortrait: false,
        translation: 'alice-cocktail',
        category: DrinkCategory.Mocktail,
        ingredientGroups: [
            { amount: '10', ingredientId: '30', unit: Unit.ML },
            { amount: '10', ingredientId: '64', unit: Unit.ML },
            { amount: '20', ingredientId: '26', unit: Unit.ML },
            { amount: '40', ingredientId: '35', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '118',
        imageSrc: 'images/apple_karate.jpg',
        isImagePortrait: false,
        translation: 'apple-karate',
        category: DrinkCategory.Mocktail,
        ingredientGroups: [
            { amount: '5', ingredientId: '97', unit: Unit.DL },
            { amount: '1', ingredientId: '98', unit: '' }
        ],
        tags: []
    },
    {
        id: '119',
        imageSrc: 'images/orangeade.jpg',
        isImagePortrait: false,
        translation: 'orangeade',
        category: DrinkCategory.Mocktail,
        ingredientGroups: [
            { amount: '50', ingredientId: '10', unit: Unit.ML },
            { amount: '150', ingredientId: '64', unit: Unit.ML },
            { amount: '30', ingredientId: '3', unit: Unit.ML },
            { amount: '', ingredientId: '4', unit: '' }
        ],
        tags: []
    },
    {
        id: '120',
        imageSrc: 'images/banana_milk_shake.jpg',
        isImagePortrait: false,
        translation: 'banana-milk-shake',
        category: DrinkCategory.Mocktail,
        ingredientGroups: [
            { amount: '100', ingredientId: '77', unit: Unit.ML },
            { amount: '40', ingredientId: '64', unit: Unit.ML },
            { amount: '10', ingredientId: '3', unit: Unit.ML },
            { amount: '0.5', ingredientId: '99', unit: '' }
        ],
        tags: []
    },
    {
        id: '121',
        imageSrc: 'images/absolut_limousine.jpg',
        isImagePortrait: false,
        translation: 'absolut-limousine',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '51', unit: Unit.ML },
            { amount: '15', ingredientId: '2', unit: Unit.ML },
            { amount: '120', ingredientId: '7', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '122',
        imageSrc: 'images/zizi_coin-coin.jpg',
        isImagePortrait: false,
        translation: 'zizi-coin-coin',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '50', ingredientId: '92', unit: Unit.ML },
            { amount: '20', ingredientId: '10', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '123',
        imageSrc: 'images/cream_soda.jpg',
        isImagePortrait: false,
        translation: 'cream-soda',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '21', unit: Unit.ML },
            { amount: '120', ingredientId: '24', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '124',
        imageSrc: 'images/caipirinha.jpg',
        isImagePortrait: false,
        translation: 'caipirinha',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '2', ingredientId: '42', unit: Unit.TSP },
            { amount: '30', ingredientId: '2', unit: Unit.ML },
            { amount: '75', ingredientId: '100', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.ContemporaryClassics]
    },
    {
        id: '125',
        imageSrc: 'images/elderflower_caipirinha.jpg',
        isImagePortrait: false,
        translation: 'elderflower-caipirinha',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '100', unit: Unit.ML },
            { amount: '30', ingredientId: '2', unit: Unit.ML },
            { amount: '30', ingredientId: '83', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '126',
        imageSrc: 'images/california_root_beer.jpg',
        isImagePortrait: false,
        translation: 'california-root-beer',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '55', unit: Unit.ML },
            { amount: '30', ingredientId: '33', unit: Unit.ML },
            { amount: '120', ingredientId: '63', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '127',
        imageSrc: 'images/sangria.jpg',
        isImagePortrait: false,
        translation: 'sangria',
        category: DrinkCategory.Other,
        ingredientGroups: [
            { amount: '7.5', ingredientId: '101', unit: Unit.DL },
            { amount: '1.25', ingredientId: '42', unit: Unit.DL },
            { amount: '2.5', ingredientId: '64', unit: Unit.DL },
            { amount: '2.5', ingredientId: '10', unit: Unit.DL },
            { amount: '', ingredientId: '102', unit: '' },
            { amount: '', ingredientId: '103', unit: '' }
        ],
        tags: [Tag.Punch]
    },
    {
        id: '128',
        imageSrc: 'images/white_wine_sangria.jpg',
        isImagePortrait: false,
        translation: 'white-sangria',
        category: DrinkCategory.Other,
        ingredientGroups: [
            { amount: '7.5', ingredientId: '87', unit: Unit.DL },
            { amount: '120', ingredientId: '65', unit: Unit.ML },
            { amount: '120', ingredientId: '4', unit: Unit.ML },
            { amount: '150', ingredientId: '20', unit: Unit.G },
            { amount: '1', ingredientId: '104', unit: '' },
            { amount: '1', ingredientId: '105', unit: '' },
            { amount: '1', ingredientId: '106', unit: '' }
        ],
        tags: [Tag.Punch]
    },
    {
        id: '129',
        imageSrc: 'images/french_martini.jpg',
        isImagePortrait: false,
        translation: 'french-martini',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '8', unit: Unit.ML },
            { amount: '15', ingredientId: '107', unit: Unit.ML },
            { amount: '15', ingredientId: '26', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.NewEraDrinks]
    },
    {
        id: '130',
        imageSrc: 'images/russian_spring_punch.jpg',
        isImagePortrait: false,
        translation: 'russian-spring-punch',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '8', unit: Unit.ML },
            { amount: '15', ingredientId: '68', unit: Unit.ML },
            { amount: '10', ingredientId: '3', unit: Unit.ML },
            { amount: '30', ingredientId: '10', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.NewEraDrinks]
    },
    {
        id: '131',
        imageSrc: 'images/b_52.jpg',
        isImagePortrait: false,
        translation: 'b-52',
        category: DrinkCategory.Shot,
        ingredientGroups: [
            { amount: '15', ingredientId: '55', unit: Unit.ML },
            { amount: '15', ingredientId: '108', unit: Unit.ML },
            { amount: '15', ingredientId: '109', unit: Unit.ML }
        ],
        tags: [Tag.FormerIBA]
    },
    {
        id: '132',
        imageSrc: 'images/barracuda.png',
        isImagePortrait: true,
        translation: 'barracuda',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '110', unit: Unit.ML },
            { amount: '15', ingredientId: '33', unit: Unit.ML },
            { amount: '60', ingredientId: '26', unit: Unit.ML },
            { amount: '1', ingredientId: '2', unit: Unit.DASH },
            { amount: '120', ingredientId: '86', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.NewEraDrinks]
    },
    {
        id: '133',
        imageSrc: 'images/bramble.jpg',
        isImagePortrait: false,
        translation: 'bramble',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '50', ingredientId: '6', unit: Unit.ML },
            { amount: '25', ingredientId: '10', unit: Unit.ML },
            { amount: '15', ingredientId: '3', unit: Unit.ML },
            { amount: '15', ingredientId: '111', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.NewEraDrinks]
    },
    {
        id: '134',
        imageSrc: 'images/vampiro.jpg',
        isImagePortrait: false,
        translation: 'vampiro',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '18', unit: Unit.ML },
            { amount: '30', ingredientId: '9', unit: Unit.ML },
            { amount: '30', ingredientId: '64', unit: Unit.ML },
            { amount: '15', ingredientId: '2', unit: Unit.ML },
            { amount: '1', ingredientId: '3', unit: Unit.DASH },
            { amount: '', ingredientId: '46', unit: '' }
        ],
        tags: [Tag.FormerIBA]
    },
    {
        id: '135',
        imageSrc: 'images/yellow_bird.jpg',
        isImagePortrait: false,
        translation: 'yellow-bird',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '1', unit: Unit.ML },
            { amount: '15', ingredientId: '33', unit: Unit.ML },
            { amount: '15', ingredientId: '38', unit: Unit.ML },
            { amount: '15', ingredientId: '2', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.NewEraDrinks]
    },
    {
        id: '136',
        imageSrc: 'images/tommys_margarita.jpg',
        isImagePortrait: false,
        translation: `tommys-margarita`,
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '18', unit: Unit.ML },
            { amount: '30', ingredientId: '2', unit: Unit.ML },
            { amount: '30', ingredientId: '89', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.NewEraDrinks]
    },
    {
        id: '137',
        imageSrc: 'images/hemingway_special.jpg',
        isImagePortrait: false,
        translation: `hemingway-special`,
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '1', unit: Unit.ML },
            { amount: '45', ingredientId: '70', unit: Unit.ML },
            { amount: '15', ingredientId: '57', unit: Unit.ML },
            { amount: '15', ingredientId: '2', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.ContemporaryClassics]
    },
    {
        id: '138',
        imageSrc: 'images/gin_fizz.jpg',
        isImagePortrait: false,
        translation: `gin-fizz`,
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '6', unit: Unit.ML },
            { amount: '30', ingredientId: '10', unit: Unit.ML },
            { amount: '15', ingredientId: '3', unit: Unit.ML },
            { amount: '1', ingredientId: '4', unit: Unit.SPLASH }
        ],
        tags: [Tag.IBA, Tag.TheUnforgettables]
    },
    {
        id: '139',
        imageSrc: 'images/last_word.jpg',
        isImagePortrait: false,
        translation: `last-word`,
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '25', ingredientId: '6', unit: Unit.ML },
            { amount: '25', ingredientId: '57', unit: Unit.ML },
            { amount: '25', ingredientId: '112', unit: Unit.ML },
            { amount: '25', ingredientId: '2', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.TheUnforgettables]
    },
    {
        id: '140',
        imageSrc: 'images/new_york_sour.jpg',
        isImagePortrait: false,
        translation: `new-york-sour`,
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '28', unit: Unit.ML },
            { amount: '25', ingredientId: '3', unit: Unit.ML },
            { amount: '30', ingredientId: '10', unit: Unit.ML },
            { amount: '15', ingredientId: '101', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.NewEraDrinks]
    },
    {
        id: '141',
        imageSrc: 'images/paradise.jpg',
        isImagePortrait: false,
        translation: `paradise`,
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '6', unit: Unit.ML },
            { amount: '25', ingredientId: '29', unit: Unit.ML },
            { amount: '15', ingredientId: '64', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.TheUnforgettables]
    },
    {
        id: '142',
        imageSrc: 'images/porto_flip.jpg',
        isImagePortrait: false,
        translation: `porto-flip`,
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '15', ingredientId: '50', unit: Unit.ML },
            { amount: '45', ingredientId: '113', unit: Unit.ML },
            { amount: '1', ingredientId: '59', unit: Unit.None }
        ],
        tags: [Tag.IBA, Tag.TheUnforgettables]
    },
    {
        id: '143',
        imageSrc: 'images/sea_breeze.jpg',
        isImagePortrait: false,
        translation: `sea-breeze`,
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '8', unit: Unit.ML },
            { amount: '120', ingredientId: '17', unit: Unit.ML },
            { amount: '30', ingredientId: '70', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.ContemporaryClassics]
    },
    {
        id: '144',
        imageSrc: 'images/tipperary.jpg',
        isImagePortrait: false,
        translation: `tipperary`,
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '41', unit: Unit.ML },
            { amount: '30', ingredientId: '37', unit: Unit.ML },
            { amount: '15', ingredientId: '112', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.NewEraDrinks]
    },
    {
        id: '145',
        imageSrc: 'images/bees_knees.jpg',
        isImagePortrait: false,
        translation: `bees-knees`,
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '6', unit: Unit.ML },
            { amount: '2', ingredientId: '115', unit: Unit.TSP },
            { amount: '25', ingredientId: '10', unit: Unit.ML },
            { amount: '25', ingredientId: '64', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.NewEraDrinks]
    },
    {
        id: '146',
        imageSrc: 'images/boulevardier.jpg',
        isImagePortrait: false,
        translation: `boulevardier`,
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '36', unit: Unit.ML },
            { amount: '30', ingredientId: '37', unit: Unit.ML },
            { amount: '45', ingredientId: '28', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.TheUnforgettables]
    },
    {
        id: '147',
        imageSrc: 'images/casino.jpg',
        isImagePortrait: false,
        translation: `casino`,
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '6', unit: Unit.ML },
            { amount: '15', ingredientId: '57', unit: Unit.ML },
            { amount: '15', ingredientId: '10', unit: Unit.ML },
            { amount: '2', ingredientId: '58', unit: Unit.DASH }
        ],
        tags: [Tag.IBA, Tag.TheUnforgettables]
    },
    {
        id: '148',
        imageSrc: 'images/paper_plane.jpg',
        isImagePortrait: false,
        translation: 'paper-plane',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '28', unit: Unit.ML },
            { amount: '30', ingredientId: '116', unit: Unit.ML },
            { amount: '30', ingredientId: '80', unit: Unit.ML },
            { amount: '30', ingredientId: '10', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.NewEraDrinks]
    },
    {
        id: '149',
        imageSrc: 'images/long_island_ice_tea.jpg',
        isImagePortrait: false,
        translation: 'long-island-ice-tea',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '15', ingredientId: '8', unit: Unit.ML },
            { amount: '15', ingredientId: '18', unit: Unit.ML },
            { amount: '15', ingredientId: '1', unit: Unit.ML },
            { amount: '15', ingredientId: '6', unit: Unit.ML },
            { amount: '15', ingredientId: '92', unit: Unit.ML },
            { amount: '30', ingredientId: '10', unit: Unit.ML },
            { amount: '20', ingredientId: '3', unit: Unit.ML },
            { amount: '90', ingredientId: '63', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.ContemporaryClassics]
    },
    {
        id: '150',
        imageSrc: 'images/golden_dream.jpg',
        isImagePortrait: false,
        translation: 'golden-dream',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '20', ingredientId: '33', unit: Unit.ML },
            { amount: '20', ingredientId: '38', unit: Unit.ML },
            { amount: '20', ingredientId: '64', unit: Unit.ML },
            { amount: '10', ingredientId: '35', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.ContemporaryClassics]
    },
    {
        id: '151',
        imageSrc: 'images/martinez.jpg',
        isImagePortrait: false,
        translation: 'martinez',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '6', unit: Unit.ML },
            { amount: '45', ingredientId: '37', unit: Unit.ML },
            { amount: '1', ingredientId: '57', unit: Unit.TSP },
            { amount: '2', ingredientId: '58', unit: Unit.DASH }
        ],
        tags: [Tag.IBA, Tag.TheUnforgettables]
    },
    {
        id: '152',
        imageSrc: 'images/monkey_gland.jpg',
        isImagePortrait: false,
        translation: 'monkey-gland',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '6', unit: Unit.ML },
            { amount: '45', ingredientId: '64', unit: Unit.ML },
            { amount: '1', ingredientId: '74', unit: Unit.TSP },
            { amount: '1', ingredientId: '30', unit: Unit.TSP }
        ],
        tags: [Tag.IBA, Tag.TheUnforgettables]
    },
    {
        id: '153',
        imageSrc: 'images/penicillin.jpg',
        isImagePortrait: false,
        translation: 'penicillin',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '52', unit: Unit.ML },
            { amount: '7.5', ingredientId: '117', unit: Unit.ML },
            { amount: '22.5', ingredientId: '10', unit: Unit.ML },
            { amount: '22.5', ingredientId: '115', unit: Unit.ML },
            { amount: '2', ingredientId: '118', unit: Unit.SLICE }
        ],
        tags: [Tag.IBA, Tag.NewEraDrinks]
    },
    {
        id: '154',
        imageSrc: 'images/grasshopper.jpg',
        isImagePortrait: false,
        translation: 'grasshopper',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '20', ingredientId: '47', unit: Unit.ML },
            { amount: '20', ingredientId: '119', unit: Unit.ML },
            { amount: '20', ingredientId: '35', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.ContemporaryClassics, Tag.Halloween]
    },
    {
        id: '155',
        imageSrc: 'images/mary_pickford.jpg',
        isImagePortrait: false,
        translation: 'mary-pickford',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '1', unit: Unit.ML },
            { amount: '45', ingredientId: '26', unit: Unit.ML },
            { amount: '7.5', ingredientId: '57', unit: Unit.ML },
            { amount: '1', ingredientId: '30', unit: Unit.TSP }
        ],
        tags: [Tag.IBA, Tag.TheUnforgettables]
    },
    {
        id: '156',
        imageSrc: 'images/stinger.jpg',
        isImagePortrait: false,
        translation: 'stinger',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '50', ingredientId: '61', unit: Unit.ML },
            { amount: '20', ingredientId: '120', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.TheUnforgettables]
    },
    {
        id: '157',
        imageSrc: 'images/tuxedo.jpg',
        isImagePortrait: false,
        translation: 'tuxedo',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '6', unit: Unit.ML },
            { amount: '30', ingredientId: '31', unit: Unit.ML },
            { amount: '0.5', ingredientId: '57', unit: Unit.TSP },
            { amount: '0.25', ingredientId: '74', unit: Unit.TSP },
            { amount: '3', ingredientId: '58', unit: Unit.DASH }
        ],
        tags: [Tag.IBA, Tag.TheUnforgettables]
    },
    {
        id: '158',
        imageSrc: 'images/white_lady.jpg',
        isImagePortrait: false,
        translation: 'white-lady',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '40', ingredientId: '6', unit: Unit.ML },
            { amount: '30', ingredientId: '38', unit: Unit.ML },
            { amount: '20', ingredientId: '10', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.TheUnforgettables]
    },
    {
        id: '159',
        imageSrc: 'images/vesper.jpg',
        isImagePortrait: false,
        translation: 'vesper',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '6', unit: Unit.ML },
            { amount: '15', ingredientId: '8', unit: Unit.ML },
            { amount: '7.5', ingredientId: '121', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.ContemporaryClassics]
    },
    {
        id: '160',
        imageSrc: 'images/sazerac.jpg',
        isImagePortrait: false,
        translation: 'sazerac',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '61', unit: Unit.ML },
            { amount: '15', ingredientId: '74', unit: Unit.ML },
            { amount: '2', ingredientId: '122', unit: Unit.DASH }
        ],
        tags: [Tag.IBA, Tag.TheUnforgettables]
    },
    {
        id: '161',
        imageSrc: 'images/corpse_reviver.jpg',
        isImagePortrait: false,
        translation: 'corpse-reviver',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '6', unit: Unit.ML },
            { amount: '30', ingredientId: '92', unit: Unit.ML },
            { amount: '30', ingredientId: '121', unit: Unit.ML },
            { amount: '30', ingredientId: '10', unit: Unit.ML },
            { amount: '1', ingredientId: '74', unit: Unit.DASH }
        ],
        tags: [Tag.IBA, Tag.ContemporaryClassics]
    },
    {
        id: '162',
        imageSrc: 'images/singapore_sling.jpg',
        isImagePortrait: false,
        translation: 'singapore-sling',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '6', unit: Unit.ML },
            { amount: '15', ingredientId: '123', unit: Unit.ML },
            { amount: '7.5', ingredientId: '92', unit: Unit.ML },
            { amount: '7.5', ingredientId: '124', unit: Unit.ML },
            { amount: '120', ingredientId: '26', unit: Unit.ML },
            { amount: '15', ingredientId: '2', unit: Unit.ML },
            { amount: '10', ingredientId: '30', unit: Unit.ML },
            { amount: '1', ingredientId: '27', unit: Unit.DASH }
        ],
        tags: [Tag.IBA, Tag.ContemporaryClassics]
    },
    {
        id: '163',
        imageSrc: 'images/rusty_nail.jpg',
        isImagePortrait: false,
        translation: 'rusty-nail',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '56', unit: Unit.ML },
            { amount: '30', ingredientId: '125', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.TheUnforgettables]
    },
    {
        id: '164',
        imageSrc: 'images/french_connection.jpg',
        isImagePortrait: false,
        translation: 'french-connection',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '35', ingredientId: '61', unit: Unit.ML },
            { amount: '35', ingredientId: '22', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.ContemporaryClassics]
    },
    {
        id: '165',
        imageSrc: 'images/clover_club.jpg',
        isImagePortrait: false,
        translation: 'clover-club',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '6', unit: Unit.ML },
            { amount: '15', ingredientId: '126', unit: Unit.ML },
            { amount: '15', ingredientId: '10', unit: Unit.ML },
            { amount: '', ingredientId: '23', unit: Unit.None }
        ],
        tags: [Tag.IBA, Tag.TheUnforgettables]
    },
    {
        id: '166',
        imageSrc: 'images/between_the_sheets.jpg',
        isImagePortrait: false,
        translation: 'between-the-sheets',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '1', unit: Unit.ML },
            { amount: '30', ingredientId: '61', unit: Unit.ML },
            { amount: '30', ingredientId: '38', unit: Unit.ML },
            { amount: '20', ingredientId: '10', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.TheUnforgettables]
    },
    {
        id: '167',
        imageSrc: 'images/angel_face.jpg',
        isImagePortrait: false,
        translation: 'angel-face',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '6', unit: Unit.ML },
            { amount: '30', ingredientId: '29', unit: Unit.ML },
            { amount: '30', ingredientId: '65', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.TheUnforgettables]
    },
    {
        id: '168',
        imageSrc: 'images/paloma.jpg',
        isImagePortrait: false,
        translation: 'paloma',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '18', unit: Unit.ML },
            { amount: '5', ingredientId: '2', unit: Unit.ML },
            { amount: '', ingredientId: '46', unit: '' },
            { amount: '100', ingredientId: '127', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.NewEraDrinks]
    },
    {
        id: '169',
        imageSrc: 'images/john_collins.jpg',
        isImagePortrait: false,
        translation: 'john-collins',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '6', unit: Unit.ML },
            { amount: '30', ingredientId: '10', unit: Unit.ML },
            { amount: '15', ingredientId: '3', unit: Unit.ML },
            { amount: '60', ingredientId: '4', unit: Unit.ML }
        ],
        tags: [Tag.IBA, Tag.TheUnforgettables]
    },
    {
        id: '170',
        imageSrc: 'images/negroni_sbagliato.jpg',
        isImagePortrait: false,
        translation: 'negroni-sbagliato',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '30', ingredientId: '36', unit: Unit.ML },
            { amount: '30', ingredientId: '37', unit: Unit.ML },
            { amount: '60', ingredientId: '86', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '171',
        imageSrc: 'images/godfather.jpg',
        isImagePortrait: false,
        translation: 'godfather',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '56', unit: Unit.ML },
            { amount: '45', ingredientId: '22', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '172',
        imageSrc: 'images/halloween_punch.jpg',
        isImagePortrait: false,
        translation: 'halloween-punch',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '10', ingredientId: '131', unit: Unit.DL },
            { amount: '3', ingredientId: '129', unit: '' },
            { amount: '', ingredientId: '130', unit: '' },
            { amount: '10', ingredientId: '102', unit: '' },
            { amount: '6', ingredientId: '118', unit: '' },
            { amount: '2', ingredientId: '8', unit: Unit.DL }
        ],
        tags: [Tag.Halloween, Tag.Punch]
    },
    {
        id: '173',
        imageSrc: 'images/bloody_punch.jpg',
        isImagePortrait: false,
        translation: 'bloody-punch',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '4', ingredientId: '8', unit: Unit.DL },
            { amount: '7.5', ingredientId: '20', unit: Unit.DL },
            { amount: '1.25', ingredientId: '2', unit: Unit.DL },
            { amount: '3.5', ingredientId: '45', unit: Unit.DL },
            { amount: '2.5', ingredientId: '88', unit: Unit.DL },
            { amount: '', ingredientId: '132', unit: '' }
        ],
        tags: [Tag.Halloween, Tag.Punch]
    },
    {
        id: '174',
        imageSrc: 'images/black_margarita.png',
        isImagePortrait: true,
        translation: 'black-margarita',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '1', ingredientId: '46', unit: Unit.TBSP },
            { amount: '2', ingredientId: '133', unit: '' },
            { amount: '45', ingredientId: '18', unit: Unit.ML },
            { amount: '30', ingredientId: '2', unit: Unit.ML },
            { amount: '15', ingredientId: '3', unit: Unit.ML }
        ],
        tags: [Tag.Halloween]
    },
    {
        id: '175',
        imageSrc: 'images/pumpkin_martini.jpg',
        isImagePortrait: false,
        translation: 'pumpkin-martini',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '8', unit: Unit.ML },
            { amount: '15', ingredientId: '35', unit: Unit.ML },
            { amount: '30', ingredientId: '134', unit: Unit.ML },
            { amount: '2', ingredientId: '136', unit: Unit.TBSP },
            { amount: '0.25', ingredientId: '135', unit: Unit.TSP },
            { amount: '', ingredientId: '137', unit: '' }
        ],
        tags: [Tag.Halloween]
    },
    {
        id: '176',
        imageSrc: 'images/pumpkin_pie_spice.jpg',
        isImagePortrait: true,
        translation: 'pumpkin-pie-spice',
        category: DrinkCategory.Ingredient,
        ingredientGroups: [
            { amount: '2', ingredientId: '142', unit: Unit.TBSP },
            { amount: '2', ingredientId: '138', unit: Unit.TSP },
            { amount: '2', ingredientId: '139', unit: Unit.TSP },
            { amount: '1', ingredientId: '140', unit: Unit.TSP },
            { amount: '1', ingredientId: '141', unit: Unit.TSP }
        ],
        tags: [Tag.Halloween]
    },
    {
        id: '177',
        imageSrc: 'images/apple_highball.jpg',
        isImagePortrait: false,
        translation: 'apple-highball',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '1', ingredientId: '106', unit: '' },
            { amount: '45', ingredientId: '155', unit: Unit.ML },
            { amount: '45', ingredientId: '61', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '178',
        imageSrc: 'images/apple_slammer.jpg',
        isImagePortrait: false,
        translation: 'apple-slammer',
        category: DrinkCategory.Shot,
        ingredientGroups: [
            { amount: '30', ingredientId: '156', unit: Unit.ML },
            { amount: '30', ingredientId: '155', unit: Unit.ML }
        ],
        tags: [Tag.Halloween]
    },
    {
        id: '179',
        imageSrc: 'images/vodka_lemon.jpg',
        isImagePortrait: false,
        translation: 'vodka-lemon',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '8', unit: Unit.ML },
            { amount: '60', ingredientId: '10', unit: Unit.ML }
        ],
        tags: []
    },
    {
        id: '180',
        imageSrc: 'images/mulled_wine.jpg',
        isImagePortrait: false,
        translation: 'mulled-wine',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '7.5', ingredientId: '91', unit: Unit.DL },
            { amount: '2.5', ingredientId: '42', unit: Unit.DL },
            { amount: '12', ingredientId: '102', unit: '' },
            { amount: '2', ingredientId: '103', unit: '' },
            { amount: '1', ingredientId: '105', unit: '' },
            { amount: '750', ingredientId: '101', unit: Unit.ML },
            { amount: '60', ingredientId: '50', unit: Unit.ML }
        ],
        tags: [Tag.Christmas]
    },
    {
        id: '181',
        imageSrc: 'images/captain_kidds_punch.jpg',
        isImagePortrait: false,
        translation: 'captain-kidds-punch',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '60', ingredientId: '54', unit: Unit.ML },
            { amount: '30', ingredientId: '2', unit: Unit.ML },
            { amount: '30', ingredientId: '3', unit: Unit.ML },
            { amount: '1', ingredientId: '23', unit: '' },
            { amount: '1', ingredientId: '27', unit: Unit.DASH },
            { amount: '', ingredientId: '141', unit: '' }
        ],
        tags: []
    },
    {
        id: '182',
        imageSrc: 'images/pure_passion.jpg',
        isImagePortrait: false,
        translation: 'pure-passion',
        category: DrinkCategory.Cocktail,
        ingredientGroups: [
            { amount: '45', ingredientId: '54', unit: Unit.ML },
            { amount: '15', ingredientId: '96', unit: Unit.ML },
            { amount: '30', ingredientId: '2', unit: Unit.ML },
            { amount: '15', ingredientId: '157', unit: Unit.ML },
            { amount: '1', ingredientId: '58', unit: Unit.DASH }
        ],
        tags: []
    }
];
