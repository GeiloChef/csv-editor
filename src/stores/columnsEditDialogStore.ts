import { defineStore } from 'pinia';
import { useToast } from 'primevue/usetoast';
import { ref, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import type { CsvHeaderAsJson } from '@/models/core';
import { useCurrentTableStore } from '@/stores/currentTableStore';

export const useColumnsEditDialogStore = defineStore('columnsEditDialog', () => {
  const toast = useToast();
  const { t } = useI18n();
  const currentTableStore = useCurrentTableStore();

  const isColumnsEditDialogVisible: Ref<boolean> = ref(false);
  const columnsEditedByUser: Ref<CsvHeaderAsJson[]> = ref([]);

  const setColumnsEditDialogVisibility = (visible: boolean) => {
    isColumnsEditDialogVisible.value = visible;
  };

  const initiateColumnsToEdit = (): void => {
    columnsEditedByUser.value = JSON.parse(JSON.stringify(currentTableStore.currentCsvHeader));
    setColumnsEditDialogVisibility(true);
  };

  const saveUserChangesInTable = (): void => {
    Object.assign(currentTableStore.currentCsvHeader, JSON.parse(JSON.stringify(columnsEditedByUser.value)));
    toast.add({ severity: 'success', summary: t('columns-edited'), detail: t('columns-edited-successfully'), life: 3000 });
    setColumnsEditDialogVisibility(false);
  };


  return {
    isColumnsEditDialogVisible,
    columnsEditedByUser,
    setColumnsEditDialogVisibility,
    initiateColumnsToEdit,
    saveUserChangesInTable
  };

});