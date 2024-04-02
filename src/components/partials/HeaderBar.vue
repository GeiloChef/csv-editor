<template>
  <div>
    <Menubar class="menu-bar-customized">
      <template #start>
        <div class="max-h-8 flex flex-row gap-4 items-center">
          <img
            class="h-8"
            src="/src/assets/logo.png" />
          <div class="text-xl">
            {{ $t('csv-editor') }}
          </div>
        </div>
      </template>

      <template #end>
        <div>
          <SelectButton
            v-model="selectedLanguage"
            :options="selectableLanguages"
            optionLabel="name"
            @change="processLanguageChange($event)"/>
        </div>
      </template>
    </Menubar>
  </div>
</template>


<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import Menubar from 'primevue/menubar';
  import SelectButton, { type SelectButtonChangeEvent } from 'primevue/selectbutton';

  import { Languages } from '@/models/core';
  import { useUserSettingsStore } from '@/stores/userSettings';

  const userSettingsStore = useUserSettingsStore();
  const { selectedLanguage } = storeToRefs(userSettingsStore);

  const selectableLanguages = [
    Languages.english,
    Languages.german
  ];

  const processLanguageChange = (event: SelectButtonChangeEvent) => {
    userSettingsStore.setLanguage(event.value);
  };
</script>

<style scoped lang="scss">
.menu-bar-customized {
  @apply border-0 border-b-4 rounded-none border-amber-200 py-4
}
</style>