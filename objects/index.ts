/**
 * It excludes key(s) from an object.
 * @param object The object from which entries are to be removed.
 * @param entryKeys The entry keys
 * @return The specified type.
 */
function excludeObjectEntries<T>(object: Record<string, unknown>, entryKeys: Array<string>): T {
  let newObject: Record<string, unknown> = {};
  Object.entries(object).forEach((item: [string, unknown]) => {
    if (!entryKeys.includes(item[0])) {
      newObject = {...newObject, [item[0]]: item[1]};
    }
  });
  return newObject as T;
}

/**
   * It appends each entry of an object into am instance of a FormData and returns the instance.
   * @param object The object of key and value Record<string, string|Blob>.
   * @return FormData.
   */
function objectToFormData(object: Record<string, string|Blob>): FormData {
  const form = new FormData();
  return Object.entries(object).reduce((result: FormData, [key, value]) => {
    result.append(key, value);
    return result;
  }, form);
}

const removeNull = (obj: Record<string, unknown>): Record<string, unknown> => {
  const res: Record<string, unknown> = {};
  for (const key in obj) {
    if (obj[key] !== null) {
      res[key] = obj[key];
    }
  }
  return res;
};

const extractInnerKeys = (obj: Record<string, unknown>, keys: string[]): Record<string, unknown> => {
  const res: Record<string, unknown> = {};
  const qualifiedKeys = Object.keys(obj).filter((key) => keys.includes(key));
  qualifiedKeys.forEach((key) => {
    res[key] = obj[key];
  });
  return res;
};

const removeNullAndExtractInnerKeys = (obj: Record<string, unknown>, keys: string[]): Record<string, unknown> => {
  const res: Record<string, unknown> = {};
  for (const key in obj) {
    if (obj[key] !== null) {
      res[key] = Object.values(extractInnerKeys(obj[key] as Record<string, unknown>, keys));
    }
  }
  return res;
};
export const objects = {
  excludeObjectEntries, objectToFormData, removeNull, extractInnerKeys, removeNullAndExtractInnerKeys,
};
