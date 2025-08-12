import { isObject } from "lodash-es"
export const setStorageItem = (key, value) => {
    console.log(value);

    if (window.utools && window.utools.dbStorage) {
        return window.utools.dbStorage.setItem(key, value);
    }
    return localStorage.setItem(key, isObject(value) ? JSON.stringify(value) : value);
}

export const getStorageItem = (key) => {
    if (window.utools && window.utools.dbStorage) {
        return window.utools.dbStorage.getItem(key);
    }
    const value = localStorage.getItem(key)
    return value || JSON.parse(value);
} 