
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




/**
 * It destructures all objects in the array into an object and returns it.
 * @param objects Array<{}>
 * @returns object
 */
 export const mergeObjects = (objects: {}[]):{} => {
    let obj:{} = {};
    objects.forEach(o => obj = {...obj, ...o});
    return obj;
}

export const arrays = {
    mergeObjects, 
    arrayOfNumberToPercentage
};