// @/models/core.ts
export interface LanguagesObject {
  german: {
    key: string;
    name: string;
    momentLocale: string;
    i18nLocale: string;
    flagCode: string;
  }
}

export const Languages: LanguagesObject = {
  german: {
    key: 'de', // general key that is used in the code
    name: 'Deutsch', // translated value that is shown to the user
    momentLocale: 'de', // local that is used by moment.js
    i18nLocale: 'de', // local that is used by i18n
    flagCode: 'de' // flag code
  }
};