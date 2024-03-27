import { defineStore } from 'pinia';
import { type Ref, ref } from 'vue';

import type { CsvHeaderAsJson, CsvRowAsJson } from '@/models/core';
import { createEmptyRowFromHeaders } from '@/utils/FileUtils';

export const useRowInformationDialogStore = defineStore('rowInformationDialog', () => {
  const isRowInformationDialogVisible = ref(false);
  const currentRowInformation: Ref<CsvRowAsJson> = ref({} as CsvRowAsJson);

  const initiateEmptyRow = (headers: CsvHeaderAsJson[]) => {
    currentRowInformation.value = createEmptyRowFromHeaders(headers);
  };

  return {
    isRowInformationDialogVisible,
    currentRowInformation,
    initiateEmptyRow
  };
});
