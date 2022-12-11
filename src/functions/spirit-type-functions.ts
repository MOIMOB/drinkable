import { SpiritType } from '../domain/enums/spirit-type';
import { SpiritTypeModel } from '../domain/models/spirit-type-model';

export function getSpiritTypeFilters(): SpiritTypeModel[] {
    return [
        { name: 'Gin', spirit: SpiritType.Gin },
        { name: 'Vodka', spirit: SpiritType.Vodka },
        { name: 'Rum', spirit: SpiritType.Rum },
        { name: 'Tequila', spirit: SpiritType.Tequila },
        { name: 'Whiskey / Scotch', spirit: SpiritType.WiskeyScotch },
        { name: 'Cognac / Brandy', spirit: SpiritType.CognacBrandy }
    ];
}
