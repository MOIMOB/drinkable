import { getUnitsForImperial, getUnitsForMetric, Unit } from 'domain/enums/unit';

describe('Unit Enum', () => {
    it('should return all values of the Unit enum', () => {
        const expectedUnits = Object.values(Unit);
        const imperialUnits = getUnitsForImperial();
        const metricUnits = getUnitsForMetric();

        expect(imperialUnits.length).toEqual(expectedUnits.length);
        expect(new Set(imperialUnits).size).toEqual(imperialUnits.length);

        expect(metricUnits.length).toEqual(expectedUnits.length);
        expect(new Set(metricUnits).size).toEqual(metricUnits.length);
    });
});
