export function fifteenDaysHasPassed(timestamp: number): boolean {
    const today = getTimestampInSeconds();
    const fifteenDaysInSeconds = 84600 * 15;

    const oneMonthAgo = today - fifteenDaysInSeconds;

    if (timestamp < oneMonthAgo) return true;

    return false;
}

export function getTimestampInSeconds() {
    return Math.floor(Date.now() / 1000);
}
