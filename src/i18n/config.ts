import { createI18n } from 'vue-i18n';

// import the json files that store the translations in order to use them in your vue project
import deutsch from './de.json';
import english from './en.json';

// import constant with preset information - see core.ts
import { Languages } from '@/models/core';

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