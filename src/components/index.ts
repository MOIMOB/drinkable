import { FrameworkConfiguration } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';

export function configure(config: FrameworkConfiguration) {
    config.globalResources([
        PLATFORM.moduleName('./widgets/explore-section/explore-section'),
        PLATFORM.moduleName('./widgets/ingredients-widget/ingredients-widget'),
        PLATFORM.moduleName('./widgets/add-ingredients/add-ingredients'),
        PLATFORM.moduleName('./widgets/navigation-widget/navigation-widget'),
        PLATFORM.moduleName('./widgets/season-explore/season-explore'),
        PLATFORM.moduleName('./navbar/navbar'),
        PLATFORM.moduleName('./cocktail-list-item.html'),
        PLATFORM.moduleName('./../converters/amount-format'),
        PLATFORM.moduleName('./icons/icon-filter.html'),
        PLATFORM.moduleName('./icons/icon-add.html'),
        PLATFORM.moduleName('./icons/icon-heart.html'),
        PLATFORM.moduleName('./icons/icon-mail.html'),
        PLATFORM.moduleName('./icons/icon-settings.html'),
        PLATFORM.moduleName('./icons/icon-chevron-back.html'),
        PLATFORM.moduleName('./icons/icon-person.html'),
        PLATFORM.moduleName('./icons/icon-leaf.html'),
        PLATFORM.moduleName('./icons/icon-wine.html'),
        PLATFORM.moduleName('./icons/icon-bookmark.html'),
        PLATFORM.moduleName('./icons/icon-trash.html'),
        PLATFORM.moduleName('./icons/icon-checkmark.html'),
        PLATFORM.moduleName('./icons/icon-close.html'),
        PLATFORM.moduleName('./icons/icon-pencil.html'),
        PLATFORM.moduleName('./icons/icon-ellipsis-vertical.html'),
        PLATFORM.moduleName('./icons/icon-arrow-back.html'),
        PLATFORM.moduleName('./icons/icon-refresh-outline.html'),
        PLATFORM.moduleName('./icons/icon-reader.html'),
        PLATFORM.moduleName('./icons/icon-clipboard.html'),
        PLATFORM.moduleName('./tag-component.html'),
        PLATFORM.moduleName('./add-ingredient-component/add-ingredient-component'),
        PLATFORM.moduleName('./copy-to-clipboard/copy-to-clipboard'),
        PLATFORM.moduleName('./icons/icon-arrow-forward.html')
    ]);
}
