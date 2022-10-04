# `Drinkable`
<a href='https://play.google.com/store/apps/details?id=com.moimob.drinkable&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img width="200px" alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/></a>
![Alt text](/android/app/src/main/feature-graphic.png?raw=true "")



## Getting Started

This project is bootstrapped by [aurelia-cli](https://github.com/aurelia/cli).
For more information, go to https://aurelia.io/docs/cli/webpack

### Run dev app

Run `npm start`, then open `http://localhost:8080`

You can change the standard webpack configurations from CLI easily with something like this: `npm start -- --open --port 8888`. However, it is better to change the respective npm scripts or `webpack.config.js` with these options, as per your need.

To enable Webpack Bundle Analyzer, do `npm run analyze` (production build).

To enable hot module reload, do `npm start -- --hmr`.

To change dev server port, do `npm start -- --port 8888`.

To change dev server host, do `npm start -- --host 127.0.0.1`

**PS:** You could mix all the flags as well, `npm start -- --host 127.0.0.1 --port 7070 --open --hmr`

### Build for production

Run `npm run build`

### Copying Web Code
Once your web code is built, it needs to be copied into each native project:

`npx cap copy`
Run this command each time you perform a build and consider adding it to the end of your build script in package.json.

### Building Native Project

#### Add Native Projects
`npx cap add ios`
`npx cap add android`
`npx cap sync`

#### iOS
iOS relies on Xcode to do the final app compile:

`npx cap copy ios`
`npx cap open ios`
Once Xcode launches, you can build your app binary through the standard Xcode workflow.

#### Android
Android relies on Android Studio (or, optionally, the Android CLI tools) to build the app:

`npx cap copy android`
`npx cap open android`
`npx cap run android`

Once Android Studio launches, you can build your app through the standard Android Studio workflow.

## Contributing

### Translation
If you want to add a new language to the app follow these steps. The best experience is to clone the repo and run the web code. 

#### Add a new Folder
Under src/locales add a folder with your languages ISO Code. For example if you want to add Swedish translation you add a folder called 'sv'

#### Copy content
Copy `locales/en/translation.json` into your new folder. Example `locales/sv/translation.json`

#### Translate 
Now edit the file and replace the english words with your language of choice. 

#### Add Language to selection
Locate `src/modules/settings/settings.ts`

Add your language to this array.
```
public languages = [
    { value: undefined, name: 'English' },
    { value: 'sv', name: 'Svenska' },
];
```