import { v4 as uuidv4 } from 'uuid';

import type { CsvRowAsJson, MappedCsvToJson } from '@/models/core';

/**
 * This method turns a csv passed as string into a valid json.
 * To handle linebreaks within cells and single quotes in combination with double quotes, we iterate through
 * every character of the given string
 * @param csv {string} - content of a csv file
 * @return literate Object with header as keys
 */
export const mapCsvToJson = (csv: string): MappedCsvToJson | undefined => {
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

        case ',':
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

  const headers: string[] | undefined = rows.shift();

  if (!rows || !headers) return undefined;

  const jsonData: CsvRowAsJson[] = rows.map(csvRow => {
    const obj: CsvRowAsJson = {
      uuid_for_edition: uuidv4()
    };

    headers.forEach((header, index) => {
      obj[header] = csvRow[index];
    });

    return obj;
  });

  return { header: headers, data: jsonData };
};