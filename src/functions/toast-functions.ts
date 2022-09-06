import { Cocktail } from 'domain/entities/cocktail';
import { Ingredient } from 'domain/entities/ingredient';
import Toastify from 'toastify-js';

export function createCocktailDeleteToast(cocktail: Cocktail) {
    Toastify({
        text: 'Cocktail "' + cocktail.name + '" was removed.',
        duration: 4000,
        close: true,
        gravity: 'bottom',
        position: 'center',
        style: {
            borderRadius: '5px',
            boxShadow: '0 3px 6px -1px rgb(0 0 0 / 12%), 0 10px 36px -4px rgb(255 255 255 / 10%)',
            padding: '0.5em 1em',
            background: 'hsl(48, 100%, 29%)',
        },
        offset: {
            y: '3.5em',
        },
        stopOnFocus: false,
    }).showToast();
}

export function createIngredientDeleteToast(ingredient: Ingredient) {
    Toastify({
        text: 'Ingredient "' + ingredient.name + '" was removed.',
        duration: 4000,
        close: true,
        gravity: 'bottom',
        position: 'center',
        style: {
            borderRadius: '5px',
            boxShadow: '0 3px 6px -1px rgb(0 0 0 / 12%), 0 10px 36px -4px rgb(255 255 255 / 10%)',
            padding: '0.5em 1em',
            background: 'hsl(48, 100%, 29%)',
        },
        offset: {
            y: '3.5em',
        },
        stopOnFocus: false,
    }).showToast();
}

export function createIngredientAddToast(ingredient: Ingredient) {
    Toastify({
        text: 'Ingredient "' + ingredient.name + '" was created.',
        duration: 3000,
        close: true,
        gravity: 'bottom',
        position: 'center',
        style: {
            borderRadius: '5px',
            boxShadow: '0 3px 6px -1px rgb(0 0 0 / 12%), 0 10px 36px -4px rgb(255 255 255 / 10%)',
            padding: '0.25em 0.5em',
            background: 'hsl(141, 71%, 48%)',
        },
        offset: {
            y: '1.5em',
        },
        stopOnFocus: false,
    }).showToast();
}
