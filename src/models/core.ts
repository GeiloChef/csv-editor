// @/models/core.ts
export interface LanguagesObject {
  german: {
    key: string;
    name: string;
    momentLocale: string;
    i18nLocale: string;
    flagCode: string;
  },
  english: {
    key: string;
    name: string;
    momentLocale: string;
    i18nLocale: string;
    flagCode: string;
  }
}

export const Languages: LanguagesObject = {
  german: {
    key: 'de', // general key that is used in the code
    name: 'Deutsch', // translated value that is shown to the user
    momentLocale: 'de', // local that is used by moment.js
    i18nLocale: 'de', // local that is used by i18n
    flagCode: 'de' // flag code
  },
  english: {
    key: 'en', // general key that is used in the code
    name: 'English', // translated value that is shown to the user
    momentLocale: 'en', // local that is used by moment.js
    i18nLocale: 'en', // local that is used by i18n
    flagCode: 'en' // flag code
  }
};

export enum ColumnType {
  Number = 'NUMBER',
  Text = 'Text'
}

export interface CsvHeaderAsJson {
  uuid_for_edition: string,
  label: string,
  columnType: ColumnType,
}

export interface CsvRowAsJson {
  uuid_for_edition: string,
  [key: string]: string | number;
}

export interface MappedCsvToJson {
  header: CsvHeaderAsJson[];
  data: CsvRowAsJson[];
}

export interface TableMetaData {
  name: string
}
export enum RowActions {
  DeleteRow = 'DELETE_ROW',
  CopyRow = 'COPY_ROW',
  EditRow = 'Edit_ROW',
  NewRow = 'NEW_ROW',
}
export interface TableRowAction {
  name: string,
  icon: string,
  action: RowActions
}

export interface TableAction {
  label: string,
  command: () => void
}