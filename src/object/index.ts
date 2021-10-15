function excludeObjectEntries<T>(object: Record<string, unknown>, entryKeys: Array<string>): T {
    let newObject: Record<string, unknown> = {};
    Object.entries(object).forEach((item: [string, unknown]) => {
      if (!entryKeys.includes(item[0])) {
        newObject = { ...newObject, [item[0]]: item[1] };
      }
    });
    return newObject as T;
  }
  
  function objectToFormData(object: Record<string, string|Blob>): FormData {
    const form = new FormData();
    return Object.entries(object).reduce((result: FormData, [key, value]) => {
      result.append(key, value);
      return result;
    }, form);
  }

  export const objects = {
      excludeObjectEntries, objectToFormData
  }