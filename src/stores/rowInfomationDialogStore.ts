import { defineStore } from 'pinia';
import { type Ref, ref } from 'vue';

import type { CsvHeaderAsJson, CsvRowAsJson } from '@/models/core';
import { RowActions } from '@/models/core';
import { createEmptyRowFromHeaders } from '@/utils/FileUtils';

export const useRowInformationDialogStore = defineStore('rowInformationDialog', () => {
  const isRowInformationDialogVisible = ref(false);
  const currentRowInformation: Ref<CsvRowAsJson> = ref({} as CsvRowAsJson);
  const rowAction: Ref<RowActions> = ref(RowActions.CopyRow);

  const initiateEmptyRow = (headers: CsvHeaderAsJson[]): CsvRowAsJson => {
    currentRowInformation.value = createEmptyRowFromHeaders(headers);

    return currentRowInformation.value;
  };

  const initiateWithExistingRow = (row: CsvRowAsJson, action: RowActions): void => {
    currentRowInformation.value = row;
    rowAction.value = action;
    isRowInformationDialogVisible.value = true;
  };

  return {
    isRowInformationDialogVisible,
    currentRowInformation,
    rowAction,
    initiateEmptyRow,
    initiateWithExistingRow
  };
});
