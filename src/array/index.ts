
/**
 *
 * @param data numbers
 * @returns
 */
const addAll = (array: Array<number>) => {
  return array.reduce((result, entry) => {
    return result + entry;
  }, 0);
};

/**
 * Generate array percentage
 */

const arrayOfNumberToPercentage = (arr: Array<number>): Array<number> => {
  return arr.map((x) => x / addAll(arr) * 100);
};


/**
 * It destructures all objects in the array into an object and returns it.
 * @param objects Array<{}>
 * @return object
 */
export const mergeObjects = (objects: Record<string, unknown>[]):Record<string, unknown> => {
  let obj:Record<string, unknown> = {};
  objects.forEach((o) => obj = {...obj, ...o});
  return obj;
};

export const iterate = <T> (array: T[], callback: (item: T, isLast: boolean, index?: number)=>void): void => {
  array.forEach((entry, index) => {
    callback(entry, array.length-1 === index, index);
  });
};

/**
 * Remove operand2 from operand1, then returns items left in operand1
 *
 * @param operand1 Array<string>
 * @param operand2 Array<string>
 * @return Array<string>
 */
export const subtract = (operand1: string[], operand2: string[]): string [] => {
  return operand1.filter((str) => !operand2.includes(str));
};

export const arrays = {
  mergeObjects,
  arrayOfNumberToPercentage,
  iterate,
  subtract,
};
