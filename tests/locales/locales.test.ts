import * as fs from 'fs';

describe('Locales Test', () => {
    test('Validate parsable JSON and no empty values', () => {
        let locales = fs.readdirSync('src/locales');

        locales.forEach(element => {
            let translations = getObjectFromFile(element, `translation`);
            expect(Object.values(translations).filter(x => x.toString().trim() === '').length).toEqual(0);

            let ingredients = getObjectFromFile(element, `ingredients`);
            if (ingredients !== null) {
                expect(Object.values(ingredients).filter(x => x.toString().trim() === '').length).toEqual(0);
            }

            let cocktails = getObjectFromFile(element, `cocktails`);
            if (cocktails !== null) {
                expect(Object.values(cocktails).filter(x => x.toString().trim() === '').length).toEqual(0);
            }

            let instructions = getObjectFromFile(element, `instructions`);
            if (instructions !== null) {
                expect(Object.values(instructions).filter(x => x.toString().trim() === '').length).toEqual(0);
            }
        });

        function getObjectFromFile(locale: string, fileName: string) {
            let filePath = `src/locales/${locale}/${fileName}.json`;

            if (fs.existsSync(filePath)) {
                let rawData = fs.readFileSync(`src/locales/${locale}/${fileName}.json`, 'utf8');
                return JSON.parse(rawData);
            }

            return null;
        }
    });
});
