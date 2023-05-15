/**
 * Get values of specified key as array.
 * @param data Array<{}>
 * @param key string
 * @return Array<string>
 */
export const getKeyValues = (data: Array<Record<string, unknown>>, key: string): string[] => {
  const res: string[] = [];
  data.forEach((element) => {
    res.push(element[key] as string);
  });
  return res;
};

export const countCharsInData = (data: string, chars: string[]): number => {
  let counter: number = 0;
  for (let i = 0; i < chars.length; i++) {
    if (data.includes(chars[i])) {
      counter++;
    }
  }
  return counter;
};

export const sortObjectValuesByChars = (data: Array<Record<string, object>>, searchChars: string[]): Array<Record<string, object>> => {
  const res:Array<Record<string, object>> = [];
  let elementMatchCounter: number = 0;
  data.forEach((element) => {
    let objMatchCounter: number = 0;
    for (const key in element) {
      let num: number = 0;
      if (key.includes(searchChars.join(','))) {
        num = searchChars.length;
      } else {
        num = countCharsInData(element[key]+'', searchChars);
      }
      if (num > objMatchCounter) {
        objMatchCounter = num;
      }
    }
    // To make sure perfect match comes first
    if (objMatchCounter > elementMatchCounter) {
      elementMatchCounter = objMatchCounter;
      res.unshift(element);
    } else if (objMatchCounter !== 0) {
      res.push(element);
    }
  });
  return res;
};

export default {
  getKeyValues, countCharsInData, sortObjectValuesByChars,
};
