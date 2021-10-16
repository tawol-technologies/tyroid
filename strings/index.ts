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


  const errorToString = (error: Error | unknown):string => {
    if (error instanceof Error) {
      return error.message;
    }
    return error as string;
  };

  export const strings = {
      stringToCamelCase, errorToString
  }