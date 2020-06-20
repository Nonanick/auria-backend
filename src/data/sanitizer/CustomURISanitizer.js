/**
 * Custom URI Sanitizer
 * --------------------
 * Only allows values that are valid 'path pieces', that means:
 *   On first position: [A-z] characters only
 *   Index<>0: [A-z][0-9]_- characters only
 * @param parameter
 */
export const CustomURISanitizer = (parameter) => {
    return String(parameter).replace(/(^[^A-z])|([^A-z-_\.0-9])*/g, '');
};
//# sourceMappingURL=CustomURISanitizer.js.map