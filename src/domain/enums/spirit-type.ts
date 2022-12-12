import { EnumTranslationModel } from 'domain/models/enum-translation-model';

export enum SpiritType {
    None = 0,
    Gin = 1,
    Vodka = 2,
    Rum = 3,
    WiskeyScotch = 4,
    Tequila = 5,
    CognacBrandy = 6
}

export function getSpiritTypeFilters(): EnumTranslationModel<SpiritType>[] {
    return [
        { value: SpiritType.Gin, translation: 'spirit-type.gin' },
        { value: SpiritType.Vodka, translation: 'spirit-type.vodka' },
        { value: SpiritType.Rum, translation: 'spirit-type.rum' },
        { value: SpiritType.Tequila, translation: 'spirit-type.tequila' },
        { value: SpiritType.WiskeyScotch, translation: 'spirit-type.whiskey-scotch' },
        { value: SpiritType.CognacBrandy, translation: 'spirit-type.cognac-brandy' }
    ];
}
