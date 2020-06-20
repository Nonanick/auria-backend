import { SanitizerFunction } from "./SanitizerFunction.js";

/**
 * Only Characters Sanitizer
 * --------------------
 * Removes ALL characters not included in [A-z]!
 * 
 * @param parameter 
 */
export const OnlyCharactersSanitizer : SanitizerFunction<string> = (parameter: any) => {
    return String(parameter).replace(/([^A-z])*/g, '');
}