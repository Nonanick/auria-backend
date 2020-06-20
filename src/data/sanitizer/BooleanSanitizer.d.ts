import { SanitizerFunction } from "./SanitizerFunction.js";
/**
 * Boolean Sanitizer
 * ------------------
 *
 * Uses the  native "Boolean(value)" function to transform the parameter in either True/False
 * @param value
 */
export declare const BooleanSanitizer: SanitizerFunction<boolean>;
