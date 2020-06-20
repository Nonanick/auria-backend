import { SanitizerFunction } from "./SanitizerFunction.js";

/**
 * Only Numbers Sanitizer
 * ----------------------
 * Strips the input from all non-numeric characters
 * Valid characters: [0-9] . ,
 * Tries to convert to Number using "Number(value)", if a non-valid input is sent NaN is returned!
 * 
 * @param parameter 
 */
export const OnlyNumbersSanitizer: SanitizerFunction<number> = (parameter: any) => {
    return Number(String(parameter).replace(/([^0-9\.\,])*/g, ''));
}