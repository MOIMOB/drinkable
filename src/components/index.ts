import { FrameworkConfiguration } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';

export function configure(config: FrameworkConfiguration) {
    config.globalResources([
        PLATFORM.moduleName('./widgets/explore-section/explore-section'),
        PLATFORM.moduleName('./widgets/ingredients-widget/ingredients-widget'),
        PLATFORM.moduleName('./widgets/add-ingredients/add-ingredients'),
        PLATFORM.moduleName('./navbar/navbar'),
        PLATFORM.moduleName('./cocktail-list-item.html'),
        PLATFORM.moduleName('./../converters/amount-format'),
        PLATFORM.moduleName('./icons/icon-filter.html'),
        PLATFORM.moduleName('./icons/icon-add.html'),
        PLATFORM.moduleName('./icons/icon-heart.html')
    ]);
}
