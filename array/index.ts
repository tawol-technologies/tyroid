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

export const iterate = <T> (array: T[], callback: (item: T, isLast: boolean, index?: number)=>void): void => {
    
    array.forEach((entry, index) => {
        callback(entry, array.length-1 === index, index);
    });
}

export const subtract = (operand1: string[], operand2: string[]): string [] => {
    return operand1.filter(str => !operand2.includes(str));
}

export const arrays = {
    mergeObjects,
    iterate,
    subtract
};