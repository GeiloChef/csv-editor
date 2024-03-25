import { mapCsvToJson } from '@/mapper/csvMapper';
import type { MappedCsvToJson } from '@/models/core';
import { useCurrentTableStore } from '@/stores/currentTableStore';

/**
 * @description Takes a file from the user upload and get it's content
 * @param file - {File}
 * @return {string} - The content of the file
 */
export const uploadFile = (file: File): void => {
  const reader = new FileReader();

  reader.onload = (): void => {
    const mappedCsv: MappedCsvToJson | undefined = mapCsvToJson(reader.result as string);

    if (mappedCsv) {
      const currentTableStore = useCurrentTableStore();

      currentTableStore.currentCsvHeader = mappedCsv.header;
      currentTableStore.currentCsvData = mappedCsv.data;

      if (file.name) {
        currentTableStore.currentTableMetaData.name = file.name;
      } else  {
        currentTableStore.currentTableMetaData.name = '';
      }
    }
  };

  // start reading the file. When it is done, calls the onload event defined above.
  reader.readAsText(file);
};