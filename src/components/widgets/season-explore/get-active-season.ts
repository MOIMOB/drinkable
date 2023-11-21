import { Season } from './season';

/**
 * Returns the active season based on the current date.
 * @param today - The current date.
 * @returns The active season, or null if no season is active.
 */
export function getActiveSeason(today: Date): Season {
    const month = today.getMonth() + 1;
    const day = today.getDate();

    // Check if it's Halloween season (October 15th to November 7th)
    if ((month === 10 && day >= 15) || (month === 11 && day <= 7)) {
        return 'halloween';
    }

    // Check if it's Christmas season (November 15th to January 7th)
    if ((month === 11 && day >= 15) || month === 12 || (month === 1 && day <= 7)) {
        return 'christmas';
    }

    return null;
}
