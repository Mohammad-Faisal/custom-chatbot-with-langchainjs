"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isString = exports.isFloat = exports.isInt = exports.isFilterEmpty = exports.isObject = void 0;
/**
 * Checks if the provided argument is an object and not an array.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isObject(obj) {
    return obj && typeof obj === "object" && !Array.isArray(obj);
}
exports.isObject = isObject;
/**
 * Checks if a provided filter is empty. The filter can be a function, an
 * object, a string, or undefined.
 */
function isFilterEmpty(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
filter) {
    if (!filter)
        return true;
    // for Milvus
    if (typeof filter === "string" && filter.length > 0) {
        return false;
    }
    if (typeof filter === "function") {
        return false;
    }
    return isObject(filter) && Object.keys(filter).length === 0;
}
exports.isFilterEmpty = isFilterEmpty;
/**
 * Checks if the provided value is an integer.
 */
function isInt(value) {
    const numberValue = parseFloat(value);
    return !Number.isNaN(numberValue) && numberValue % 1 === 0;
}
exports.isInt = isInt;
/**
 * Checks if the provided value is a floating-point number.
 */
function isFloat(value) {
    const numberValue = parseFloat(value);
    return !Number.isNaN(numberValue) && numberValue % 1 !== 0;
}
exports.isFloat = isFloat;
/**
 * Checks if the provided value is a string that cannot be parsed into a
 * number.
 */
function isString(value) {
    return typeof value === "string" && Number.isNaN(parseFloat(value));
}
exports.isString = isString;
