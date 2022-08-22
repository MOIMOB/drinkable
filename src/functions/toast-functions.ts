import { Cocktail } from 'models/cocktail';
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
