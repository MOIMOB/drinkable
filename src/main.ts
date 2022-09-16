import { DialogConfiguration } from 'aurelia-dialog';
import { Aurelia } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';
import './main.scss';
import './dialog.scss';
import 'toastify-js/src/toastify.css';
import { LocalStorageService } from 'services/local-storage-service';
import { I18N, TCustomAttribute } from 'aurelia-i18n';
import HttpApi from 'i18next-http-backend';

export async function configure(aurelia: Aurelia): Promise<void> {
    aurelia.use
        .standardConfiguration()
        .developmentLogging(PRODUCTION ? 'none' : 'debug')
        .feature(PLATFORM.moduleName('components/index'))
        .plugin(PLATFORM.moduleName('aurelia-animator-css'))
        .plugin(PLATFORM.moduleName('aurelia-validation'))
        .plugin(PLATFORM.moduleName('aurelia-dialog'), (config: DialogConfiguration) => {
            config.useDefaults();
            config.useCSS('');
        })
        .plugin(PLATFORM.moduleName('aurelia-i18n'), (instance: I18N) => {
            const aliases = ['t', 'i18n'];
            TCustomAttribute.configureAliases(aliases);

            instance.i18next.use(HttpApi);

            return instance.setup({
                backend: {
                    loadPath: './locales/{{lng}}/{{ns}}.json',
                },
                attributes: aliases,
                lng: 'en',
                fallbackLng: 'en',
                debug: false,
            });
        });

    await aurelia.container.get(LocalStorageService).initialize();

    aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
