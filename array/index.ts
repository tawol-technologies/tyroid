
/**
 * 
 * @param data numbers
 * @returns 
 */
const  addAll = (array: Array<any>) => {
    return array.reduce((result, entry) => { return result + entry; }, 0) ;
  }

/**
 * Generate array percentage
 */

const arrayOfNumberToPercentage = (arr: Array<number>) => {
    return arr.map(x => x / addAll(arr) * 100);
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