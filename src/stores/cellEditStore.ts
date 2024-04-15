import { defineStore } from 'pinia';
import { type Ref, ref } from 'vue';

import type { CsvRowAsJson } from '@/models/core';

export const useCellEditStore = defineStore('cellEdit', () => {
  const currentRowToEdit: Ref<CsvRowAsJson | null> = ref(null);
  const cellField: Ref<string> = ref('');

  const newFieldValue: Ref<string | number> = ref('');

  const setCurrentCellToEdit = (row : CsvRowAsJson, field: string): void => {
    currentRowToEdit.value = row;
    cellField.value = field;

    newFieldValue.value = row[field];
  };

  const updateCellValue = (): void => {
    if (currentRowToEdit.value && cellField.value) {
      currentRowToEdit.value[cellField.value] = newFieldValue.value;
    }
  };

  return {
    currentRowToEdit,
    cellField,
    newFieldValue,
    setCurrentCellToEdit,
    updateCellValue,
  };
});