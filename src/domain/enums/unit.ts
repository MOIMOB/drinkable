export enum Unit {
    FLOZ = 'fl oz',
    TSP = 'tsp',
    CL = 'cl',
    None = '',
    G = 'g',
    TBSP = 'tbsp',
    ML = 'ml',
    DL = 'dl',
    CUP = 'cup',
    DASH = 'dash',
    SPLASH = 'splash',
    SLICE = 'slice',
    WEDGE = 'wedge'
}

export function getUnitsForImperial(): Unit[] {
    return [
        Unit.None,
        Unit.FLOZ,
        Unit.TSP,
        Unit.TBSP,
        Unit.CUP,
        Unit.DASH,
        Unit.SPLASH,
        Unit.SLICE,
        Unit.WEDGE,
        //Metric
        Unit.CL,
        Unit.ML,
        Unit.DL,
        Unit.G
    ];
}

export function getUnitsForMetric(): Unit[] {
    return [
        Unit.None,
        Unit.ML,
        Unit.CL,
        Unit.DL,
        Unit.TSP,
        Unit.TBSP,
        Unit.G,
        Unit.DASH,
        Unit.SPLASH,
        Unit.SLICE,
        Unit.WEDGE,
        //Imperial
        Unit.FLOZ,
        Unit.CUP
    ];
}
