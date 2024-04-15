// @/models/core.ts
import { TextColumnSettings } from '@/models/columnSettings';

export interface LanguagesObject {
  german: Language,
  english: Language
}

export interface Language {
  key: string;
  name: string;
  momentLocale: string;
  i18nLocale: string;
  flagCode: string;
}

export enum ColumnType {
  Number = 'NUMBER',
  Text = 'Text'
}

export interface CsvHeaderAsJson {
  uuid_for_edition: string,
  label: string,
  columnType: ColumnType,
  columnTypeSettings_Text: TextColumnSettings
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

export enum CellDelimiter {
  AutoDetection = 'AUTO_DETECTION',
  Semicolon = 'SEMICOLON',
  Comma = 'COMMA',
  Custom = 'CUSTOM'
}

export interface FileImportSettings {
  useCustomFileName: boolean,
  customFileName: '',
  cellDelimiter: CellDelimiter,
  customDelimiter: string,
  firstRowAreHeaders: boolean
}

export interface DictionaryItem<T> {
  name: string,
  value: T
}

export interface ColumnTypeSelectionOption extends DictionaryItem<ColumnType>{
  name: string,
  value: ColumnType
}