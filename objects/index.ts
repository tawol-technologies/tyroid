/**
 * It excludes key(s) from an object.
 * @param object The object from which entries are to be removed. 
 * @param entryKeys The entry keys
 * @returns The specified type.
 */
function excludeObjectEntries<T>(object: Record<string, unknown>, entryKeys: Array<string>): T {
    let newObject: Record<string, unknown> = {};
    Object.entries(object).forEach((item: [string, unknown]) => {
      if (!entryKeys.includes(item[0])) {
        newObject = { ...newObject, [item[0]]: item[1] };
      }
    });
    return newObject as T;
  }
  
  /**
   * It appends each entry of an object into am instace of a FormData and returns the instance.
   * @param object The object of key and value Record<string, string|Blob>.
   * @returns FormData.
   */
  function objectToFormData(object: Record<string, string|Blob>): FormData {
    const form = new FormData();
    return Object.entries(object).reduce((result: FormData, [key, value]) => {
      result.append(key, value);
      return result;
    }, form);
  }
  
  const isEmpty = (obj: unknown) => {
    return obj === null || obj === undefined;
  }

  export const objects = {
      excludeObjectEntries, objectToFormData
  }