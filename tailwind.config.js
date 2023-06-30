/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts}'],
    theme: {
        extend: {}
    },
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: '#dc2626',
                    secondary: '#b91c1c',
                    accent: '#0891b2',
                    neutral: 'hsl(12, 6%, 18%)',
                    'base-100': '#221e1c',
                    'base-200': 'hsl(20, 10%, 9%)',
                    'base-300': 'hsl(20, 10%, 7%)',
                    info: '#2dd4bf',
                    success: '#84cc16',
                    warning: '#fbbf24',
                    error: '#ef4444'
                }
            },
            'autumn'
        ],
        logs: false
    },
    plugins: [require('daisyui')]
};
