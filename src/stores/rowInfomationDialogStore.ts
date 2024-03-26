import { defineStore } from 'pinia';
import { type Ref, ref } from 'vue';

import type { CsvRowAsJson } from '@/models/core';
import { createEmptyRowFromHeaders } from '@/utils/FileUtils';

export const useRowInformationDialogStore = defineStore('rowInformationDialog', () => {
  const isRowInformationDialogVisible = ref(false);
  const currentRowInformation: Ref<CsvRowAsJson> = ref({} as CsvRowAsJson);

  const initiateEmptyRow = (headers: string[]) => {
    currentRowInformation.value = createEmptyRowFromHeaders(headers);
  };

  return {
    isRowInformationDialogVisible,
    currentRowInformation,
    initiateEmptyRow
  };
});
