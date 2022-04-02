import { Aurelia } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';
import './main.scss';

export function configure(aurelia: Aurelia): void {
    aurelia.use
        .standardConfiguration()
        .developmentLogging(PRODUCTION ? 'none' : 'debug')
        .feature(PLATFORM.moduleName('components/index'))
        .plugin(PLATFORM.moduleName('aurelia-animator-css'));

    aurelia.use.aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
