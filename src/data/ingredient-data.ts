import { StaticIngredient } from 'domain/entities/ingredient';
import { SpiritType } from 'domain/enums/spirit-type';

export function getStaticIngredients() {
    return [...currentIngredients];
}

const currentIngredients: StaticIngredient[] = [
    { id: '1', translation: 'light-rum', spiritType: SpiritType.Rum },
    { id: '2', translation: 'lime-juice', spiritType: SpiritType.None, replacementIds: ['106'] },
    { id: '3', translation: 'simple-syrup', spiritType: SpiritType.None, recipeId: '114' },
    { id: '4', translation: 'soda-water', spiritType: SpiritType.None },
    { id: '5', translation: 'mint', spiritType: SpiritType.None },
    { id: '6', translation: 'gin', spiritType: SpiritType.Gin },
    { id: '7', translation: 'tonic-water', spiritType: SpiritType.None },
    { id: '8', translation: 'vodka', spiritType: SpiritType.Vodka },
    { id: '9', translation: 'tomato-juice', spiritType: SpiritType.None },
    { id: '10', translation: 'lemon-juice', spiritType: SpiritType.None, replacementIds: ['105'] },
    { id: '11', translation: 'tabasco-sauce', spiritType: SpiritType.None },
    { id: '12', translation: 'worcestershire-sauce', spiritType: SpiritType.None },
    { id: '13', translation: 'black-pepper', spiritType: SpiritType.None },
    { id: '14', translation: 'celery-salt', spiritType: SpiritType.None },
    { id: '15', translation: 'celery', spiritType: SpiritType.None },
    { id: '16', translation: 'powdered-sugar', spiritType: SpiritType.None },
    { id: '17', translation: 'cranberry-juice', spiritType: SpiritType.None },
    { id: '18', translation: 'tequila', spiritType: SpiritType.Tequila },
    { id: '19', translation: 'orange-liqueur', spiritType: SpiritType.None, replacementIds: ['38', '92'] },
    { id: '20', translation: 'strawberry', spiritType: SpiritType.None },
    { id: '21', translation: 'spiced-rum', spiritType: SpiritType.Rum },
    { id: '22', translation: 'amaretto', spiritType: SpiritType.None },
    { id: '23', translation: 'egg-white', spiritType: SpiritType.None, replacementIds: ['114'] },
    { id: '24', translation: 'ginger-beer', spiritType: SpiritType.None },
    { id: '25', translation: 'coconut-cream', spiritType: SpiritType.None },
    { id: '26', translation: 'pineapple-juice', spiritType: SpiritType.None },
    { id: '27', translation: 'angostura-bitters', spiritType: SpiritType.None },
    { id: '28', translation: 'bourbon-whiskey', spiritType: SpiritType.WiskeyScotch },
    { id: '29', translation: 'apricot-brandy', spiritType: SpiritType.CognacBrandy },
    { id: '30', translation: 'grenadine', spiritType: SpiritType.None },
    { id: '31', translation: 'dry-vermouth', spiritType: SpiritType.None },
    { id: '32', translation: 'olive', spiritType: SpiritType.None },
    { id: '33', translation: 'galliano', spiritType: SpiritType.None },
    { id: '34', translation: 'coffee', spiritType: SpiritType.None },
    { id: '35', translation: 'cream', spiritType: SpiritType.None },
    { id: '36', translation: 'campari', spiritType: SpiritType.None },
    { id: '37', translation: 'sweet-vermouth', spiritType: SpiritType.None },
    { id: '38', translation: 'triple-sec', spiritType: SpiritType.None, replacementIds: ['19', '92'] },
    { id: '39', translation: 'southern-comfort', spiritType: SpiritType.WiskeyScotch },
    { id: '40', translation: 'sloe-gin', spiritType: SpiritType.Gin },
    { id: '41', translation: 'irish-whiskey', spiritType: SpiritType.WiskeyScotch },
    { id: '42', translation: 'sugar', spiritType: SpiritType.None },
    { id: '43', translation: 'coffee-liqueur', spiritType: SpiritType.None },
    { id: '44', translation: 'blue-curacao', spiritType: SpiritType.None },
    { id: '45', translation: 'sprite', spiritType: SpiritType.None },
    { id: '46', translation: 'salt', spiritType: SpiritType.None },
    { id: '47', translation: 'creme-de-cacao', spiritType: SpiritType.None },
    { id: '48', translation: 'light-cream', spiritType: SpiritType.None },
    { id: '49', translation: 'nutmeg', spiritType: SpiritType.None },
    { id: '50', translation: 'brandy', spiritType: SpiritType.CognacBrandy },
    { id: '51', translation: 'lemon-vodka', spiritType: SpiritType.Vodka },
    { id: '52', translation: 'blended-whiskey', spiritType: SpiritType.WiskeyScotch },
    { id: '53', translation: 'blackberry-brandy', spiritType: SpiritType.CognacBrandy },
    { id: '54', translation: 'dark-rum', spiritType: SpiritType.Rum },
    { id: '55', translation: 'kahlua', spiritType: SpiritType.None, replacementIds: ['43'] },
    { id: '56', translation: 'scotch', spiritType: SpiritType.WiskeyScotch },
    { id: '57', translation: 'maraschino-liqueur', spiritType: SpiritType.None },
    { id: '58', translation: 'orange-bitters', spiritType: SpiritType.None },
    { id: '59', translation: 'egg-yolk', spiritType: SpiritType.None, replacementIds: ['114'] },
    { id: '60', translation: 'champagne', spiritType: SpiritType.None },
    { id: '61', translation: 'cognac', spiritType: SpiritType.CognacBrandy },
    { id: '62', translation: 'chocolate-ice-cream', spiritType: SpiritType.None },
    { id: '63', translation: 'coca-cola', spiritType: SpiritType.None },
    { id: '64', translation: 'orange-juice', spiritType: SpiritType.None },
    { id: '65', translation: 'apple-brandy', spiritType: SpiritType.CognacBrandy },
    { id: '66', translation: 'orgeat-syrup', spiritType: SpiritType.None },
    { id: '67', translation: 'sweet-and-sour', spiritType: SpiritType.None, recipeId: '115' },
    { id: '68', translation: 'creme-de-cassis', spiritType: SpiritType.None },
    { id: '69', translation: 'peach-schnapps', spiritType: SpiritType.None },
    { id: '70', translation: 'grapefruit-juice', spiritType: SpiritType.None },
    { id: '71', translation: 'coconut-liqueur', spiritType: SpiritType.None },
    { id: '72', translation: 'malibu-rum', spiritType: SpiritType.Rum },
    { id: '73', translation: 'lager-beer', spiritType: SpiritType.None },
    { id: '74', translation: 'absinthe', spiritType: SpiritType.None },
    { id: '75', translation: 'licor-43', spiritType: SpiritType.None },
    { id: '76', translation: 'blueberry-juice', spiritType: SpiritType.None },
    { id: '77', translation: 'milk', spiritType: SpiritType.None },
    { id: '78', translation: 'melon-liqueur', spiritType: SpiritType.None },
    { id: '79', translation: 'ouzo', spiritType: SpiritType.None },
    { id: '80', translation: 'aperol', spiritType: SpiritType.None },
    { id: '81', translation: 'peach-brandy', spiritType: SpiritType.CognacBrandy },
    { id: '82', translation: 'kiwi', spiritType: SpiritType.None },
    { id: '83', translation: 'elderflower-cordial', spiritType: SpiritType.None },
    { id: '84', translation: 'blackberries', spiritType: SpiritType.None },
    { id: '85', translation: 'orange-curacao', spiritType: SpiritType.None },
    { id: '86', translation: 'prosecco', spiritType: SpiritType.None },
    { id: '87', translation: 'white-wine', spiritType: SpiritType.None },
    { id: '88', translation: 'blueberries', spiritType: SpiritType.None },
    { id: '89', translation: 'agave-syrup', spiritType: SpiritType.None },
    { id: '90', translation: 'mezcal', spiritType: SpiritType.Tequila },
    { id: '91', translation: 'water', spiritType: SpiritType.None },
    { id: '92', translation: 'cointreau', spiritType: SpiritType.None, replacementIds: ['19', '38'] },
    { id: '93', translation: 'pisco', spiritType: SpiritType.None },
    { id: '94', translation: 'aquafaba', spiritType: SpiritType.None },
    { id: '95', translation: 'mango', spiritType: SpiritType.None },
    { id: '96', translation: 'passoa', spiritType: SpiritType.None },
    { id: '97', translation: 'apple-juice', spiritType: SpiritType.None },
    { id: '98', translation: 'carrot', spiritType: SpiritType.None },
    { id: '99', translation: 'banana', spiritType: SpiritType.None },
    { id: '100', translation: 'cachaca', spiritType: SpiritType.Rum },
    { id: '101', translation: 'red-wine', spiritType: SpiritType.None },
    { id: '102', translation: 'cloves', spiritType: SpiritType.None },
    { id: '103', translation: 'cinnamon', spiritType: SpiritType.None },
    { id: '104', translation: 'apple', spiritType: SpiritType.None },
    { id: '105', translation: 'lemon', spiritType: SpiritType.None },
    { id: '106', translation: 'lime', spiritType: SpiritType.None },
    { id: '107', translation: 'raspberry-liqueur', spiritType: SpiritType.None },
    { id: '108', translation: 'baileys', spiritType: SpiritType.None },
    { id: '109', translation: 'grand-marnier', spiritType: SpiritType.None },
    { id: '110', translation: 'gold-rum', spiritType: SpiritType.Rum },
    { id: '111', translation: 'creme-de-mure', spiritType: SpiritType.None },
    { id: '112', translation: 'green-chartreuse', spiritType: SpiritType.None },
    { id: '113', translation: 'port-wine', spiritType: SpiritType.None },
    { id: '114', translation: 'egg', spiritType: SpiritType.None }
];
