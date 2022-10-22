/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts}'],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: '#dc2626',
                    secondary: '#b91c1c',
                    accent: '#06b6d4',
                    neutral: '#292524',
                    'base-100': '#1c1917',
                    info: '#2dd4bf',
                    success: '#84cc16',
                    warning: '#fbbf24',
                    error: '#ef4444',
                },
            },
            'autumn',
        ],
        logs: false,
    },
    plugins: [require('daisyui')],
};
