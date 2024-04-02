import { type RemovableRef, useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';


import { i18n } from '@/i18n/config';
import type { Language, LanguagesObject } from '@/models/core';
import { Languages } from '@/models/core';

export const useUserSettingsStore = defineStore('userSettings', () => {
  const selectedLanguage: RemovableRef<Language> = useLocalStorage('selectedLanguage', Languages.english);
  const setLanguage = (newLanguage: Language) => {
    selectedLanguage.value = newLanguage;
    i18n.global.locale.value = newLanguage.i18nLocale as 'en' | 'de';
  };


  return {
    selectedLanguage,
    setLanguage,
  };
});
