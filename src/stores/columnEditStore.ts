import { defineStore } from 'pinia';
import { type Ref, ref } from 'vue';

import type { CsvHeaderAsJson } from '@/models/core';

export const useColumnEditStore = defineStore('columnEdit', () => {
  const currentColumnToEdit: Ref<CsvHeaderAsJson | null> = ref(null);

  const setCurrentColumnToEdit = (column : CsvHeaderAsJson): void => {
    currentColumnToEdit.value = column;
  };

  return {
    currentColumnToEdit,
    setCurrentColumnToEdit,
  };

});