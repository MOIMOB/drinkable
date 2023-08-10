import { convertToFraction } from 'functions/utils';
import { expect } from '@jest/globals';

describe('convertToFraction', () => {
    it('should return a whole number as is', () => {
        expect(convertToFraction(0)).toEqual('0');
        expect(convertToFraction(1)).toEqual('1');
        expect(convertToFraction(5)).toEqual('5');
    });

    it('should convert a decimal value to a fraction', () => {
        expect(convertToFraction(0.25)).toEqual('1/4');
        expect(convertToFraction(0.33)).toEqual('1/3');
        expect(convertToFraction(0.5)).toEqual('1/2');
        expect(convertToFraction(0.67)).toEqual('2/3');
        expect(convertToFraction(0.75)).toEqual('3/4');

        expect(convertToFraction(1.25)).toEqual('1 1/4');
        expect(convertToFraction(2.33)).toEqual('2 1/3');
        expect(convertToFraction(3.5)).toEqual('3 1/2');
        expect(convertToFraction(4.67)).toEqual('4 2/3');
        expect(convertToFraction(5.75)).toEqual('5 3/4');
    });

    it('should round up to the nearest whole number when appropriate', () => {
        expect(convertToFraction(0.99)).toEqual('1');
        expect(convertToFraction(1.99)).toEqual('2');
    });

    it('should round down to zero when appropriate', () => {
        expect(convertToFraction(0.05)).toEqual('0');
        expect(convertToFraction(1.05)).toEqual('1');
    });
});
