/**
 * It replaces all gaps with the uppercase of the succeding letter.
 * @param gapCase A gapped string
 * @return CamelCase string
 */
const stringToCamelCase = (gapCase: string): string => {
  let data = '';
  let hasSpace = false;
  Array.from(gapCase).forEach((e) => {
    if (e === ' ') {
      hasSpace = true;
    } else if (hasSpace) {
      data += e.toUpperCase();
      hasSpace = false;
    } else {
      data += e;
    }
  });
  return data.replace(data.charAt(0), data.charAt(0).toLocaleLowerCase());
};

/**
 * It takes the error param of a trycatch block and returns the error message.
 * @param error catch error
 * @return string
 */
const errorToString = (error: Error | unknown):string => {
  if (error instanceof Error) {
    return error.message;
  }
  return error as string;
};

const isUpperCase = (arg: string): boolean => {
  return /^[A-Z]*$/.test(arg);
};

const isLowerCase = (arg: string): boolean => {
  return /^[a-z]*$/.test(arg);
};

const destructureCamelCase = (str: string, splitter?: string): string => {
  let res = str[0];
  for (let i = 1; i < str.length; i++) {
    if (isUpperCase(str[i])) {
      res += (splitter ?? ' ') + str[i];
      continue;
    }
    res += str[i];
  }
  return res;
};

/**
   * Build string as camel case
   * @param str
   * @param joinBy
   * @returns
   */
const buildCamelCase = (str: string, joinBy?: string): string => {
  let res = str[0];
  let transformNext = false;
  for (let i = 1; i < str.length; i++) {
    if (str[i] === (joinBy ?? '_')) {
      transformNext = true;
      continue;
    }
    if (transformNext) {
      res += str[i].toUpperCase();
      transformNext = false;
    } else {
      res += str[i];
    }
  }
  return res;
};

const randomString = (length: number) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWSYZabcdefghijklmnopqrstuvwxyz';
  let res = '';
  for (let i = 0; i < length; i++) {
    const randomNum = Math.floor(Math.random() * chars.length);
    res += chars.substring(randomNum, randomNum+1);    
  }
  return res;
}

export const strings = {
  stringToCamelCase, errorToString, isUpperCase, isLowerCase, destructureCamelCase, buildCamelCase, randomString
};
