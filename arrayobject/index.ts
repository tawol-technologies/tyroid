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

export const charsIncluded = (data: string, chars: string[]): number => {
    let counter: number = 0;
    for (let i = 0; i < chars.length; i++) {
        if(data.includes(chars[i])) {
            counter++;
        }
    }
    return counter;
}

export const search = (data: Array<Record<string, object>>, value: string): Array<Record<string, object>> => {
    let res:Array<Record<string, object>> = [];
    const searchChars: string[] = value.split("");
    let elementMatchCounter: number = 0;
    data.forEach(element => {
        let objMatchCounter: number = 0;
        for (const key in element) {
            const num: number = charsIncluded(element[key]+"" , searchChars)
            if (num > objMatchCounter) {
                objMatchCounter = num;
            }
        }
        //To make sure perfect match comes first
        if (objMatchCounter > elementMatchCounter) {
            elementMatchCounter = objMatchCounter;
            res.unshift(element);
        }
        else if(objMatchCounter !== 0) {
            res.push(element);
        }
    });
    return res;
}

export default {
    getKeyValues, charsIncluded, search
}