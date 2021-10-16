import * as XLSX from 'xlsx';
import { strings } from './../strings/index';

const getExtFromMime = (mime: string, prefixDot?: boolean): string => {
  const slashIndex = mime.lastIndexOf('/');
  if (slashIndex >= 0) {
    return prefixDot ? `.${mime.substring(slashIndex + 1)}` : mime.substring(slashIndex + 1);
  }
  return '';
};

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

const readFile = (file: File, resultType: 'blob'|'arraybuffer'|'binary'|'text'): Promise<string | ArrayBuffer> => new Promise((resolve, reject) => {
  try {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (result) {
        resolve(result);
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

const sheetToJsonArray = (file: File, callback?: (jsonArray: Record<string, string>[]) => void): Promise<Record<string, string>[]> => {
  const rowDelimeter = '^^^';
  const columnDelimeter = '%%%';

  return new Promise((resolve, reject) => {
    try {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const buffer = e.target?.result;

        const workbook = XLSX.read(buffer, { type: 'binary' });
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

const renameFile = async (file: File, newName: string):Promise<File> => {
  const arrayBuffer = await file.arrayBuffer();
  return new File([new Int8Array(arrayBuffer)], newName + getExtFromMime(file.type, true), { type: file.type, lastModified: file.lastModified });
};


export const files = {
    getExtFromMime, csvToJSON, readFile, sheetToJsonArray, renameFile
}
