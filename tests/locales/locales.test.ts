import ca from '../../src/locales/ca/translation.json';
import de from '../../src/locales/de/translation.json';
import en from '../../src/locales/en/translation.json';
import es from '../../src/locales/es/translation.json';
import fr from '../../src/locales/fr/translation.json';
import it from '../../src/locales/it/translation.json';
import nl from '../../src/locales/nl/translation.json';
import pl from '../../src/locales/pl/translation.json';
import ru from '../../src/locales/ru/translation.json';
import sv from '../../src/locales/sv/translation.json';

describe('Locales Test', () => {
    test('No empty values', () => {
        expect(Object.values(ca).filter(x => x.toString().trim() === '').length).toEqual(0);
        expect(Object.values(de).filter(x => x.toString().trim() === '').length).toEqual(0);
        expect(Object.values(en).filter(x => x.toString().trim() === '').length).toEqual(0);
        expect(Object.values(es).filter(x => x.toString().trim() === '').length).toEqual(0);
        expect(Object.values(fr).filter(x => x.toString().trim() === '').length).toEqual(0);
        expect(Object.values(it).filter(x => x.toString().trim() === '').length).toEqual(0);
        expect(Object.values(nl).filter(x => x.toString().trim() === '').length).toEqual(0);
        expect(Object.values(pl).filter(x => x.toString().trim() === '').length).toEqual(0);
        expect(Object.values(ru).filter(x => x.toString().trim() === '').length).toEqual(0);
        expect(Object.values(sv).filter(x => x.toString().trim() === '').length).toEqual(0);
    });
});
