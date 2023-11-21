import { expect } from '@jest/globals';
import { getActiveSeason } from 'components/widgets/season-explore/get-active-season';

describe('getActiveSeason', () => {
    it('should return null if today is before October 15th', () => {
        const today = new Date(2022, 9, 14); // October 14th, 2022
        expect(getActiveSeason(today)).toBeNull();
    });

    it('should return "halloween" if today is between October 15th and November 7th #1', () => {
        const today = new Date(2022, 9, 20); // October 20th, 2022
        expect(getActiveSeason(today)).toBe('halloween');
    });

    it('should return "halloween" if today is between October 15th and November 7th #2', () => {
        const today = new Date(2022, 10, 7); // November 7th, 2022
        expect(getActiveSeason(today)).toBe('halloween');
    });

    it('should return null if today is the day after the Halloween period ends', () => {
        const today = new Date(2022, 10, 8); // November 8th, 2022
        expect(getActiveSeason(today)).toBeNull();
    });

    it('should return "christmas" if today is between November 15th and January 7th', () => {
        const today = new Date(2022, 11, 25); // December 25th, 2022
        expect(getActiveSeason(today)).toBe('christmas');
    });

    it('should return "christmas" if today is between November 15th and January 7th - 2', () => {
        const today = new Date(2023, 0, 7); // January 8th, 2023
        expect(getActiveSeason(today)).toBe('christmas');
    });

    it('should return "christmas" if today is between November 15th and January 7th - 3', () => {
        const today = new Date(2022, 11, 31); // December 31th, 2022
        expect(getActiveSeason(today)).toBe('christmas');
    });

    it('should return null if today is the day after the Christmas period ends', () => {
        const today = new Date(2023, 0, 8); // January 8th, 2023
        expect(getActiveSeason(today)).toBeNull();
    });

    it('should return null if no season is active', () => {
        const today = new Date(2022, 6, 1); // July 1st, 2022
        expect(getActiveSeason(today)).toBeNull();
    });
});
