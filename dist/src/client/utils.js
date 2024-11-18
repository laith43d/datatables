import { check } from './';
export const isNull = (value) => {
    if (value === null || value === undefined || value === '')
        return true;
    return false;
};
export const isNotNull = (value) => { return !isNull(value); };
export const stringify = (value = null) => {
    return String(value)
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
};
export const parseField = (field, uuid) => {
    if (typeof field === 'string') {
        return {
            callback: (row) => row[field],
            id: uuid,
            key: field,
        };
    }
    else if (typeof field === 'function') {
        return {
            callback: field,
            id: uuid,
            key: undefined,
        };
    }
    throw new Error(`Invalid field argument: ${String(field)}`);
};
export const match = (entry, value, compare = check.isLike) => {
    if (isNull(value)) {
        return true;
    }
    else if (entry !== null && typeof entry === 'object') {
        return Object.keys(entry).some((k) => {
            return match(entry[k], value, compare);
        });
    }
    return compare(entry, value);
};
export const nestedFilter = (entry, value, highlight = false, compare = undefined) => {
    if (Array.isArray(entry)) {
        entry = entry.filter((item) => {
            const check = match(item, value, compare);
            if (typeof item === 'object' && check === true) {
                for (const k of Object.keys(item)) {
                    item[k] = nestedFilter(item[k], value, highlight, compare);
                }
            }
            return check;
        });
    }
    if (highlight && (typeof entry === 'string' || typeof entry === 'number') && typeof value === 'string' && match(entry, value, compare)) {
        return emphasize(entry, value);
    }
    return entry;
};
const emphasize = (entry, value) => {
    const search = value
        .replace(/a/g, '[aàâáä]')
        .replace(/e/g, '[eèêéë]')
        .replace(/i/g, '[iìîíï]')
        .replace(/o/g, '[oòôо́ö]')
        .replace(/u/g, '[uùûúü]')
        .replace(/y/g, '[yỳŷýÿ]');
    const exp = new RegExp(`${search}`, 'gi');
    return String(entry).replace(exp, `<u class="highlight">$&</u>`);
};
export const deepEmphasize = (row, callback, value) => {
    const path = callback.toString()
        .split('=>')[1]
        .replace(/\(\)/g, '')
        .replace(/\?/g, '')
        .split('.').splice(1).join('.')
        .trim();
    if (path.indexOf(' ') > -1)
        return row;
    return deepSet(row, path, value);
};
const deepSet = (object, path, value) => {
    const initial = object;
    const keys = path.replace(/\[/g, '.[').split(".");
    try {
        for (let i = 0; i < keys.length; i++) {
            let current = keys[i];
            let next = keys[i + 1];
            if (current.includes('[')) {
                current = String(parseInt(current.substring(1, current.length - 1)));
            }
            if (next && next.includes('[')) {
                next = String(parseInt(next.substring(1, next.length - 1)));
            }
            if (next !== undefined) {
                object[current] = object[current] ? object[current] : (isNaN(Number(next)) ? {} : []);
            }
            else {
                object[current] = emphasize(object[current], value);
            }
            object = object[current];
        }
        return initial;
    }
    catch (_) {
        return initial;
    }
};
export const sort = {
    asc: (a, b, locales, options) => {
        if (a === b)
            return 0;
        else if (isNull(a))
            return 1;
        else if (isNull(b))
            return -1;
        else if (typeof a === 'boolean')
            return a === false ? 1 : -1;
        else if (typeof a === 'string')
            return a.localeCompare(b, locales, options);
        else if (typeof a === 'number')
            return a - b;
        else if (typeof a === 'object')
            return JSON.stringify(a).localeCompare(JSON.stringify(b), locales, options);
        return String(a).localeCompare(String(b), locales, options);
    },
    desc: (a, b, locales, options) => {
        if (a === b)
            return 0;
        else if (isNull(a))
            return 1;
        else if (isNull(b))
            return -1;
        else if (typeof b === 'boolean')
            return b === false ? 1 : -1;
        else if (typeof b === 'string')
            return b.localeCompare(a, locales, options);
        else if (typeof b === 'number')
            return b - a;
        else if (typeof b === 'object')
            return JSON.stringify(b).localeCompare(JSON.stringify(a), locales, options);
        else
            return String(b).localeCompare(String(a), locales, options);
    }
};
