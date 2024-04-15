import { type RemovableRef, useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';


import { i18n, Languages } from '@/i18n/config';
import type { Language } from '@/models/core';

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
