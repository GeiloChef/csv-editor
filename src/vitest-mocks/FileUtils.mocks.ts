import { v4 as uuidv4 } from 'uuid';

import { TextColumnSettings } from '@/models/columnSettings';
import type { CsvHeaderAsJson } from '@/models/core';
import { ColumnType } from '@/models/core';

export const createMockedCsvHeaderObject = (label: string, columnType: ColumnType): CsvHeaderAsJson => {
  return {
    uuid_for_edition: uuidv4(),
    label: label,
    columnType: columnType,
    columnTypeSettings_Text: new TextColumnSettings()
  };
};

export const CsvHeadersMockArray: CsvHeaderAsJson[] =
  [
    createMockedCsvHeaderObject('Text Column 1', ColumnType.Text),
    createMockedCsvHeaderObject('Text Column 2', ColumnType.Text),
    createMockedCsvHeaderObject('Text Column 3', ColumnType.Text),
    createMockedCsvHeaderObject('Number Column 1', ColumnType.Number),
    createMockedCsvHeaderObject('Number Column 3', ColumnType.Number),
    createMockedCsvHeaderObject('Number Column 3', ColumnType.Number),
  ];