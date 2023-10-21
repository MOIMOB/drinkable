export class AlphabeticalGroup<T> {
    constructor(
        public letter: string,
        public items: T[]
    ) {}
}

export function ToAlphabeticalGroup<T>(items: T[], property = 'name'): AlphabeticalGroup<T>[] {
    const letters = [...new Set(items.map(x => x[property]?.charAt(0)?.toLowerCase()).filter(x => x !== undefined))];

    const group: AlphabeticalGroup<T>[] = [];

    letters.forEach(element => {
        group.push(
            new AlphabeticalGroup(
                element,
                items.filter(x => x[property]?.charAt(0)?.toLowerCase() === element)
            )
        );
    });

    return group.sort((a, b) => a.letter.localeCompare(b.letter));
}
