import { FrameworkConfiguration } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';

export function configure(config: FrameworkConfiguration) {
    config.globalResources([
        PLATFORM.moduleName('./explore-section/explore-section'),
        PLATFORM.moduleName('./ingredients-widget/ingredients-widget'),
        PLATFORM.moduleName('./navbar/navbar'),
        PLATFORM.moduleName('./../converters/unit-format'),
        PLATFORM.moduleName('./../converters/amount-format'),
    ]);
}
