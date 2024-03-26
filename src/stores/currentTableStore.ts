import type { RemovableRef } from '@vueuse/core';
import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

import type { CsvRowAsJson, TableMetaData } from '@/models/core';

export const useCurrentTableStore = defineStore('currentTable', () => {
  const currentCsvHeader: RemovableRef<string[]> = useLocalStorage('currentCsvHeader', []);
  const currentCsvData: RemovableRef<CsvRowAsJson[]> = useLocalStorage('currentCsvData', []);

  const currentTableMetaData: RemovableRef<TableMetaData> = useLocalStorage('currentTableMetaData', {
    name: '',
  });

  const processFileRenaming = (filename: string) => {
    currentTableMetaData.value.name = filename;
  };

  const deleteRowFromCurrentTableData = (row: CsvRowAsJson): void => {
    currentCsvData.value = currentCsvData.value.filter((existingRow) => existingRow.uuid_for_edition !== row.uuid_for_edition);
  };

  return {
    currentCsvHeader,
    currentCsvData,
    currentTableMetaData,
    processFileRenaming,
    deleteRowFromCurrentTableData
  };
});