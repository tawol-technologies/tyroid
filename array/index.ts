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
    mergeObjects
};