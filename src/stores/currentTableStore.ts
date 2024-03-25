import type { RemovableRef } from '@vueuse/core';
import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

import type { CsvAsJson, TableMetaData } from '@/models/core';

export const useCurrentTableStore = defineStore('currentTable', () => {
  const currentCsvHeader: RemovableRef<string[]> = useLocalStorage('currentCsvHeader', []);
  const currentCsvData: RemovableRef<CsvAsJson[]> = useLocalStorage('currentCsvData', []);

  const currentTableMetaData: RemovableRef<TableMetaData> = useLocalStorage('currentTableMetaData', {
    name: '',
  });



  return {
    currentCsvHeader,
    currentCsvData,
    currentTableMetaData
  };
});