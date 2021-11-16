/**
 * It replaces all gaps with the uppercase of the succeding letter.
 * @param gapCase A gapped string
 * @returns CamelCase string
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
 * @returns string
 */
  const errorToString = (error: Error | unknown):string => {
    if (error instanceof Error) {
      return error.message;
    }
    return error as string;
  };

  const isUpperCase = (arg: string): boolean => {
    return /^[A-Z]*$/.test(arg);
  }

  const isLowerCase = (arg: string): boolean => {
    return /^[a-z]*$/.test(arg);
  }

  const destructureCamelCase = (str: string, splitter: string): string => {
    let res = str[0];
    for (let i = 1; i < str.length; i++) {
      if(isUpperCase(str[i])) {
        res += splitter + str[i];
        continue;
      }
      res += str[i];
    }
    return res;
  }

  export const strings = {
      stringToCamelCase, errorToString, isUpperCase, isLowerCase, destructureCamelCase
  }
