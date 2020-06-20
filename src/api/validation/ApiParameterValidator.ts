/**
 * Validates an 
 */
export type ApiParameterValidator = ((value: any) => boolean | string | Promise<boolean | string>);