/**
 * It destructures all objects in the array into an object and returns it.
 * @param objects Array<{}>
 * @returns object
 */
 export const mergeObjects = (objects: Record<string, unknown>[]):Record<string, unknown> => {
    let obj:Record<string, unknown> = {};
    objects.forEach(o => obj = {...obj, ...o});
    return obj;
}

export const iterate = <T>(array: T[], callback: (item: T, isLast: boolean, index?: number)=>void) => {
    
    array.forEach((entry, index) => {
        callback(entry, array.length-1 === index, index);
    });
}
export const arrays = {
    mergeObjects,
    iterate
};