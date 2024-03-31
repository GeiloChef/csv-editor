import type { RemovableRef } from '@vueuse/core';
import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

import type { CsvHeaderAsJson, CsvRowAsJson, TableMetaData } from '@/models/core';
import { RowActions } from '@/models/core';
import { useRowInformationDialogStore } from '@/stores/rowInfomationDialogStore';

export const useCurrentTableStore = defineStore('currentTable', () => {
  const rowInformationDialogStore = useRowInformationDialogStore();

  const currentCsvHeader: RemovableRef<CsvHeaderAsJson[]> = useLocalStorage('currentCsvHeader', []);
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
    const copiedRow = { ...row };

    copiedRow.uuid_for_edition = uuidv4();
    rowInformationDialogStore.initiateWithExistingRow(copiedRow, RowActions.CopyRow);
  };

  const editExistingRow = (row: CsvRowAsJson): void => {
    const copiedRow = { ...row };

    rowInformationDialogStore.initiateWithExistingRow(copiedRow, RowActions.EditRow);
  };

  const openNewRowDialog = (): void => {
    const newEmptyRow = rowInformationDialogStore.initiateEmptyRow(currentCsvHeader.value);

    rowInformationDialogStore.initiateWithExistingRow(newEmptyRow, RowActions.NewRow);
  };

  const addNewRow = (row: CsvRowAsJson): void => {
    const copiedRow = { ...row };

    currentCsvData.value.push(copiedRow);
  };

  const storeEditedExistingRow = (editedRow: CsvRowAsJson): void => {
    const foundRowToUpdate = currentCsvData.value.find((existingRow: CsvRowAsJson) => existingRow.uuid_for_edition === editedRow.uuid_for_edition);

    if (foundRowToUpdate) {
      Object.assign(foundRowToUpdate, editedRow);
    }
  };

  const renameColumn = (column: CsvHeaderAsJson, newName: string): void => {
    column.label = newName;
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
    editExistingRow,
    deleteRowFromCurrentTableData,
    resetCurrentTableStore,
    openNewRowDialog,
    addNewRow,
    renameColumn,
    storeEditedExistingRow
  };
});