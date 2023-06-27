import { EnumTranslationModel } from 'domain/models/enum-translation-model';

export enum AlcoholLevel {
    Unknown = 0,
    None = 1,
    Weak = 2,
    Medium = 3,
    Strong = 4
}

export function getAlcoholLevels(): EnumTranslationModel<AlcoholLevel>[] {
    return [
        { value: AlcoholLevel.None, translation: 'alcohol-level.none' },
        { value: AlcoholLevel.Weak, translation: 'alcohol-level.weak' },
        { value: AlcoholLevel.Medium, translation: 'alcohol-level.medium' },
        { value: AlcoholLevel.Strong, translation: 'alcohol-level.strong' }
    ];
}
