import { ApiParameterSanitizer } from "../ApiParameterSanitizer.js";
import { ApiParameterValidator } from "../ApiParameterValidator.js";

export interface IParameterDataType {
    /**
     * Name of the Data Type
     * ---------------------
     * 
     */
    name : string;
    /**
     * Sanitizers
     * -----------
     * 
     * Change the value of the parameter
     * Usually perform operations taking out / converting dangerous characters
     */
    sanitizers? : ApiParameterSanitizer | ApiParameterSanitizer[];

    /**
     * Validators
     * ----------
     * ! (NOTICE: validators are run AFTER all sanitizers, so original value migth change)
     * 
     * Check if the value is considered acceptable/valid
     */
    validators? : ApiParameterValidator | ApiParameterValidator[];
    
}