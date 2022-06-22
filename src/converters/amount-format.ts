import { Unit } from 'enums/unit';
import { LocalStorageService } from 'services/local-storage-service';
import { inject } from 'aurelia-framework';
import { MessuarementSystem } from 'enums/messuarement-system';

@inject(LocalStorageService)
export class AmountFormatValueConverter {
    constructor(private _localStorageService: LocalStorageService) {}

    toView(value: string, multiplier: number, unit: Unit) {
        if (value === '') {
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
            case Unit.CL:
                return Unit.FLOZ;
            case Unit.TSP:
                return Unit.TSP;
            case Unit.TBSP:
                return Unit.TBSP;
            case Unit.G:
                return Unit.OZ;
        }

        return 'Not supported yet';
    }

    getUnitMultiplier(unit: Unit, system: MessuarementSystem) {
        if (system === MessuarementSystem.Metric || unit === Unit.None) {
            return 1;
        }

        switch (unit) {
            case Unit.CL:
                return 1 / 3;
            case Unit.TSP:
                return 1;
            case Unit.TBSP:
                return 1;
            case Unit.G:
                return 1 / 30;
        }

        return 0;
    }
}
