import { isEmpty } from '@moimob/common';

export function convertToFraction(value: number) {
    if (value % 1 === 0) {
        return value.toString();
    }

    if (value === 0) {
        return '0';
    }

    const stopValues = [
        { value: 0, text: '' },
        { value: 0.25, text: '1/4' },
        { value: 1 / 3, text: '1/3' },
        { value: 0.5, text: '1/2' },
        { value: 2 / 3, text: '2/3' },
        { value: 0.75, text: '3/4' },
        { value: 1, text: '' }
    ];
    const closestNumber = findClosestNumber(value % 1, stopValues);

    let wholeNumber = Math.trunc(value);

    if (closestNumber.value === 1) {
        wholeNumber++;
    }

    if (wholeNumber === 0) {
        return isEmpty(closestNumber.text) ? '0' : closestNumber.text;
    }

    return isEmpty(closestNumber.text) ? wholeNumber.toString() : wholeNumber + ' ' + closestNumber.text;
}

function findClosestNumber(currentNumber: number, numbersArray: { value: number; text: string }[]) {
    let closestNumber = null;
    let closestDistance = Infinity;

    for (const _number of numbersArray) {
        const distance = Math.abs(currentNumber - _number.value);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestNumber = _number.value;
        }
    }

    return numbersArray.find(x => x.value === closestNumber);
}

/**
 * Formats a number to two decimal places if necessary.
 * @param value - The number to format.
 * @returns The formatted number.
 */
export function formatToTwoDecimalsIfNeeded(value: number) {
    return value % 1 === 0 ? value : parseFloat(value.toFixed(2));
}
