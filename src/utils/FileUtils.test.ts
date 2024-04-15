import { describe, expect, test } from 'vitest';

import type { CsvRowAsJson, FileImportSettings } from '@/models/core';
import { CellDelimiter, UUID_REGEX } from '@/models/core';
import {
  createEmptyRowFromHeaders,
  getFilenameWithoutExtension,
  initiateFileImportSettings,
  isValidFileName
} from '@/utils/FileUtils';
import { CsvHeadersMockArray } from '@/vitest-mocks/FileUtils.mocks';

describe('Validate a filename if it matches the conforms the standard filename rules', () => {
  test('Test if regex detects bad filenames', () => {
    const badFileName1 = 'this/is/bad';
    const badFileName2 = 'this.is.also.bad?';
    const badFileName3 = '<test';
    const badFileName4 = 'it:isbad';
    const badFileName5 = 'This;is;bad';
    const badFileName6 = '"bad filename"';
    const badFileName8 = '';
    const badFileName9 = 'b*a*d';
    const badFileName10 = 'b|a|d';

    expect(isValidFileName(badFileName1)).toBeFalsy();
    expect(isValidFileName(badFileName2)).toBeFalsy();
    expect(isValidFileName(badFileName3)).toBeFalsy();
    expect(isValidFileName(badFileName4)).toBeFalsy();
    expect(isValidFileName(badFileName5)).toBeFalsy();
    expect(isValidFileName(badFileName6)).toBeFalsy();
    expect(isValidFileName(badFileName8)).toBeFalsy();
    expect(isValidFileName(badFileName9)).toBeFalsy();
    expect(isValidFileName(badFileName10)).toBeFalsy();
  });

  test('Test if regex lets user set a valid filename', () => {
    const validFileName1: string = 'this.is.correct';
    const validFileName2: string = 'this is also correct';
    const validFileName3: string = 'this-is-fine';
    const validFileName4: string = 'this_is_fine';

    expect(isValidFileName(validFileName1)).toBeTruthy();
    expect(isValidFileName(validFileName2)).toBeTruthy();
    expect(isValidFileName(validFileName3)).toBeTruthy();
    expect(isValidFileName(validFileName4)).toBeTruthy();

  });
});

describe('Get a filename without extension but respect points set in the filename', () => {
  test('Should get the correct filename', () => {
    const fileNameExample1: string = 'example.txt';
    const fileNameExample1Expectation: string = 'example';

    expect(getFilenameWithoutExtension(fileNameExample1)).toBe(fileNameExample1Expectation);

    const fileNameExample2: string = 'example.csv.id.txt';
    const fileNameExample2Expectation: string = 'example.csv.id';

    expect(getFilenameWithoutExtension(fileNameExample2)).toBe(fileNameExample2Expectation);

    const fileNameExample3: string = 'example';
    const fileNameExample3Expectation: string = 'example';

    expect(getFilenameWithoutExtension(fileNameExample3)).toBe(fileNameExample3Expectation);
  });
});

describe('Create an empty row from headers', () => {
  const mockedHeader = CsvHeadersMockArray;
  const rowFromHeaders: CsvRowAsJson = createEmptyRowFromHeaders(mockedHeader);
  const rowObjectKeys = Object.keys(rowFromHeaders);

  test('Should create a first key for identification', () => {
    const keyForIdentification = rowObjectKeys.find((key) => key === 'uuid_for_edition');

    expect(keyForIdentification).toBeDefined();

    if(keyForIdentification) {
      const isKeyUuid = UUID_REGEX.test(rowFromHeaders['uuid_for_edition']);

      expect(isKeyUuid).toBeTruthy;
    }
  });

  test('Should use uuids to for the other header keys', () => {
    for (const key of rowObjectKeys) {
      if (key === 'uuid_for_edition') continue;
      const isUuid = UUID_REGEX.test(key);

      expect(isUuid).toBeTruthy();
    }
  });

  test('Created keys should match number of columns', () => {
    const lengthOfColumns = mockedHeader.length;
    // we deduct one from the length of the created row as it is 'uuid_for_edition' that should not be counted
    const lengthOfColumnsInCreatedRow = rowObjectKeys.length - 1;

    expect(lengthOfColumnsInCreatedRow).toBe(lengthOfColumns);
  });
});

describe('Create initial file import settings', () => {
  test('Should return a default file import settings object', () => {
    const importSettingsObject: FileImportSettings = initiateFileImportSettings();

    const expectedImportSettings = {
      useCustomFileName: false,
      customFileName: '',
      cellDelimiter: CellDelimiter.AutoDetection,
      customDelimiter: '',
      firstRowAreHeaders: true
    };

    expect(importSettingsObject).toStrictEqual(expectedImportSettings);
  });
});