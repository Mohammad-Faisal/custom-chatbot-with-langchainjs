/**
 * Checks if the provided argument is an object and not an array.
 */
export declare function isObject(obj: any): obj is object;
/**
 * Checks if a provided filter is empty. The filter can be a function, an
 * object, a string, or undefined.
 */
export declare function isFilterEmpty(filter: ((q: any) => any) | object | string | undefined): filter is undefined;
/**
 * Checks if the provided value is an integer.
 */
export declare function isInt(value: unknown): boolean;
/**
 * Checks if the provided value is a floating-point number.
 */
export declare function isFloat(value: unknown): boolean;
/**
 * Checks if the provided value is a string that cannot be parsed into a
 * number.
 */
export declare function isString(value: unknown): boolean;
