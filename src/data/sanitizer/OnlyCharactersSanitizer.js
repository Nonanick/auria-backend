/**
 * Only Characters Sanitizer
 * --------------------
 * Removes ALL characters not included in [A-z]!
 *
 * @param parameter
 */
export const OnlyCharactersSanitizer = (parameter) => {
    return String(parameter).replace(/([^A-z])*/g, '');
};
//# sourceMappingURL=OnlyCharactersSanitizer.js.map