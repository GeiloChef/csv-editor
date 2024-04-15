import { createI18n } from 'vue-i18n';

// import the json files that store the translations in order to use them in your vue project
import deutsch from './de.json';
import english from './en.json';

import type { LanguagesObject } from '@/models/core';

export const Languages: LanguagesObject = {
  german: {
    key: 'de', // general key that is used in the code
    name: 'Deutsch', // translated value that is shown to the user
    momentLocale: 'de', // local that is used by moment.js
    i18nLocale: 'de', // local that is used by i18n
    flagCode: 'de' // flag code
  },
  english: {
    key: 'en', // general key that is used in the code
    name: 'English', // translated value that is shown to the user
    momentLocale: 'en-gp', // local that is used by moment.js
    i18nLocale: 'en', // local that is used by i18n
    flagCode: 'gp' // flag code
  }
};

// create object that stores the translated messages
const messages = {
  de: deutsch,
  en: english
};

// initiate vue-i18n instance and export it
export const i18n = createI18n({
  legacy: false,
  locale: Languages.english.key,
  fallbackLocale: Languages.german.key,
  silentTranslationWarn: true,
  globalInjection: true,
  messages
});