
/**
 * 
 * @param data numbers
 * @returns 
 */
const  addAll = (data: Array<any>) => {
    let res = 0;
    for (let k = 0; k < data.length; k++) {
      res += parseFloat(data[k]);
    }
    return res;
  }

/**
 * Generate array percentage
 */

const percent = 100;
const arrayOfNumberToPercentage = (arr: Array<number>) => {
    return arr.map(x => x / addAll(arr) * percent);
}




export const arrays = {
    arrayOfNumberToPercentage
};