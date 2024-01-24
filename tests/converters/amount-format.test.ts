import { LocalStorageService } from 'services/local-storage-service';
import { expect } from '@jest/globals';
import { AmountFormatValueConverter } from '../../src/converters/amount-format';
import { Unit } from 'domain/enums/unit';
import { MessuarementSystem } from 'domain/enums/messuarement-system';

describe('IngredientService', () => {
    let localStorageService: LocalStorageService;
    let sut: AmountFormatValueConverter;

    beforeEach(async () => {
        localStorageService = new LocalStorageService();
        await localStorageService.initialize();

        sut = new AmountFormatValueConverter(localStorageService);
    });

    afterEach(() => {
        window.localStorage.clear();
    });

    describe('Metric', () => {
        beforeEach(async () => {
            await localStorageService.updateMessuarmentSystem(MessuarementSystem.Metric);
        });

        test('Pass Milliliter - Should return same as input', () => {
            const result = sut.toView('10', 1, Unit.ML, false);

            expect(result).toEqual('10 ml');
        });

        test('Pass Milliliter and multiplyer - Should return multiplied value', () => {
            const result = sut.toView('10', 3, Unit.ML, false);

            expect(result).toEqual('30 ml');
        });

        test('Pass Milliliter with preferCl - Should return value in Cl', () => {
            const result = sut.toView('10', 1, Unit.ML, true);

            expect(result).toEqual('1 cl');
        });

        test('Pass Milliliter with preferCl - Should handle fraction', () => {
            const result = sut.toView('5', 1, Unit.ML, true);

            expect(result).toEqual('1/2 cl');
        });

        test('Pass Milliliter and multiplyer with preferCl - Should return multiplied value but in Cl', () => {
            const result = sut.toView('10', 3, Unit.ML, true);

            expect(result).toEqual('3 cl');
        });
    });

    describe('Imperial', () => {
        test('Pass Milliliter - Should return in fl oz', () => {
            const result = sut.toView('30', 1, Unit.ML, false);

            expect(result).toEqual('1 fl oz');
        });

        test('Pass Milliliter with preferCl- Should return same as above', () => {
            const result = sut.toView('30', 1, Unit.ML, true);

            expect(result).toEqual('1 fl oz');
        });

        test('Pass Milliliter and multiplyer - Should return multiplied value', () => {
            const result = sut.toView('30', 3, Unit.ML, false);

            expect(result).toEqual('3 fl oz');
        });

        test('Pass Milliliter with preferCl - Should return value in Cl', () => {
            const result = sut.toView('15', 1, Unit.ML, false);

            expect(result).toEqual('1/2 fl oz');
        });

        test('should return empty string when value is empty', () => {
            const result = sut.toView('', 1, Unit.ML, false);
            expect(result).toEqual('');
        });
    });
});
