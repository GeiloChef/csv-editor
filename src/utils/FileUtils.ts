import { v4 as uuidv4 } from 'uuid';

import { mapCsvToJson } from '@/mapper/csvMapper';
import type { CsvHeaderAsJson, CsvRowAsJson, FileImportSettings, MappedCsvToJson } from '@/models/core';
import { useCurrentTableStore } from '@/stores/currentTableStore';

/**
 * @description Imports a csv file into the web application so the user can interact with its data
 * @param file - {File}
 * @return {string} - The content of the file
 */
export const importFile = (file: File, importSettings: FileImportSettings): void => {
  const reader = new FileReader();

  reader.onload = (): void => {
    const mappedCsv: MappedCsvToJson | undefined = mapCsvToJson(reader.result as string);

    if (mappedCsv) {
      const currentTableStore = useCurrentTableStore();

      currentTableStore.currentCsvHeader = mappedCsv.header;
      currentTableStore.currentCsvData = mappedCsv.data;

      if (importSettings.useCustomFileName) {
        currentTableStore.currentTableMetaData.name = importSettings.customFileName;
      } else {
        currentTableStore.currentTableMetaData.name = getFilenameWithoutExtension(file.name);
      }
    }
  };

  // start reading the file. When it is done, calls the onload event defined above.
  reader.readAsText(file);
};

/**
 * Removes the file extension from a given filename.
 *
 * This function splits the filename by the period character and removes the last segment,
 * which is presumed to be the file extension. It correctly handles filenames with multiple
 * periods by only removing the last segment. If the filename does not contain a period,
 * it is returned unchanged.
 *
 * @param {string} filename - The full filename from which the extension should be removed.
 * @returns {string} The filename without its extension.
 *
 * @example
 * // returns 'example'
 * removeFileExtension('example.txt');
 *
 * @example
 * // returns 'example.file'
 * removeFileExtension('example.file.txt');
 *
 * @example
 * // returns 'example'
 * removeFileExtension('example');
 */
export const getFilenameWithoutExtension = (filename: string): string => {
  const parts: string[] = filename.split('.');

  return parts.length > 1 ? parts.slice(0, -1).join('.') : filename;
};

/**
 * Validates a given filename to ensure it conforms to specific rules.
 *
 * This function checks the filename against a regular expression that excludes
 * certain illegal characters often disallowed in file systems (like `<>:;,?"*|/`).
 * It ensures that the filename contains characters other than these illegal ones
 * and is not empty.
 *
 * @param {string} filename - The filename to be validated.
 * @returns {boolean} `true` if the filename is valid, `false` otherwise.
 *
 * @example
 * // returns true
 * console.log(isValidFileName("example.txt"));
 *
 * @example
 * // returns false
 * console.log(isValidFileName("invalid/name"));
 *
 * @example
 * // returns false
 * console.log(isValidFileName(""));
 */
export const isValidFileName = (filename: string): boolean => {
  const filenameRegex = /^[^<>:;,?"*|/]+$/;

  return filename.length > 0 && filenameRegex.test(filename);
};

/**
 * @description creates an empty object fitting the given headers and scheme of the current table
 * @param headers {string[]}
 * @returns CsvRowAsJson - Object matching the scheme of the current table
 */
export const createEmptyRowFromHeaders = (headers: CsvHeaderAsJson[]): CsvRowAsJson => {
  const emptyTableRow: CsvRowAsJson = {
    uuid_for_edition: uuidv4()
  };

  headers.forEach((header) => {
    emptyTableRow[header.uuid_for_edition] = '';
  });

  return emptyTableRow;
};

export const initiateFileImportSettings = (): FileImportSettings => {
  return {
    useCustomFileName: false,
    customFileName: ''
  };
};