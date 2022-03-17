import * as XLSX from 'xlsx';
import {strings} from './../strings/index';

/**
 *
 * @param mime  The mime type e.g application/json
 * @param prefixDot It adds prefix the result with a dot if true.
 * @return the mime's lower bound e.g application/json will return json.
 */
const getExtFromMime = (mime: string, prefixDot?: boolean): string => {
  const slashIndex = mime.lastIndexOf('/');
  if (slashIndex >= 0) {
    return prefixDot ? `.${mime.substring(slashIndex + 1)}` : mime.substring(slashIndex + 1);
  }
  return '';
};

/**
 * It cinverts a CSV file into and
 * @param csv The comma delimited sheet.
 * @param rowDelimeter The row delimeter used in the sheet.
 * @param columnsDelimeter The columns delimeter used in the sheet
 * @return Record<string, string>[]
 */
const csvToJSON = (csv: string, rowDelimeter: string, columnsDelimeter: string): Record<string, string>[] => {
  const rows: string[] = csv.split(rowDelimeter);

  const header: string | undefined = rows.shift();

  if (typeof header === 'string') {
    const tempHeaders: string[] = header.split(columnsDelimeter);
    const headers: string[] = [];
    tempHeaders.reduce((mHeader: string[], item) => {
      mHeader.push(strings.stringToCamelCase(item));
      return mHeader;
    }, headers);

    return rows.map((row) => {
      const columns: string[] = row.split(columnsDelimeter);

      const json: { [key: string]: string } = {};

      for (let i = 0; i < columns.length; i += 1) {
        json[headers[i]] = columns[i];
      }
      return json;
    });
  }
  return [];
};

/**
 * It reads a file and return a datatype.
 * @param file The file to be read
 * @param resultType The returned result type and denotes how the file should be read.
 * @return It returns a promise of string or arrayBuffer.
 */
const readFile = <T>(file: File, resultType: 'blob'|'arraybuffer'|'binary'|'text'): Promise<T> => new Promise((resolve, reject) => {
  try {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result: unknown = e.target?.result;
      if (result) {
        resolve(result as T);
      } else {
        throw new Error(`Result is ${result}. Check file or responseType.`);
      }
    };
    switch (resultType) {
      case 'blob':
        reader.readAsDataURL(file);
        break;
      case 'binary':
        reader.readAsBinaryString(file);
        break;
      case 'arraybuffer':
        reader.readAsArrayBuffer(file);
        break;
      default:
        reader.readAsText(file);
        break;
    }
  } catch (e) {
    reject(e);
  }
});

/**
 * It returns an array of objects from the a worksheet.
 * @param file The sheet file.
 * @param callback The array of objects.
 * @return Promise<Record<string, string>[]>.
 */
const sheetToArray = (file: File, callback?: (jsonArray: Record<string, string>[]) => void): Promise<Record<string, string>[]> => {
  const rowDelimeter = '^^^';
  const columnDelimeter = '%%%';

  return new Promise((resolve, reject) => {
    try {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const buffer = e.target?.result;

        const workbook = XLSX.read(buffer, {type: 'binary'});
        const sheetOption = {
          skipHidden: true, strip: true, RS: rowDelimeter, FS: columnDelimeter,
        };
        const data = csvToJSON(XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]], sheetOption), rowDelimeter, columnDelimeter);
        const validKeyLength = Object.keys(data[0]).length;
        const filterValidRows = data.filter((row) => Object.keys(row).length === validKeyLength);
        if (callback) {
          callback(filterValidRows);
        }
        resolve(filterValidRows);
      };
      fileReader.readAsBinaryString(file);
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * It renames a file.
 * @param file The Fle to be renamed.
 * @param newName The new name.
 * @return Promise<File>
 */
const renameFile = async (file: File, newName: string):Promise<File> => {
  const arrayBuffer = await file.arrayBuffer();
  return new File([new Int8Array(arrayBuffer)], newName + getExtFromMime(file.type, true), {type: file.type, lastModified: file.lastModified});
};


export const files = {
  getExtFromMime, csvToJSON, readFile, sheetToArray, renameFile,
};
