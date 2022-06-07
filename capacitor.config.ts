import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.moimob.cocktail',
    appName: 'CocktailApp',
    webDir: 'www',
    bundledWebRuntime: false,
    android: {
        backgroundColor: '#000',
    },
};

export default config;
