import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.moimob.drinkable',
    appName: 'Drinkable',
    webDir: 'dist',
    backgroundColor: '#161314',
    android: {
        adjustMarginsForEdgeToEdge: 'auto'
    }
};

export default config;
