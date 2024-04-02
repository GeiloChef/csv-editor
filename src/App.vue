<template>
  <!--  Used to show global messages to  -->
  <div :key="selectedLanguage.i18nLocale">
    <HeaderBar/>
    <Toast />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import Toast from 'primevue/toast';

  import HeaderBar from '@/components/partials/HeaderBar.vue';
  import { useUserSettingsStore } from '@/stores/userSettings';

  const userSettingsStore = useUserSettingsStore();
  const { selectedLanguage } = storeToRefs(userSettingsStore);
</script>
