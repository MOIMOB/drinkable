export function getLanguages() {
    return languages;
}

const languages = [
    { value: undefined, name: 'English' },
    { value: 'pr', name: 'Persian' },
    { value: 'de', name: 'Deutsch' },
    { value: 'sv', name: 'Svenska' },
    { value: 'it', name: 'Italiano' },
    { value: 'es', name: 'Español' },
    { value: 'ca', name: 'Català' },
    { value: 'nl', name: 'Nederlands' },
    { value: 'fr', name: 'Français' },
    { value: 'ru', name: 'Русский' },
    { value: 'pl', name: 'Polski' },
    { value: 'pt-BR', name: 'Português do Brasil' },
    { value: 'si', name: 'සිංහල (Sinhala)' },
    { value: 'kr', name: '한국어' },
    { value: 'zh', name: '简体中文' }
] as const;
