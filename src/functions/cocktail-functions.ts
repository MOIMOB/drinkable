import { Cocktail } from 'models/cocktail';

const cocktails: Cocktail[] = [
    {
        name: 'Mojito',
        imageSrc: 'mojito.jpg',
    },
    {
        name: 'Gin & Tonic',
        imageSrc: 'gin-tonic.jpg',
    },
    {
        name: 'Bloody Mary',
        imageSrc: 'bloody-mary.jpg',
    },
    {
        name: 'Cosmopolitan',
        imageSrc: 'cosmopolitan.jpg',
    },
    {
        name: 'Margarita',
        imageSrc: 'margarita.jpg',
    },
];

export function getCocktails() {
    return [...cocktails];
}

export function getRandomCocktails(amount: number) {
    return [...cocktails].sort(() => 0.5 - Math.random()).slice(0, amount);
}
