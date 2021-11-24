/**
 * Get values of specified key as array.
 * @param data Array<{}>
 * @param key string
 * @returns Array<string>
 */
export const getKeyValues = (data: Array<Record<string, unknown>>, key: string): string[] => {
    const res: string[] = [];
    data.forEach(element => {
        res.push(element[key] as string);
    });
    return res;
}

export default {
    getKeyValues
}