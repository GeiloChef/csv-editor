import { v4 as uuidv4 } from 'uuid';

import { i18n } from '@/i18n/config';
import type { CsvHeaderAsJson, CsvRowAsJson, FileImportSettings, MappedCsvToJson } from '@/models/core';
import { CellDelimiter, ColumnType } from '@/models/core';

/**
 * This method turns a csv passed as string into a valid json.
 * To handle linebreaks within cells and single quotes in combination with double quotes, we iterate through
 * every character of the given string
 * @param csv {string} - content of a csv file
 * @return literate Object with header as keys
 */
export const mapCsvToJson = (csv: string, importSettings: FileImportSettings): MappedCsvToJson | undefined => {
  let defaultDelimiter1 = ';';
  let defaultDelimiter2 = ',';

  if (importSettings.cellDelimiter === CellDelimiter.Semicolon) {
    defaultDelimiter2 = '';
  } else if (importSettings.cellDelimiter === CellDelimiter.Comma) {
    defaultDelimiter1 = '';
  } else if (importSettings.cellDelimiter === CellDelimiter.Custom) {
    defaultDelimiter1 = importSettings.customDelimiter;
    defaultDelimiter2 = '';
  }


  const rows: string[][] = [];
  let row: string[] = [];
  let field: string = '';
  let inQuotes: boolean = false;

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    const nextChar = csv[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') { // Handle double quotes inside quoted field
        field += char;
        i++; // Skip next quote
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
    } else {
      switch (char) {
        case '"':
          inQuotes = true;

          if (field.length === 0) { // Start of a quoted field
            break;
          } else { // Quote in the middle of a field (error in CSV format)
            field += char;
            break;
          }

        case defaultDelimiter1:
        case defaultDelimiter2:
          row.push(field.trim());
          field = '';
          break;
        case '\n':
          if (nextChar === '\r') { // Handle CRLF line endings
            i++;
          }

          row.push(field.trim());
          rows.push(row);
          row = [];
          field = '';
          break;
        default:
          field += char;
          break;
      }
    }
  }

  if (field.length > 0) { // Add last field
    row.push(field.trim());
  }

  if (row.length > 0) { // Add last row
    rows.push(row);
  }


  let headersAsString: string[] | undefined = [];

  /**
   * If the user selected, that the first row contains the header of the table, we take the first row and user them as an
   * array of strings. If the user selected, that the first row are not the headers, we just push as many empty strings in the
   * header array so the user can later name the columns himself.
   */
  if (importSettings.firstRowAreHeaders) {
    headersAsString = rows.shift();
  } else {
    const t = i18n.global.t;

    headersAsString =  rows[0].map((item: string, index: number) => {
      return `${t('column')}-${index}`;
    });
  }


  if (!rows || !headersAsString) return undefined;


  const headers: CsvHeaderAsJson[] = headersAsString.map((headerName: string) => {
    return {
      uuid_for_edition: uuidv4(),
      label: headerName,
      columnType: ColumnType.Text
    };
  });


  const csvAsJson: CsvRowAsJson[] = rows.map(csvRow => {
    const rowObject: CsvRowAsJson = {
      uuid_for_edition: uuidv4()
    };

    headers.forEach((header, index) => {
      rowObject[header.uuid_for_edition] = csvRow[index];
    });

    return rowObject;
  });

  return { header: headers, data: csvAsJson };
};