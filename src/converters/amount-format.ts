import { Unit } from 'domain/enums/unit';
import { LocalStorageService } from 'services/local-storage-service';
import { inject } from 'aurelia-framework';
import { MessuarementSystem } from 'domain/enums/messuarement-system';

@inject(LocalStorageService)
export class AmountFormatValueConverter {
    constructor(private _localStorageService: LocalStorageService) {}

    toView(value: string, multiplier: number, unit: Unit) {
        if (value === '' || value === undefined) {
            return value;
        }

        const system = this._localStorageService.getMessuarementSystem();

        const unitMultiplier = this.getUnitMultiplier(unit, system);
        const newUnit = this.getUnit(unit, system);

        const newValue = +parseFloat((Number(value) * multiplier * unitMultiplier).toString()).toFixed(2);
        return newValue + ' ' + newUnit;
    }
    getUnit(unit: Unit, system: MessuarementSystem) {
        if (system === MessuarementSystem.Metric || unit === Unit.None) {
            return unit;
        }

        switch (unit) {
            case Unit.ML:
                return Unit.FLOZ;
            case Unit.CL:
                return Unit.FLOZ;
            case Unit.G:
                return Unit.FLOZ;
            case Unit.DL:
                return Unit.CUP;
            default:
                return unit;
        }
    }

    getUnitMultiplier(unit: Unit, system: MessuarementSystem) {
        if (system === MessuarementSystem.Metric || unit === Unit.None) {
            return 1;
        }

        switch (unit) {
            case Unit.ML:
                return 1 / 30;
            case Unit.CL:
                return 1 / 3;
            case Unit.G:
                return 1 / 30;
            case Unit.DL:
                return 1 / 2.5;
        }
    }
}
