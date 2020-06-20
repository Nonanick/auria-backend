import { SanitizerFunction } from "./SanitizerFunction.js";
/**
 * Custom URI Sanitizer
 * --------------------
 * Only allows values that are valid 'path pieces', that means:
 *   On first position: [A-z] characters only
 *   Index<>0: [A-z][0-9]_- characters only
 * @param parameter
 */
export declare const CustomURISanitizer: SanitizerFunction<string>;
