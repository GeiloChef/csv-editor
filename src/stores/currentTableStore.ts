import type { RemovableRef } from '@vueuse/core';
import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

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

  const copyExistingRow = (row: CsvRowAsJson): void => {
    const deepCopiedRow = JSON.parse(JSON.stringify(row));

    deepCopiedRow.uuid_for_edition = uuidv4();
    currentCsvData.value.push(deepCopiedRow);
  };

  const resetCurrentTableStore = (): void => {
    currentCsvHeader.value = [];
    currentCsvData.value = [];
    currentTableMetaData.value = {
      name: ''
    };
  };

  return {
    currentCsvHeader,
    currentCsvData,
    currentTableMetaData,
    processFileRenaming,
    copyExistingRow,
    deleteRowFromCurrentTableData,
    resetCurrentTableStore
  };
});