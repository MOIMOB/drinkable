import { DrinkCategory } from 'domain/enums/drink-category';
import { Unit } from 'domain/enums/unit';
import { Cocktail, CocktailWithMissingIngredient } from 'domain/entities/cocktail';
import { Ingredient } from 'domain/entities/ingredient';

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
        name: cocktail.name
    };
}

const cocktails: Cocktail[] = [
    {
        id: '1',
        imageSrc: 'images/mojito.jpg',
        isImagePortrait: false,
        name: 'Mojito',
        category: DrinkCategory.Cocktail,
        instructions:
            'Muddle mint leaves with sugar and lime juice. Add a splash of soda water and fill the glass with cracked ice. Pour the rum and top with soda water. Garnish and serve with straw.',
        ingredientGroups: [
            { amount: '40', ingredientId: '1', unit: Unit.ML },
            { amount: '30', ingredientId: '2', unit: Unit.ML },
            { amount: '30', ingredientId: '3', unit: Unit.ML },
            { amount: '40', ingredientId: '4', unit: Unit.ML },
            { amount: '', ingredientId: '5', unit: '' }
        ]
    },
    {
        id: '2',
        imageSrc: 'images/gin_tonic.jpg',
        isImagePortrait: false,
        name: 'Gin & Tonic',
        category: DrinkCategory.Cocktail,
        instructions: 'Pour the gin and tonic into a highball glass over ice cubes. Add the lime wedge and serve.',
        ingredientGroups: [
            { amount: '40', ingredientId: '6', unit: Unit.ML },
            { amount: '', ingredientId: '7', unit: '' }
        ]
    },
    {
        id: '3',
        imageSrc: 'images/bloody_mary.jpg',
        isImagePortrait: false,
        name: 'Bloody Mary',
        category: DrinkCategory.Cocktail,
        instructions: 'Stirring gently, pour all ingredients into highball glass. Garnish.',
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
        ]
    },
    {
        id: '4',
        imageSrc: 'images/cosmopolitan.jpg',
        isImagePortrait: true,
        name: 'Cosmopolitan',
        category: DrinkCategory.Cocktail,
        instructions:
            'Add all ingredients into cocktail shaker filled with ice. Shake well and double strain into large cocktail glass. Garnish with lime wheel.',
        ingredientGroups: [
            { amount: '30', ingredientId: '8', unit: Unit.ML },
            { amount: '20', ingredientId: '19', unit: Unit.ML },
            { amount: '20', ingredientId: '17', unit: Unit.ML },
            { amount: '15', ingredientId: '2', unit: Unit.ML }
        ]
    },
    {
        id: '5',
        imageSrc: 'images/margarita.jpg',
        isImagePortrait: true,
        name: 'Margarita',
        category: DrinkCategory.Cocktail,
        instructions:
            'Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.',
        ingredientGroups: [
            { amount: '40', ingredientId: '18', unit: Unit.ML },
            { amount: '20', ingredientId: '19', unit: Unit.ML },
            { amount: '20', ingredientId: '2', unit: Unit.ML }
        ]
    },
    {
        id: '6',
        imageSrc: 'images/strawberry_daiquiri.jpg',
        isImagePortrait: false,
        name: 'Frozen Strawberry Daiquiri',
        category: DrinkCategory.Cocktail,
        instructions: 'Pour all ingredients into shaker with ice cubes. Shake well. Strain in chilled cocktail glass.',
        ingredientGroups: [
            { amount: '50', ingredientId: '1', unit: Unit.ML },
            { amount: '30', ingredientId: '2', unit: Unit.ML },
            { amount: '30', ingredientId: '3', unit: Unit.ML },
            { amount: '150', ingredientId: '20', unit: Unit.G }
        ]
    },
    {
        id: '7',
        imageSrc: 'images/amaretto_sour.jpg',
        isImagePortrait: false,
        name: 'Amaretto Sour',
        category: DrinkCategory.Cocktail,
        instructions: 'Shake and strain. Garnish with a cherry and an orange slice.',
        ingredientGroups: [
            { amount: '50', ingredientId: '22', unit: Unit.ML },
            { amount: '30', ingredientId: '10', unit: Unit.ML },
            { amount: '20', ingredientId: '3', unit: Unit.ML },
            { amount: '1', ingredientId: '23', unit: '' }
        ]
    },
    {
        id: '8',
        imageSrc: 'images/moscow_mule.jpg',
        isImagePortrait: false,
        name: 'Moscow Mule',
        category: DrinkCategory.Cocktail,
        instructions:
            'Combine vodka and ginger beer in a highball glass filled with ice. Add lime juice. Stir gently. Garnish.',
        ingredientGroups: [
            { amount: '40', ingredientId: '8', unit: Unit.ML },
            { amount: '20', ingredientId: '2', unit: Unit.ML },
            { amount: '100', ingredientId: '24', unit: Unit.ML }
        ]
    },
    {
        id: '9',
        imageSrc: 'images/pina_colada.jpg',
        isImagePortrait: true,
        name: 'Pina Colada',
        category: DrinkCategory.Cocktail,
        instructions: 'Mix with crushed ice in a shaker. Pour into chilled glass, garnish and serve.',
        ingredientGroups: [
            { amount: '45', ingredientId: '1', unit: Unit.ML },
            { amount: '60', ingredientId: '25', unit: Unit.ML },
            { amount: '60', ingredientId: '26', unit: Unit.ML }
        ]
    },
    {
        id: '10',
        imageSrc: 'images/whiskey_sour.jpg',
        isImagePortrait: false,
        name: 'Whiskey Sour',
        category: DrinkCategory.Cocktail,
        instructions:
            "Shake with ice. Strain into chilled glass, garnish and serve. If served 'On the rocks', strain ingredients into old-fashioned glass filled with ice.",
        ingredientGroups: [
            { amount: '50', ingredientId: '28', unit: Unit.ML },
            { amount: '30', ingredientId: '10', unit: Unit.ML },
            { amount: '20', ingredientId: '3', unit: Unit.ML },
            { amount: '1', ingredientId: '23', unit: '' },
            { amount: '', ingredientId: '27', unit: '' }
        ]
    },
    {
        id: '11',
        imageSrc: 'images/pink_lady.jpg',
        isImagePortrait: false,
        name: 'Pink Lady',
        category: DrinkCategory.Cocktail,
        instructions: 'Shake with ice. Strain into chilled glass and serve.',
        ingredientGroups: [
            { amount: '30', ingredientId: '6', unit: Unit.ML },
            { amount: '20', ingredientId: '19', unit: Unit.ML },
            { amount: '20', ingredientId: '10', unit: Unit.ML },
            { amount: '20', ingredientId: '30', unit: Unit.ML },
            { amount: '1', ingredientId: '23', unit: '' }
        ]
    },
    {
        id: '12',
        imageSrc: 'images/gin_sour.jpg',
        isImagePortrait: false,
        name: 'Gin Sour',
        category: DrinkCategory.Cocktail,
        instructions:
            'In a shaker half-filled with ice cubes, combine the ingredients. Shake well. Strain into a sour glass and garnish with an orange slice',
        ingredientGroups: [
            { amount: '60', ingredientId: '6', unit: Unit.ML },
            { amount: '30', ingredientId: '10', unit: Unit.ML },
            { amount: '20', ingredientId: '3', unit: Unit.ML },
            { amount: '1', ingredientId: '23', unit: '' }
        ]
    },
    {
        id: '13',
        imageSrc: 'images/dry_martini.jpg',
        isImagePortrait: false,
        name: 'Dry Martini',
        category: DrinkCategory.Cocktail,
        instructions:
            'Straight: Pour all ingredients into mixing glass with ice cubes. Stir well. Strain in chilled martini cocktail glass. Garnish with olive.',
        ingredientGroups: [
            { amount: '60', ingredientId: '6', unit: Unit.ML },
            { amount: '10', ingredientId: '31', unit: Unit.ML },
            { amount: '', ingredientId: '32', unit: '' }
        ]
    },
    {
        id: '14',
        imageSrc: 'images/hot_shot.jpg',
        isImagePortrait: false,
        name: 'Hot Shot',
        category: DrinkCategory.Shot,
        instructions:
            'Pour Galliano into a shot glass. Using the backside of a spoon, carefully pour coffee on top of the liqueur. Finally to top it off, use the backside of the spoon again to slowly pour the whipped cream on top.',
        ingredientGroups: [
            { amount: '20', ingredientId: '33', unit: Unit.ML },
            { amount: '20', ingredientId: '34', unit: Unit.ML },
            { amount: '20', ingredientId: '35', unit: Unit.ML }
        ]
    },
    {
        id: '15',
        imageSrc: 'images/placeholder.jpg',
        isImagePortrait: false,
        name: 'Frozen Margarita',
        category: DrinkCategory.Cocktail,
        instructions:
            'Combine all ingredients in an electric blender and blend at a low speed for five seconds, then blend at a high speed until firm. Pour contents into a highball glass, garnish with lime slice, and serve.',
        ingredientGroups: [
            { amount: '30', ingredientId: '18', unit: Unit.ML },
            { amount: '20', ingredientId: '19', unit: Unit.ML },
            { amount: '30', ingredientId: '2', unit: Unit.ML },
            { amount: '20', ingredientId: '3', unit: Unit.ML }
        ]
    },
    {
        id: '16',
        imageSrc: 'images/negroni.jpg',
        isImagePortrait: false,
        name: 'Negroni',
        category: DrinkCategory.Cocktail,
        instructions: 'Stir into glass over ice, garnish and serve.',
        ingredientGroups: [
            { amount: '30', ingredientId: '6', unit: Unit.ML },
            { amount: '30', ingredientId: '36', unit: Unit.ML },
            { amount: '30', ingredientId: '37', unit: Unit.ML }
        ]
    },
    {
        id: '17',
        imageSrc: 'images/daiquiri.jpg',
        isImagePortrait: false,
        name: 'Daiquiri',
        category: DrinkCategory.Cocktail,
        instructions: 'Pour all ingredients into shaker with ice cubes. Shake well. Strain in chilled cocktail glass.',
        ingredientGroups: [
            { amount: '60', ingredientId: '1', unit: Unit.ML },
            { amount: '30', ingredientId: '2', unit: Unit.ML },
            { amount: '1', ingredientId: '16', unit: Unit.TBSP }
        ]
    },
    {
        id: '18',
        imageSrc: 'images/after_dinner_cocktail.jpg',
        isImagePortrait: false,
        name: 'After Dinner Cocktail',
        category: DrinkCategory.Cocktail,
        instructions:
            'Shake all ingredients (except lime wedge) with ice and strain into a cocktail glass. Add the wedge of lime and serve.',
        ingredientGroups: [
            { amount: '30', ingredientId: '29', unit: Unit.ML },
            { amount: '30', ingredientId: '38', unit: Unit.ML },
            { amount: '60', ingredientId: '2', unit: Unit.ML }
        ]
    },
    {
        id: '19',
        imageSrc: 'images/manhattan.jpg',
        isImagePortrait: false,
        name: 'Manhattan',
        category: DrinkCategory.Cocktail,
        instructions:
            'Stirred over ice, strained into a chilled glass, garnish with cherry and orange peel, and served up.',
        ingredientGroups: [
            { amount: '30', ingredientId: '37', unit: Unit.ML },
            { amount: '80', ingredientId: '28', unit: Unit.ML },
            { amount: '', ingredientId: '27', unit: '' }
        ]
    },
    {
        id: '20',
        imageSrc: 'images/alabama_slammer.jpg',
        isImagePortrait: false,
        name: 'Alabama Slammer',
        category: DrinkCategory.Cocktail,
        instructions:
            'Pour all ingredients (except for lemon juice) over ice in a highball glass. Stir, add a dash of lemon juice, and serve.',
        ingredientGroups: [
            { amount: '30', ingredientId: '39', unit: Unit.ML },
            { amount: '30', ingredientId: '22', unit: Unit.ML },
            { amount: '20', ingredientId: '40', unit: Unit.ML },
            { amount: '', ingredientId: '2', unit: '' }
        ]
    },
    {
        id: '21',
        imageSrc: 'images/irish_coffee.jpg',
        isImagePortrait: false,
        name: 'Irish Coffee',
        category: DrinkCategory.Cocktail,
        instructions: 'Heat the coffee, whiskey and sugar; do not boil. Pour into glass and top with cream; serve hot.',
        ingredientGroups: [
            { amount: '45', ingredientId: '41', unit: Unit.ML },
            { amount: '240', ingredientId: '34', unit: Unit.ML },
            { amount: '1', ingredientId: '42', unit: Unit.TSP },
            { amount: '', ingredientId: '35', unit: '' }
        ]
    },
    {
        id: '22',
        imageSrc: 'images/black_russian.jpg',
        isImagePortrait: false,
        name: 'Black Russian',
        category: DrinkCategory.Cocktail,
        instructions: 'Pour the ingredients into an old fashioned glass filled with ice cubes. Stir gently.',
        ingredientGroups: [
            { amount: '45', ingredientId: '8', unit: Unit.ML },
            { amount: '30', ingredientId: '43', unit: Unit.ML }
        ]
    },
    {
        id: '23',
        imageSrc: 'images/blackthorn.jpg',
        isImagePortrait: false,
        name: 'Blackthorn',
        category: DrinkCategory.Cocktail,
        instructions:
            'Stir sloe gin and vermouth with ice and strain into a cocktail glass. Add the twist of lemon peel and serve.',
        ingredientGroups: [
            { amount: '30', ingredientId: '37', unit: Unit.ML },
            { amount: '45', ingredientId: '40', unit: Unit.ML }
        ]
    },
    {
        id: '24',
        imageSrc: 'images/blue_lagoon.jpg',
        isImagePortrait: false,
        name: 'Blue Lagoon',
        category: DrinkCategory.Cocktail,
        instructions:
            'Pour vodka and curacao over ice in a highball glass. Fill with Sprite, top with the cherry, and serve.',
        ingredientGroups: [
            { amount: '30', ingredientId: '8', unit: Unit.ML },
            { amount: '30', ingredientId: '44', unit: Unit.ML },
            { amount: '', ingredientId: '45', unit: '' }
        ]
    },
    {
        id: '25',
        imageSrc: 'images/blue_margarita.jpg',
        isImagePortrait: false,
        name: 'Blue Margarita',
        category: DrinkCategory.Cocktail,
        instructions:
            'Rub rim of cocktail glass with lime juice. Dip rim in coarse salt. Shake tequila, blue curacao, and lime juice with ice, strain into the salt-rimmed glass, and serve.',
        ingredientGroups: [
            { amount: '45', ingredientId: '18', unit: Unit.ML },
            { amount: '30', ingredientId: '44', unit: Unit.ML },
            { amount: '30', ingredientId: '2', unit: Unit.ML },
            { amount: '', ingredientId: '46', unit: '' }
        ]
    },
    {
        id: '26',
        imageSrc: 'images/alexander.jpg',
        isImagePortrait: false,
        name: 'Alexander',
        category: DrinkCategory.Cocktail,
        instructions:
            'Shake all ingredients with ice and strain contents into a cocktail glass. Sprinkle nutmeg on top and serve.',
        ingredientGroups: [
            { amount: '30', ingredientId: '6', unit: Unit.ML },
            { amount: '30', ingredientId: '47', unit: Unit.ML },
            { amount: '30', ingredientId: '48', unit: Unit.ML },
            { amount: '', ingredientId: '49', unit: '' }
        ]
    },
    {
        id: '27',
        imageSrc: 'images/brandy_alexander.jpg',
        isImagePortrait: false,
        name: 'Brandy Alexander',
        category: DrinkCategory.Cocktail,
        instructions:
            'Shake all ingredients (except nutmeg) with ice and strain contents into a cocktail glass. Sprinkle nutmeg on top and serve.',
        ingredientGroups: [
            { amount: '30', ingredientId: '50', unit: Unit.ML },
            { amount: '30', ingredientId: '47', unit: Unit.ML },
            { amount: '30', ingredientId: '48', unit: Unit.ML },
            { amount: '', ingredientId: '49', unit: '' }
        ]
    },
    {
        id: '28',
        imageSrc: 'images/alfie_cocktail.jpg',
        isImagePortrait: false,
        name: 'Alfie Cocktail',
        category: DrinkCategory.Cocktail,
        instructions: 'Combine and shake all ingredients with ice, strain into a cocktail glass, and serve.',
        ingredientGroups: [
            { amount: '45', ingredientId: '51', unit: Unit.ML },
            { amount: '20', ingredientId: '38', unit: Unit.ML },
            { amount: '30', ingredientId: '26', unit: Unit.ML }
        ]
    },
    {
        id: '29',
        imageSrc: 'images/algonquin.jpg',
        isImagePortrait: false,
        name: 'Algonquin',
        category: DrinkCategory.Cocktail,
        instructions: 'Combine and shake all ingredients with ice, strain contents into a cocktail glass, and serve.',
        ingredientGroups: [
            { amount: '45', ingredientId: '52', unit: Unit.ML },
            { amount: '30', ingredientId: '31', unit: Unit.ML },
            { amount: '30', ingredientId: '26', unit: Unit.ML }
        ]
    },
    {
        id: '30',
        imageSrc: 'images/allegheny.jpg',
        isImagePortrait: false,
        name: 'Allegheny',
        category: DrinkCategory.Cocktail,
        instructions:
            'Shake all ingredients (except lemon peel) with ice and strain into a cocktail glass. Top with the twist of lemon peel and serve.',
        ingredientGroups: [
            { amount: '30', ingredientId: '31', unit: Unit.ML },
            { amount: '30', ingredientId: '28', unit: Unit.ML },
            { amount: '75', ingredientId: '26', unit: Unit.ML },
            { amount: '75', ingredientId: '10', unit: Unit.ML }
        ]
    },
    {
        id: '31',
        imageSrc: 'images/almeria.jpg',
        isImagePortrait: false,
        name: 'Almeria',
        category: DrinkCategory.Cocktail,
        instructions:
            'In a shaker half-filled with ice cubes, combine all of the ingredients. Shake well. Strain into a cocktail glass.',
        ingredientGroups: [
            { amount: '60', ingredientId: '54', unit: Unit.ML },
            { amount: '30', ingredientId: '55', unit: Unit.ML },
            { amount: '1', ingredientId: '23', unit: '' }
        ]
    },
    {
        id: '32',
        imageSrc: 'images/almond_joy.jpg',
        isImagePortrait: false,
        name: 'Almond Joy',
        category: DrinkCategory.Cocktail,
        instructions: 'Shake all ingredients with ice, strain into a cocktail glass, and serve.',
        ingredientGroups: [
            { amount: '30', ingredientId: '22', unit: Unit.ML },
            { amount: '30', ingredientId: '47', unit: Unit.ML },
            { amount: '60', ingredientId: '48', unit: Unit.ML }
        ]
    },
    {
        id: '33',
        imageSrc: 'images/amaretto_rose.jpg',
        isImagePortrait: false,
        name: 'Amaretto Rose',
        category: DrinkCategory.Cocktail,
        instructions: 'Pour amaretto and lime juice over ice in a collins glass. Fill with soda water and serve.',
        ingredientGroups: [
            { amount: '45', ingredientId: '22', unit: Unit.ML },
            { amount: '15', ingredientId: '2', unit: Unit.ML },
            { amount: '', ingredientId: '4', unit: '' }
        ]
    },
    {
        id: '34',
        imageSrc: 'images/balmoral.jpg',
        isImagePortrait: false,
        name: 'Balmoral',
        category: DrinkCategory.Cocktail,
        instructions:
            'In a mixing glass half-filled with ice cubes, combine all of the ingredients. Stir well. Strain into a cocktail glass.',
        ingredientGroups: [
            { amount: '45', ingredientId: '56', unit: Unit.ML },
            { amount: '15', ingredientId: '37', unit: Unit.ML },
            { amount: '15', ingredientId: '31', unit: Unit.ML },
            { amount: '', ingredientId: '27', unit: '' }
        ]
    },
    {
        id: '35',
        imageSrc: 'images/bermuda_highball.jpg',
        isImagePortrait: false,
        name: 'Bermuda Highball',
        category: DrinkCategory.Cocktail,
        instructions:
            'Pour brandy, gin, and dry vermouth into a highball glass over ice cubes. Fill with carbonated water and stir. Add the twist of lemon and serve. (Ginger ale may be substituted for soda water, if preferred.',
        ingredientGroups: [
            { amount: '30', ingredientId: '50', unit: Unit.ML },
            { amount: '30', ingredientId: '6', unit: Unit.ML },
            { amount: '30', ingredientId: '31', unit: Unit.ML },
            { amount: '', ingredientId: '4', unit: '' }
        ]
    },
    {
        id: '36',
        imageSrc: 'images/bluebird.jpg',
        isImagePortrait: false,
        name: 'Bluebird',
        category: DrinkCategory.Cocktail,
        instructions:
            'In a mixing glass half-filled with crushed ice, combine the gin, triple sec, Curacao, and bitters. Stir well. Strain into a cocktail glass and garnish with the lemon twist and the cherry.',
        ingredientGroups: [
            { amount: '45', ingredientId: '6', unit: Unit.ML },
            { amount: '15', ingredientId: '38', unit: Unit.ML },
            { amount: '15', ingredientId: '44', unit: Unit.ML },
            { amount: '', ingredientId: '27', unit: '' }
        ]
    },
    {
        id: '37',
        imageSrc: 'images/boxcar.jpg',
        isImagePortrait: false,
        name: 'Boxcar',
        category: DrinkCategory.Cocktail,
        instructions:
            'In a shaker half-filled with ice cubes, combine all of the ingredients. Shake well. Strain into a sour glass.',
        ingredientGroups: [
            { amount: '45', ingredientId: '6', unit: Unit.ML },
            { amount: '30', ingredientId: '38', unit: Unit.ML },
            { amount: '45', ingredientId: '10', unit: Unit.ML },
            { amount: '30', ingredientId: '30', unit: Unit.ML },
            { amount: '1', ingredientId: '23', unit: '' }
        ]
    },
    {
        id: '38',
        imageSrc: 'images/california_lemonade.jpg',
        isImagePortrait: false,
        name: 'California Lemonade',
        category: DrinkCategory.Cocktail,
        instructions:
            'Shake all ingredients (except carbonated water) with ice and strain into a collins glass over shaved ice. Fill with carbonated water and stir. Decorate with slices of orange and lemon. Add the cherry and serve with a straw.',
        ingredientGroups: [
            { amount: '60', ingredientId: '52', unit: Unit.ML },
            { amount: '30', ingredientId: '2', unit: Unit.ML },
            { amount: '30', ingredientId: '10', unit: Unit.ML },
            { amount: '1', ingredientId: '16', unit: Unit.TBSP },
            { amount: '15', ingredientId: '30', unit: Unit.ML }
        ]
    },
    {
        id: '39',
        imageSrc: 'images/casino_royale.jpg',
        isImagePortrait: false,
        name: 'Casino Royale',
        category: DrinkCategory.Cocktail,
        instructions:
            'In a shaker half-filled with ice cubes, combine all of the ingredients. Shake well. Strain into a sour glass.',
        ingredientGroups: [
            { amount: '60', ingredientId: '6', unit: Unit.ML },
            { amount: '15', ingredientId: '10', unit: Unit.ML },
            { amount: '1', ingredientId: '57', unit: Unit.TSP },
            { amount: '', ingredientId: '58', unit: '' },
            { amount: '1', ingredientId: '59', unit: '' }
        ]
    },
    {
        id: '40', // 11227
        imageSrc: 'images/champagne_cocktail.jpg',
        isImagePortrait: false,
        name: 'Champagne Cocktail',
        category: DrinkCategory.Cocktail,
        instructions:
            'Add dash of Angostura bitter onto sugar cube and drop it into champagne flute. Add cognac followed by gently pouring chilled champagne. Garnish with orange slice and maraschino cherry.',
        ingredientGroups: [
            { amount: '', ingredientId: '60', unit: '' },
            { amount: '', ingredientId: '42', unit: '' },
            { amount: '', ingredientId: '27', unit: '' },
            { amount: '', ingredientId: '61', unit: '' }
        ]
    },
    {
        id: '41',
        imageSrc: 'images/chocolate_black_russian.jpg',
        isImagePortrait: false,
        name: 'Chocolate Black Russian',
        category: DrinkCategory.Cocktail,
        instructions:
            'Combine all ingredients in an electric blender and blend at a low speed for a short length of time. Pour into a chilled champagne flute and serve.',
        ingredientGroups: [
            { amount: '30', ingredientId: '55', unit: Unit.ML },
            { amount: '15', ingredientId: '8', unit: Unit.ML },
            { amount: '10', ingredientId: '62', unit: Unit.TBSP }
        ]
    },
    {
        id: '42',
        imageSrc: 'images/city_slicker.jpg',
        isImagePortrait: false,
        name: 'City Slicker',
        category: DrinkCategory.Cocktail,
        instructions:
            'In a shaker half-filled with ice cubes, combine all of the ingredients. Shake well. Strain into a cocktail glass.',
        ingredientGroups: [
            { amount: '60', ingredientId: '50', unit: Unit.ML },
            { amount: '15', ingredientId: '38', unit: Unit.ML },
            { amount: '1', ingredientId: '10', unit: Unit.TBSP }
        ]
    },
    {
        id: '43',
        imageSrc: 'images/cuba_libre.jpg',
        isImagePortrait: false,
        name: 'Cuba Libre',
        category: DrinkCategory.Cocktail,
        instructions: 'Build all ingredients in a Collins glass filled with ice. Garnish with lime wedge.',
        ingredientGroups: [
            { amount: '60', ingredientId: '1', unit: Unit.ML },
            { amount: '15', ingredientId: '2', unit: Unit.ML },
            { amount: '', ingredientId: '63', unit: '' }
        ]
    },
    {
        id: '44',
        imageSrc: 'images/foxy_lady.jpg',
        isImagePortrait: false,
        name: 'Foxy Lady',
        category: DrinkCategory.Cocktail,
        instructions: 'Shake all ingredients with ice, strain into a chilled cocktail glass, and serve.',
        ingredientGroups: [
            { amount: '15', ingredientId: '22', unit: Unit.ML },
            { amount: '15', ingredientId: '47', unit: Unit.ML },
            { amount: '60', ingredientId: '48', unit: Unit.ML }
        ]
    },
    {
        id: '45',
        imageSrc: 'images/harvey_wallbanger.jpg',
        isImagePortrait: false,
        name: 'Harvey Wallbanger',
        category: DrinkCategory.Cocktail,
        instructions:
            'Stir the vodka and orange juice with ice in the glass, then float the Galliano on top. Garnish and serve.',
        ingredientGroups: [
            { amount: '30', ingredientId: '8', unit: Unit.ML },
            { amount: '15', ingredientId: '33', unit: Unit.ML },
            { amount: '120', ingredientId: '64', unit: Unit.ML }
        ]
    },
    {
        id: '46',
        imageSrc: 'images/havana_cocktail.jpg',
        isImagePortrait: false,
        name: 'Havana Cocktail',
        category: DrinkCategory.Cocktail,
        instructions:
            'In a shaker half-filled with ice cubes, combine all of the ingredients. Shake well. Strain into a cocktail glass.',
        ingredientGroups: [
            { amount: '30', ingredientId: '1', unit: Unit.ML },
            { amount: '30', ingredientId: '26', unit: Unit.ML },
            { amount: '1', ingredientId: '10', unit: Unit.TSP }
        ]
    },
    {
        id: '47',
        imageSrc: 'images/jack_rose_cocktail.jpg',
        isImagePortrait: false,
        name: 'Jack Rose Cocktail',
        category: DrinkCategory.Cocktail,
        instructions: 'Shake all ingredients with ice, strain into a cocktail glass, and serve.',
        ingredientGroups: [
            { amount: '45', ingredientId: '65', unit: Unit.ML },
            { amount: '1', ingredientId: '30', unit: Unit.TSP },
            { amount: '15', ingredientId: '2', unit: Unit.ML }
        ]
    },
    {
        id: '48',
        imageSrc: 'images/kamikaze.jpg',
        isImagePortrait: false,
        name: 'Kamikaze',
        category: DrinkCategory.Cocktail,
        instructions: 'Shake all ingredients together with ice. Strain into glass, garnish and serve.',
        ingredientGroups: [
            { amount: '30', ingredientId: '8', unit: Unit.ML },
            { amount: '30', ingredientId: '38', unit: Unit.ML },
            { amount: '30', ingredientId: '2', unit: Unit.ML }
        ]
    },
    {
        id: '49',
        imageSrc: 'images/mai_tai.jpg',
        isImagePortrait: false,
        name: 'Mai Tai',
        category: DrinkCategory.Cocktail,
        instructions: 'Shake all ingredients with ice. Strain into glass. Garnish and serve with straw.',
        ingredientGroups: [
            { amount: '30', ingredientId: '1', unit: Unit.ML },
            { amount: '15', ingredientId: '38', unit: Unit.ML },
            { amount: '15', ingredientId: '66', unit: Unit.ML },
            { amount: '45', ingredientId: '67', unit: Unit.ML }
        ]
    },
    {
        id: '50',
        imageSrc: 'images/screwdriver.jpg',
        isImagePortrait: false,
        name: 'Screwdriver',
        category: DrinkCategory.Cocktail,
        instructions: 'Mix in a highball glass with ice. Garnish and serve.',
        ingredientGroups: [
            { amount: '60', ingredientId: '8', unit: Unit.ML },
            { amount: '', ingredientId: '64', unit: '' }
        ]
    },
    {
        id: '51',
        imageSrc: 'images/sloe_gin_cocktail.jpg',
        isImagePortrait: false,
        name: 'Sloe Gin Cocktail',
        category: DrinkCategory.Cocktail,
        instructions: 'Stir all ingredients with ice, strain into a cocktail glass, and serve.',
        ingredientGroups: [
            { amount: '60', ingredientId: '40', unit: Unit.ML },
            { amount: '20', ingredientId: '31', unit: Unit.ML },
            { amount: '', ingredientId: '58', unit: '' }
        ]
    },
    {
        id: '52',
        imageSrc: 'images/stone_sour.jpg',
        isImagePortrait: false,
        name: 'Stone Sour',
        category: DrinkCategory.Cocktail,
        instructions: 'Shake all ingredients with ice, strain into a chilled whiskey sour glass, and serve.',
        ingredientGroups: [
            { amount: '30', ingredientId: '29', unit: Unit.ML },
            { amount: '30', ingredientId: '64', unit: Unit.ML },
            { amount: '10', ingredientId: '67', unit: Unit.ML }
        ]
    },
    {
        id: '53',
        imageSrc: 'images/tequila_sour.jpg',
        isImagePortrait: false,
        name: 'Tequila Sour',
        category: DrinkCategory.Cocktail,
        instructions:
            'Shake tequila, juice of lemon, and powdered sugar with ice and strain into a whiskey sour glass. Add the half-slice of lemon, top with the cherry, and serve.',
        ingredientGroups: [
            { amount: '60', ingredientId: '18', unit: Unit.ML },
            { amount: '60', ingredientId: '10', unit: Unit.ML },
            { amount: '1', ingredientId: '16', unit: Unit.TSP }
        ]
    },
    {
        id: '54',
        imageSrc: 'images/tom_collins.jpg',
        isImagePortrait: false,
        name: 'Tom Collins',
        category: DrinkCategory.Cocktail,
        instructions:
            'In a shaker half-filled with ice cubes, combine the gin, lemon juice, and sugar. Shake well. Strain into a collins glass alomst filled with ice cubes. Add the club soda. Stir and garnish with the cherry and the orange slice.',
        ingredientGroups: [
            { amount: '60', ingredientId: '6', unit: Unit.ML },
            { amount: '30', ingredientId: '10', unit: Unit.ML },
            { amount: '1', ingredientId: '42', unit: Unit.TSP },
            { amount: '90', ingredientId: '4', unit: Unit.ML }
        ]
    },
    {
        id: '55',
        imageSrc: 'images/valencia_cocktail.jpg',
        isImagePortrait: false,
        name: 'Valencia Cocktail',
        category: DrinkCategory.Cocktail,
        instructions: 'Shake all ingredients with ice, strain into a cocktail glass, and serve.',
        ingredientGroups: [
            { amount: '45', ingredientId: '29', unit: Unit.ML },
            { amount: '30', ingredientId: '64', unit: Unit.ML },
            { amount: '', ingredientId: '58', unit: '' }
        ]
    },
    {
        id: '56',
        imageSrc: 'images/vermouth_cassis.jpg',
        isImagePortrait: false,
        name: 'Vermouth Cassis',
        category: DrinkCategory.Cocktail,
        instructions:
            'Stir vermouth and creme de cassis in a highball glass with ice cubes. Fill with carbonated water, stir again, and serve.',
        ingredientGroups: [
            { amount: '45', ingredientId: '31', unit: Unit.ML },
            { amount: '30', ingredientId: '68', unit: Unit.ML },
            { amount: '', ingredientId: '4', unit: '' }
        ]
    },
    {
        id: '57',
        imageSrc: 'images/sex_on_the_beach.jpg',
        isImagePortrait: false,
        name: 'Sex on the Beach',
        category: DrinkCategory.Cocktail,
        instructions: 'Build all ingredients in a highball glass filled with ice. Garnish with orange slice.',
        ingredientGroups: [
            { amount: '30', ingredientId: '8', unit: Unit.ML },
            { amount: '30', ingredientId: '69', unit: Unit.ML },
            { amount: '', ingredientId: '17', unit: '' },
            { amount: '', ingredientId: '70', unit: '' }
        ]
    },
    {
        id: '58',
        imageSrc: 'images/tequila_sunrise.jpg',
        isImagePortrait: false,
        name: 'Tequila Sunrise',
        category: DrinkCategory.Cocktail,
        instructions:
            'Pour the tequila and orange juice into glass over ice. Add the grenadine, which will sink to the bottom. Stir gently to create the sunrise effect. Garnish and serve.',
        ingredientGroups: [
            { amount: '60', ingredientId: '18', unit: Unit.ML },
            { amount: '', ingredientId: '64', unit: '' },
            { amount: '', ingredientId: '30', unit: '' }
        ]
    },
    {
        id: '59',
        imageSrc: 'images/mimosa.jpg',
        isImagePortrait: false,
        name: 'Mimosa',
        category: DrinkCategory.Cocktail,
        instructions: 'Ensure both ingredients are well chilled, then mix into the glass. Serve cold.',
        ingredientGroups: [
            { amount: '', ingredientId: '60', unit: '' },
            { amount: '60', ingredientId: '64', unit: Unit.ML }
        ]
    },
    {
        id: '60',
        imageSrc: 'images/dark_and_stormy.jpg',
        isImagePortrait: false,
        name: 'Dark and Stormy',
        category: DrinkCategory.Cocktail,
        instructions:
            'Fill highball glass (image shows a lowball glass) with ice, fill almost to the top with ginger beer, softly pour the dark rum on top to make it float. Garnish with lime. Serve with straw.',
        ingredientGroups: [
            { amount: '60', ingredientId: '54', unit: Unit.ML },
            { amount: '90', ingredientId: '24', unit: Unit.ML }
        ]
    },
    {
        id: '61',
        imageSrc: 'images/happy_skipper.jpg',
        isImagePortrait: false,
        name: 'Happy Skipper',
        category: DrinkCategory.Cocktail,
        instructions: 'Pour Spiced Rum over ice, fill glass to top with Ginger Ale. Garnish with lime.',
        ingredientGroups: [
            { amount: '15', ingredientId: '21', unit: Unit.ML },
            { amount: '', ingredientId: '24', unit: '' },
            { amount: '', ingredientId: '2', unit: '' }
        ]
    },
    {
        id: '62',
        imageSrc: 'images/brave_bull_shooter.jpg',
        isImagePortrait: false,
        name: 'Brave Bull Shooter',
        category: DrinkCategory.Shot,
        instructions: 'Pour Tabasco into bottom of shot glass and fill with tequila.',
        ingredientGroups: [
            { amount: '15', ingredientId: '18', unit: Unit.ML },
            { amount: '15', ingredientId: '11', unit: Unit.ML }
        ]
    },
    {
        id: '63',
        imageSrc: 'images/at&t.jpg',
        isImagePortrait: false,
        name: 'AT&T',
        category: DrinkCategory.Cocktail,
        instructions: 'Pour Vodka and Gin over ice, add Tonic and Stir',
        ingredientGroups: [
            { amount: '30', ingredientId: '8', unit: Unit.ML },
            { amount: '30', ingredientId: '6', unit: Unit.ML },
            { amount: '120', ingredientId: '7', unit: Unit.ML }
        ]
    },
    {
        id: '64',
        imageSrc: 'images/belgian_blue.jpg',
        isImagePortrait: false,
        name: 'Belgian Blue',
        category: DrinkCategory.Cocktail,
        instructions: 'Just pour all ingredients in the glass and stir.',
        ingredientGroups: [
            { amount: '20', ingredientId: '8', unit: Unit.ML },
            { amount: '10', ingredientId: '71', unit: Unit.ML },
            { amount: '10', ingredientId: '44', unit: Unit.ML },
            { amount: '10', ingredientId: '45', unit: Unit.ML }
        ]
    },
    {
        id: '65',
        imageSrc: 'images/grand_blue.jpg',
        isImagePortrait: false,
        name: 'Grand Blue',
        category: DrinkCategory.Cocktail,
        instructions: 'Serve in an old fashioned glass.',
        ingredientGroups: [
            { amount: '15', ingredientId: '72', unit: Unit.ML },
            { amount: '15', ingredientId: '69', unit: Unit.ML },
            { amount: '15', ingredientId: '44', unit: Unit.ML },
            { amount: '30', ingredientId: '67', unit: Unit.ML }
        ]
    },
    {
        id: '66',
        imageSrc: 'images/americano.jpg',
        isImagePortrait: false,
        name: 'Americano',
        category: DrinkCategory.Cocktail,
        instructions:
            'Pour the Campari and vermouth over ice into glass, add a splash of soda water and garnish with half orange slice.',
        ingredientGroups: [
            { amount: '30', ingredientId: '36', unit: Unit.ML },
            { amount: '30', ingredientId: '37', unit: Unit.ML },
            { amount: '', ingredientId: '4', unit: '' }
        ]
    },
    {
        id: '67',
        imageSrc: 'images/campari_beer.jpg',
        isImagePortrait: false,
        name: 'Campari Beer',
        category: DrinkCategory.Cocktail,
        instructions: 'Use a beer mug. Add Campari first. Fill with beer.',
        ingredientGroups: [
            { amount: '15', ingredientId: '36', unit: Unit.ML },
            { amount: '', ingredientId: '73', unit: '' }
        ]
    },
    {
        id: '68', //16295
        imageSrc: 'images/moranguito.jpg',
        isImagePortrait: false,
        name: 'Moranguito',
        category: DrinkCategory.Cocktail,
        instructions: 'First you put the absinthe, then put tequila, then put the Granadine syrup.',
        ingredientGroups: [
            { amount: '20', ingredientId: '74', unit: Unit.ML },
            { amount: '20', ingredientId: '18', unit: Unit.ML },
            { amount: '10', ingredientId: '30', unit: Unit.ML }
        ]
    },
    {
        id: '69',
        imageSrc: 'images/swedish_blueberry_shot.jpg',
        isImagePortrait: false,
        name: 'Swedish Blueberry Shot',
        category: DrinkCategory.Shot,
        instructions:
            'Pour Licor 43 into a shot glass. Using the backside of a spoon, carefully pour blueberry juice on top of the liqueur. Finally to top it off, use the backside of the spoon again to slowly pour the whipped cream on top.',
        ingredientGroups: [
            { amount: '20', ingredientId: '75', unit: Unit.ML },
            { amount: '20', ingredientId: '76', unit: Unit.ML },
            { amount: '20', ingredientId: '35', unit: Unit.ML }
        ]
    },
    {
        id: '70',
        imageSrc: 'images/pink_panther.jpg',
        isImagePortrait: true,
        name: 'Pink Panther',
        category: DrinkCategory.Cocktail,
        instructions: 'Pour all ingredients in a shaker with ice. Shake well. Strain into a glass.',
        ingredientGroups: [
            { amount: '20', ingredientId: '8', unit: Unit.ML },
            { amount: '20', ingredientId: '75', unit: Unit.ML },
            { amount: '15', ingredientId: '30', unit: Unit.ML },
            { amount: '120', ingredientId: '77', unit: Unit.ML }
        ]
    },
    {
        id: '71',
        imageSrc: 'images/arizona_antifreeze.jpg',
        isImagePortrait: false,
        name: 'Arizona Antifreeze',
        category: DrinkCategory.Shot,
        instructions: 'Pour all ingredients into shot glass and slam.',
        ingredientGroups: [
            { amount: '10', ingredientId: '8', unit: Unit.ML },
            { amount: '10', ingredientId: '78', unit: Unit.ML },
            { amount: '10', ingredientId: '67', unit: Unit.ML }
        ]
    },
    {
        id: '72',
        imageSrc: 'images/gt_blue.jpg',
        isImagePortrait: false,
        name: 'GT Blue',
        category: DrinkCategory.Cocktail,
        instructions:
            'Pour the gin, blue curacao and tonic into a highball glass over ice cubes. Garnish with a lemon slice and serve.',
        ingredientGroups: [
            { amount: '45', ingredientId: '6', unit: Unit.ML },
            { amount: '15', ingredientId: '44', unit: Unit.ML },
            { amount: '', ingredientId: '7', unit: '' }
        ]
    },
    {
        id: '73',
        imageSrc: 'images/melon_sour.jpg',
        isImagePortrait: false,
        name: 'Melon Sour',
        category: DrinkCategory.Cocktail,
        instructions:
            'Pour all ingredients into shaker with ice cubes. Shake well. Strain in a rocks glass filled with ice cubes.',
        ingredientGroups: [
            { amount: '60', ingredientId: '78', unit: Unit.ML },
            { amount: '30', ingredientId: '10', unit: Unit.ML },
            { amount: '15', ingredientId: '3', unit: Unit.ML },
            { amount: '1', ingredientId: '23', unit: '' }
        ]
    },
    {
        id: '74',
        imageSrc: 'images/zorbatini.jpg',
        isImagePortrait: false,
        name: 'Zorbatini',
        category: DrinkCategory.Cocktail,
        instructions: 'Prepare like a Martini. Garnish with a green olive.',
        ingredientGroups: [
            { amount: '40', ingredientId: '8', unit: Unit.ML },
            { amount: '10', ingredientId: '79', unit: Unit.ML }
        ]
    },
    {
        id: '75',
        imageSrc: 'images/ruby_tuesday.jpg',
        isImagePortrait: false,
        name: 'Ruby Tuesday',
        category: DrinkCategory.Cocktail,
        instructions: 'Pour gin and cranberry into a highball filled with ice cubes. Add grenadine and stir.',
        ingredientGroups: [
            { amount: '60', ingredientId: '6', unit: Unit.ML },
            { amount: '', ingredientId: '17', unit: '' },
            { amount: '', ingredientId: '30', unit: '' }
        ]
    },
    {
        id: '76',
        imageSrc: 'images/espresso_martini.jpg',
        isImagePortrait: false,
        name: 'Espresso Martini',
        category: DrinkCategory.Cocktail,
        instructions:
            'Pour ingredients into shaker filled with ice, shake vigorously, and strain into chilled martini glass',
        ingredientGroups: [
            { amount: '40', ingredientId: '8', unit: Unit.ML },
            { amount: '10', ingredientId: '55', unit: Unit.ML },
            { amount: '10', ingredientId: '3', unit: Unit.ML }
        ]
    },
    {
        id: '77',
        imageSrc: 'images/english_highball.jpg',
        isImagePortrait: false,
        name: 'English Highball',
        category: DrinkCategory.Cocktail,
        instructions:
            'Pour brandy, gin, and sweet vermouth into a highball glass over ice cubes. Fill with soda water. Add the twist of lemon peel, stir, and serve. (Ginger ale may be substituted for carbonated water, if preferred.)',
        ingredientGroups: [
            { amount: '20', ingredientId: '50', unit: Unit.ML },
            { amount: '20', ingredientId: '6', unit: Unit.ML },
            { amount: '20', ingredientId: '37', unit: Unit.ML },
            { amount: '', ingredientId: '4', unit: '' }
        ]
    },
    {
        id: '78',
        imageSrc: 'images/english_rose_cocktail.jpg',
        isImagePortrait: false,
        name: 'English Rose Cocktail',
        category: DrinkCategory.Cocktail,
        instructions:
            'Rub rim of cocktail glass with lemon juice and dip rim of glass in powdered sugar. Shake all ingredients (except cherry) with ice and strain into sugar-rimmed glass. Top with the cherry and serve.',
        ingredientGroups: [
            { amount: '20', ingredientId: '29', unit: Unit.ML },
            { amount: '40', ingredientId: '6', unit: Unit.ML },
            { amount: '20', ingredientId: '31', unit: Unit.ML },
            { amount: '30', ingredientId: '30', unit: Unit.ML },
            { amount: '15', ingredientId: '2', unit: Unit.ML }
        ]
    },
    {
        id: '79',
        imageSrc: 'images/imperial_cocktail.jpg',
        isImagePortrait: false,
        name: 'Imperial Cocktail',
        category: DrinkCategory.Cocktail,
        instructions: 'Shake with ice and strain into cocktail glass.',
        ingredientGroups: [
            { amount: '40', ingredientId: '2', unit: Unit.ML },
            { amount: '20', ingredientId: '6', unit: Unit.ML },
            { amount: '40', ingredientId: '80', unit: Unit.ML }
        ]
    },
    {
        id: '80',
        imageSrc: 'images/irish_spring.jpg',
        isImagePortrait: false,
        name: 'Irish Spring',
        category: DrinkCategory.Cocktail,
        instructions:
            'Pour all ingredients into a collins glass over ice cubes. Garnish with the slice of orange, add the cherry on top, and serve.',
        ingredientGroups: [
            { amount: '30', ingredientId: '41', unit: Unit.ML },
            { amount: '15', ingredientId: '81', unit: Unit.ML },
            { amount: '30', ingredientId: '64', unit: Unit.ML },
            { amount: '30', ingredientId: '67', unit: Unit.ML }
        ]
    },
    {
        id: '81',
        imageSrc: 'images/kiwi_martini.jpg',
        isImagePortrait: false,
        name: 'Kiwi Martini',
        category: DrinkCategory.Cocktail,
        instructions:
            'The kiwi martini is a very fun vodka cocktail and it is one of the best drinks that makes use of fresh fruit. Though there are a few recipes floating around, this is one of the easiest and it is an absolutely delightful green martini to drink. For this recipe, you simply muddle slices of kiwi with simple syrup, then shake it with vodka. It is a drink that anyone can mix up in minutes and a perfect cocktail to show off your favorite vodka.',
        ingredientGroups: [
            { amount: '1', ingredientId: '82', unit: '' },
            { amount: '1', ingredientId: '3', unit: Unit.TSP },
            { amount: '45', ingredientId: '8', unit: Unit.ML }
        ]
    },
    {
        id: '82',
        imageSrc: 'images/lazy_coconut_paloma.jpg',
        isImagePortrait: false,
        name: 'Lazy Coconut Paloma',
        category: DrinkCategory.Cocktail,
        instructions:
            'Mix the coconut liqueur (preferably tequila) with the grapefruit juice and top with soda water. Garnish with a large grapefruit slice against the inside of the glass.',
        ingredientGroups: [
            { amount: '30', ingredientId: '71', unit: Unit.ML },
            { amount: '75', ingredientId: '70', unit: Unit.ML },
            { amount: '', ingredientId: '4', unit: '' }
        ]
    },
    {
        id: '83',
        imageSrc: 'images/lemon_elderflower_spritzer.jpg',
        isImagePortrait: false,
        name: 'Lemon Elderflower Spritzer',
        category: DrinkCategory.Cocktail,
        instructions: 'Pour all ingredients over ice, stir and enjoy!',
        ingredientGroups: [
            { amount: '2', ingredientId: '83', unit: Unit.TSP },
            { amount: '60', ingredientId: '8', unit: Unit.ML },
            { amount: '75', ingredientId: '4', unit: Unit.ML },
            { amount: '15', ingredientId: '10', unit: Unit.ML }
        ]
    },
    {
        id: '84',
        imageSrc: 'images/orange_crush.jpg',
        isImagePortrait: false,
        name: 'Orange Crush',
        category: DrinkCategory.Shot,
        instructions: 'Add all ingredients to tumbler-Pour as shot',
        ingredientGroups: [
            { amount: '30', ingredientId: '8', unit: Unit.ML },
            { amount: '30', ingredientId: '38', unit: Unit.ML },
            { amount: '30', ingredientId: '64', unit: Unit.ML }
        ]
    },
    {
        id: '85',
        imageSrc: 'images/mountain_bramble.jpg',
        isImagePortrait: false,
        name: 'Mountain Bramble',
        category: DrinkCategory.Cocktail,
        instructions:
            'Muddle blackberries in a tumbler glass. Mix the Gin, lemon juice and sugar syrup in a shaker and strain over chopped ice. Top with Soda water and garnish with more blackberries and some mint',
        ingredientGroups: [
            { amount: '60', ingredientId: '6', unit: Unit.ML },
            { amount: '20', ingredientId: '10', unit: Unit.ML },
            { amount: '20', ingredientId: '3', unit: Unit.ML },
            { amount: '', ingredientId: '84', unit: '' },
            { amount: '', ingredientId: '4', unit: '' }
        ]
    },
    {
        id: '86',
        imageSrc: 'images/gin_swizzle.jpg',
        isImagePortrait: false,
        name: 'Gin Swizzle',
        category: DrinkCategory.Cocktail,
        instructions:
            'In a shaker half-filled with ice cubes, combine the lime juice, sugar, gin, and bitters. Shake well. Almost fill a colling glass with ice cubes. Stir until the glass is frosted. Strain the mixture in the shaker into the glass and add the club soda.',
        ingredientGroups: [
            { amount: '40', ingredientId: '2', unit: Unit.ML },
            { amount: '60', ingredientId: '6', unit: Unit.ML },
            { amount: '1', ingredientId: '42', unit: Unit.TSP },
            { amount: '', ingredientId: '27', unit: '' },
            { amount: '90', ingredientId: '4', unit: Unit.ML }
        ]
    },
    {
        id: '87',
        imageSrc: 'images/cocktail_horses_neck.jpg',
        isImagePortrait: false,
        name: 'Cocktail Horse’s Neck',
        category: DrinkCategory.Cocktail,
        instructions:
            'Wash and brush an organic, untreated lemon, then cut a spiral of lemon peel, using a citrus peel. If it is too large, cut it with a sharp knife. Put some ice in a tall tumbler glass, place the lemon peel inside and pour the cognac, add the ginger beer and let 2-3 drops of Angostura fall into it. Easy to do, but once you try it you will love it.',
        ingredientGroups: [
            { amount: '40', ingredientId: '61', unit: Unit.ML },
            { amount: '100', ingredientId: '24', unit: Unit.ML },
            { amount: '', ingredientId: '27', unit: '' }
        ]
    },
    {
        id: '88',
        imageSrc: 'images/vodka_tonic.jpg',
        isImagePortrait: false,
        name: 'Vodka Tonic',
        category: DrinkCategory.Cocktail,
        instructions:
            'Wash and cut 1 wedge and 1 slice of lime or lemon. Fill a tumbler with fresh ice. Pour the desired dose of vodka and top up with the tonic. Squeeze the lime wedge into the glass and decorate with the slice. That is all, very simple: it is just the recipe for happiness!',
        ingredientGroups: [
            { amount: '40', ingredientId: '8', unit: Unit.ML },
            { amount: '100', ingredientId: '7', unit: Unit.ML }
        ]
    },
    {
        id: '89',
        imageSrc: 'images/bombay_cassis.jpg',
        isImagePortrait: false,
        name: 'Bombay Cassis',
        category: DrinkCategory.Cocktail,
        instructions:
            'Add the Gin, Crème de Cassis and lime juice to a balloon glass and swirl well to mix. Fill the glass with good quality cubed ice. Top up with chilled and freshly opened Fever-Tree Ginger Beer. Gently stir to combine, top with a gently squeezed lime wedge and finish with a fresh ginger slice.',
        ingredientGroups: [
            { amount: '50', ingredientId: '6', unit: Unit.ML },
            { amount: '20', ingredientId: '68', unit: Unit.ML },
            { amount: '15', ingredientId: '2', unit: Unit.ML },
            { amount: '75', ingredientId: '24', unit: Unit.ML }
        ]
    },
    {
        id: '90',
        imageSrc: 'images/pegu_club.jpg',
        isImagePortrait: false,
        name: 'Pegu Club',
        category: DrinkCategory.Cocktail,
        instructions: 'Shake, strain, up, cocktail glass',
        ingredientGroups: [
            { amount: '40', ingredientId: '6', unit: Unit.ML },
            { amount: '20', ingredientId: '85', unit: Unit.ML },
            { amount: '20', ingredientId: '2', unit: Unit.ML },
            { amount: '', ingredientId: '27', unit: '' },
            { amount: '', ingredientId: '58', unit: '' }
        ]
    },
    {
        id: '91',
        imageSrc: 'images/greyhound.jpg',
        isImagePortrait: false,
        name: 'Greyhound',
        category: DrinkCategory.Cocktail,
        instructions: 'Add the vodka to a Collins glass filled with ice. Top with grapefruit juice and stir.',
        ingredientGroups: [
            { amount: '40', ingredientId: '8', unit: Unit.ML },
            { amount: '90', ingredientId: '70', unit: Unit.ML }
        ]
    },
    {
        id: '92',
        imageSrc: 'images/gimlet.jpg',
        isImagePortrait: false,
        name: 'Gimlet',
        category: DrinkCategory.Cocktail,
        instructions:
            'Add all the ingredients to a shaker and fill with ice. Shake, and strain into a chilled cocktail glass or an Old Fashioned glass filled with fresh ice. Garnish with a lime wheel.',
        ingredientGroups: [
            { amount: '60', ingredientId: '6', unit: Unit.ML },
            { amount: '20', ingredientId: '2', unit: Unit.ML },
            { amount: '20', ingredientId: '3', unit: Unit.ML }
        ]
    },
    {
        id: '93',
        imageSrc: 'images/a_furlong_too_late.jpg',
        isImagePortrait: false,
        name: 'A Furlong Too Late',
        category: DrinkCategory.Cocktail,
        instructions:
            'Pour the rum and ginger beer into a highball glass almost filled with ice cubes. Stir well. Garnish with the lemon twist.',
        ingredientGroups: [
            { amount: '60', ingredientId: '1', unit: Unit.ML },
            { amount: '120', ingredientId: '24', unit: Unit.ML }
        ]
    },
    {
        id: '94',
        imageSrc: 'images/spritz_veneziano.jpg',
        isImagePortrait: false,
        name: 'Spritz Veneziano',
        category: DrinkCategory.Cocktail,
        instructions: 'Build into glass over ice, garnish and serve.',
        ingredientGroups: [
            { amount: '60', ingredientId: '86', unit: Unit.ML },
            { amount: '40', ingredientId: '80', unit: Unit.ML },
            { amount: '', ingredientId: '4', unit: '' }
        ]
    },
    {
        id: '95',
        imageSrc: 'images/amaretto_fizz.jpg',
        isImagePortrait: false,
        name: 'Amaretto fizz',
        category: DrinkCategory.Cocktail,
        instructions:
            'Mix Amaretto, orange juice and sparkling wine in a jug. Add a strip orange zest to each glass, if you like.',
        ingredientGroups: [
            { amount: '40', ingredientId: '22', unit: Unit.ML },
            { amount: '60', ingredientId: '64', unit: Unit.ML },
            { amount: '150', ingredientId: '87', unit: Unit.ML }
        ]
    },
    {
        id: '96',
        imageSrc: 'images/aperol_spritz.jpg',
        isImagePortrait: false,
        name: 'Aperol Spritz',
        category: DrinkCategory.Cocktail,
        instructions:
            'Put a couple of cubes of ice into 2 glasses and add Aperol. Divide the prosecco between the glasses and then top up with soda, if you like.',
        ingredientGroups: [
            { amount: '100', ingredientId: '80', unit: Unit.ML },
            { amount: '150', ingredientId: '86', unit: Unit.ML },
            { amount: '', ingredientId: '4', unit: '' }
        ]
    },
    {
        id: '97',
        imageSrc: 'images/the_philosopher.jpg',
        isImagePortrait: false,
        name: 'The Philosopher',
        category: DrinkCategory.Cocktail,
        instructions:
            'Add all the spirits in a shaker (best to use Hendricks gin) as well as the orange bitters and lemon juice. Strain into a Margarita glass, top with Prosecco.',
        ingredientGroups: [
            { amount: '40', ingredientId: '6', unit: Unit.ML },
            { amount: '40', ingredientId: '78', unit: Unit.ML },
            { amount: '', ingredientId: '58', unit: '' },
            { amount: '20', ingredientId: '10', unit: Unit.ML },
            { amount: '', ingredientId: '86', unit: '' }
        ]
    },
    {
        id: '98',
        imageSrc: 'images/bounty_hunter.jpg',
        isImagePortrait: false,
        name: 'Bounty Hunter',
        category: DrinkCategory.Cocktail,
        instructions:
            'Add the spirits into a shaker as well as the pineapple juice, strain into a Margarita glass. Top with Prosecco and garnish with Blueberries.',
        ingredientGroups: [
            { amount: '40', ingredientId: '54', unit: Unit.ML },
            { amount: '40', ingredientId: '71', unit: Unit.ML },
            { amount: '', ingredientId: '26', unit: '' },
            { amount: '', ingredientId: '86', unit: '' }
        ]
    },
    {
        id: '99',
        imageSrc: 'images/blueberry_mojito.jpg',
        isImagePortrait: false,
        name: 'Blueberry Mojito',
        category: DrinkCategory.Cocktail,
        instructions:
            'Muddle the blueberries with the other ingredients and serve in a highball glass. Garnish with mint and a half slice of lime.',
        ingredientGroups: [
            { amount: '60', ingredientId: '54', unit: Unit.ML },
            { amount: '30', ingredientId: '2', unit: Unit.ML },
            { amount: '', ingredientId: '42', unit: '' },
            { amount: '', ingredientId: '45', unit: '' },
            { amount: '', ingredientId: '88', unit: '' }
        ]
    },
    {
        id: '100',
        imageSrc: 'images/autumn_garibaldi.jpg',
        isImagePortrait: false,
        name: 'Autumn Garibaldi',
        category: DrinkCategory.Cocktail,
        instructions:
            'Pour all ingredients into a glass over ice and stir with a bar spoon. Garnish with some orange slices.',
        ingredientGroups: [
            { amount: '45', ingredientId: '36', unit: Unit.ML },
            { amount: '75', ingredientId: '64', unit: Unit.ML },
            { amount: '75', ingredientId: '24', unit: Unit.ML }
        ]
    },
    {
        id: '101',
        imageSrc: 'images/long_island_iced_tea.jpg',
        isImagePortrait: false,
        name: 'Long Island Iced Tea',
        category: DrinkCategory.Cocktail,
        instructions:
            'Mix all contents in a highball glass and sitr gently. Add dash of Coca-Cola for the coloring and garnish with lemon or lime twist.',
        ingredientGroups: [
            { amount: '15', ingredientId: '8', unit: Unit.ML },
            { amount: '15', ingredientId: '18', unit: Unit.ML },
            { amount: '15', ingredientId: '1', unit: Unit.ML },
            { amount: '15', ingredientId: '6', unit: Unit.ML },
            { amount: '', ingredientId: '63', unit: '' }
        ]
    },
    {
        id: '102',
        imageSrc: 'images/white_russian.jpg',
        isImagePortrait: false,
        name: 'White Russian',
        category: DrinkCategory.Cocktail,
        instructions:
            'Pour vodka and coffee liqueur over ice cubes in an old-fashioned glass. Fill with light cream and serve.',
        ingredientGroups: [
            { amount: '60', ingredientId: '8', unit: Unit.ML },
            { amount: '30', ingredientId: '43', unit: Unit.ML },
            { amount: '', ingredientId: '48', unit: '' }
        ]
    },
    {
        id: '103',
        imageSrc: 'images/mezcal_old_fashioned.jpg',
        isImagePortrait: true,
        name: 'Mezcal Old Fashioned',
        category: DrinkCategory.Cocktail,
        instructions: 'Put ingredients into old-fashioned glass filled with ice and stir.',
        ingredientGroups: [
            { amount: '45', ingredientId: '18', unit: Unit.ML },
            { amount: '15', ingredientId: '90', unit: Unit.ML },
            { amount: '7.5', ingredientId: '89', unit: Unit.ML },
            { amount: '', ingredientId: '27', unit: '' }
        ]
    },
    {
        id: '104',
        imageSrc: 'images/old_fashioned.jpg',
        isImagePortrait: false,
        name: 'Old Fashioned',
        category: DrinkCategory.Cocktail,
        instructions:
            'Place sugar cube in old fashioned glass and saturate with bitters, add a dash of plain water. Muddle until dissolved. Fill the glass with ice cubes and add whiskey. Garnish with orange twist, and a cocktail cherry',
        ingredientGroups: [
            { amount: '45', ingredientId: '28', unit: Unit.ML },
            { amount: '', ingredientId: '27', unit: '' },
            { amount: '', ingredientId: '42', unit: '' },
            { amount: '', ingredientId: '91', unit: '' }
        ]
    },
    {
        id: '105',
        imageSrc: 'images/sidecar.jpg',
        isImagePortrait: false,
        name: 'Sidecar',
        category: DrinkCategory.Cocktail,
        instructions:
            'Pour all ingredients into cocktail shaker filled with ice. Shake well and strain into cocktail glass.',
        ingredientGroups: [
            { amount: '60', ingredientId: '61', unit: Unit.ML },
            { amount: '15', ingredientId: '92', unit: Unit.ML },
            { amount: '30', ingredientId: '10', unit: Unit.ML }
        ]
    },
    {
        id: '106',
        imageSrc: 'images/french75.jpg',
        isImagePortrait: false,
        name: 'French 75',
        category: DrinkCategory.Cocktail,
        instructions:
            'Combine gin, sugar, and lemon juice in a cocktail shaker filled with ice. Shake vigorously and strain into a chilled champagne glass. Top up with Champagne. Stir gently.',
        ingredientGroups: [
            { amount: '45', ingredientId: '6', unit: Unit.ML },
            { amount: '2', ingredientId: '42', unit: Unit.TSP },
            { amount: '45', ingredientId: '10', unit: Unit.ML },
            { amount: '120', ingredientId: '60', unit: Unit.ML }
        ]
    },
    {
        id: '107',
        imageSrc: 'images/mint_julep.jpg',
        isImagePortrait: false,
        name: 'Mint Julep',
        category: DrinkCategory.Cocktail,
        instructions:
            'In a highball glass gently muddle the mint, sugar and water. Fill the glass with cracked ice, add Bourbon and stir well until the glass is well frosted. Garnish with a mint sprig.',
        ingredientGroups: [
            { amount: '4', ingredientId: '5', unit: '' },
            { amount: '75', ingredientId: '28', unit: Unit.ML },
            { amount: '1', ingredientId: '16', unit: Unit.TSP },
            { amount: '2', ingredientId: '91', unit: Unit.TSP }
        ]
    },
    {
        id: '108',
        imageSrc: 'images/pisco_sour.jpg',
        isImagePortrait: false,
        name: 'Pisco Sour',
        category: DrinkCategory.Cocktail,
        instructions:
            'Vigorously shake and strain contents in a cocktail shaker with ice cubes, then pour into glass and garnish with bitters.',
        ingredientGroups: [
            { amount: '60', ingredientId: '93', unit: Unit.ML },
            { amount: '30', ingredientId: '10', unit: Unit.ML },
            { amount: '1.5', ingredientId: '42', unit: Unit.TSP },
            { amount: '1', ingredientId: '23', unit: '' }
        ]
    },
    {
        id: '109',
        imageSrc: 'images/aquafaba_gin_fizz.png',
        isImagePortrait: false,
        name: 'Aquafaba Gin Fizz',
        category: DrinkCategory.Cocktail,
        instructions:
            'Add the gin, lime juice, Aquafaba and sugar syrup to a cocktail shaker filled with ice. Shake until cold to touch. Strain the shaker into a rocks glass filled with ice and top with soda water. Garnish with a lime wedge.',
        ingredientGroups: [
            { amount: '15', ingredientId: '94', unit: Unit.ML },
            { amount: '25', ingredientId: '2', unit: Unit.ML },
            { amount: '50', ingredientId: '6', unit: Unit.ML },
            { amount: '30', ingredientId: '3', unit: Unit.ML },
            { amount: '20', ingredientId: '4', unit: Unit.ML }
        ]
    },
    {
        id: '110',
        imageSrc: 'images/bellini.jpg',
        isImagePortrait: false,
        name: 'Bellini',
        category: DrinkCategory.Cocktail,
        instructions: 'Pour peach schnapps into chilled flute, add champange. Stir gently.',
        ingredientGroups: [
            { amount: '180', ingredientId: '60', unit: Unit.ML },
            { amount: '30', ingredientId: '69', unit: Unit.ML }
        ]
    },
    {
        id: '111',
        imageSrc: 'images/mango_mojito.jpg',
        isImagePortrait: false,
        name: 'Mango Mojito',
        category: DrinkCategory.Cocktail,
        instructions:
            'Blend lime juice with the mango to give a smooth purée. Put 2 pieces of lime in a highball glass and add 1 teaspoon of caster sugar and 5-6 mint leaves. Squish everything together with a muddler or the end of a rolling pin to release all the flavours from the lime and mint. Add the mango purée, 30ml white rum and a handful of crushed ice, stirring well to mix everything together. Top up with soda water to serve and garnish with extra mint, if you like.',
        ingredientGroups: [
            { amount: '30', ingredientId: '2', unit: Unit.ML },
            { amount: '1', ingredientId: '95', unit: '' },
            { amount: '', ingredientId: '5', unit: '' },
            { amount: '30', ingredientId: '1', unit: Unit.ML },
            { amount: '', ingredientId: '4', unit: '' }
        ]
    },
    {
        id: '112',
        imageSrc: 'images/pornstar_martini.jpg',
        isImagePortrait: false,
        name: 'Pornstar Martini',
        category: DrinkCategory.Cocktail,
        instructions:
            'Straight: Pour all ingredients into mixing glass with ice cubes. Shake well. Strain in chilled martini cocktail glass. Cut passion fruit in half and use as garnish.',
        ingredientGroups: [
            { amount: '30', ingredientId: '8', unit: Unit.ML },
            { amount: '30', ingredientId: '96', unit: Unit.ML },
            { amount: '20', ingredientId: '2', unit: Unit.ML }
        ]
    },
    {
        id: '113',
        imageSrc: 'images/pink_moon.jpg',
        isImagePortrait: false,
        name: 'Pink Moon',
        category: DrinkCategory.Cocktail,
        instructions:
            'Slowly shake in a shaker with ice, strain into a square whiskey glass. Top with fresh ice. Add the blackberries to garnish. Add flowers and a green leaf for a special look!',
        ingredientGroups: [
            { amount: '30', ingredientId: '6', unit: Unit.ML },
            { amount: '30', ingredientId: '71', unit: Unit.ML },
            { amount: '25', ingredientId: '83', unit: Unit.ML },
            { amount: '30', ingredientId: '2', unit: Unit.ML }
        ]
    },
    {
        id: '114',
        imageSrc: 'images/simple_syrup.jpg',
        isImagePortrait: false,
        name: 'Simple Syrup',
        category: DrinkCategory.CocktailIngredient,
        instructions: 'Dissolve the sugar in boiling water. \nLet cool. \nStore in the fridge. Lasts about a month.',
        ingredientGroups: [
            { amount: '2.5', ingredientId: '91', unit: Unit.DL },
            { amount: '2.5', ingredientId: '42', unit: Unit.DL }
        ]
    },
    {
        id: '115',
        imageSrc: 'images/sweet_and_sour.jpg',
        isImagePortrait: false,
        name: 'Sweet and Sour',
        category: DrinkCategory.CocktailIngredient,
        instructions:
            'Mix simple syrup with lemon and lime juice. \nPour into a bottle and store in the fridge. Lasts about a month.',
        ingredientGroups: [
            { amount: '2.5', ingredientId: '3', unit: Unit.DL },
            { amount: '1.25', ingredientId: '2', unit: Unit.DL },
            { amount: '1.25', ingredientId: '10', unit: Unit.DL }
        ]
    }
];
