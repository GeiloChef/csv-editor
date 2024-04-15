import { defineStore, storeToRefs } from 'pinia';
import { type Ref, ref } from 'vue';

import type { CsvHeaderAsJson, CsvRowAsJson } from '@/models/core';
import { useCurrentTableStore } from '@/stores/currentTableStore';

export const useCellEditStore = defineStore('cellEdit', () => {
  const currentTableStore = useCurrentTableStore();
  const { currentCsvHeader } = storeToRefs(currentTableStore);

  const currentRowToEdit: Ref<CsvRowAsJson | null> = ref(null);
  const cellField: Ref<string> = ref('');
  const currentColumnInfoOfFieldToEdit: Ref<CsvHeaderAsJson | null> = ref(null);

  const newFieldValue: Ref<string | number> = ref('');

  const setCurrentCellToEdit = (row : CsvRowAsJson, field: string): void => {
    currentRowToEdit.value = row;
    cellField.value = field;
    currentColumnInfoOfFieldToEdit.value = currentCsvHeader.value.find((header: CsvHeaderAsJson) => header.uuid_for_edition === cellField.value) || null;

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
    currentColumnInfoOfFieldToEdit,
    setCurrentCellToEdit,
    updateCellValue,
  };
});