import { Unit } from 'enums/unit';
import { LocalStorageService } from 'services/local-storage-service';
import { inject } from 'aurelia-framework';
import { MessuarementSystem } from 'enums/messuarement-system';

@inject(LocalStorageService)
export class AmountFormatValueConverter {
    constructor(private _localStorageService: LocalStorageService) {}

    toView(value: string, multiplier: number, unit: Unit) {
        const system = this._localStorageService.getMessuarementSystem();

        const valueSplit = value.split('-');

        const unitMultiplier = this.getUnitMultiplier(unit, system);
        const newUnit = this.getUnit(unit, system);

        if (valueSplit.length > 1) {
            const firstNumber = Number(valueSplit[0]);
            const secondNumber = Number(valueSplit[1]);

            return (
                firstNumber * multiplier * unitMultiplier +
                '-' +
                secondNumber * multiplier * unitMultiplier +
                ' ' +
                newUnit
            );
        }

        return Number(value) * multiplier * unitMultiplier + ' ' + newUnit;
    }
    getUnit(unit: Unit, system: MessuarementSystem) {
        if (system === MessuarementSystem.Metric || unit === Unit.None) {
            return unit;
        }
        return 'Not supported yet';
    }

    getUnitMultiplier(unit: Unit, system: MessuarementSystem) {
        if (system === MessuarementSystem.Metric || unit === Unit.None) {
            return 1;
        }
        return 0;
    }
}
