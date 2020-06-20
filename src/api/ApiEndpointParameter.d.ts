import { ApiParameterSanitizer } from "./validation/ApiParameterSanitizer.js";
import { ApiParameterValidator } from "./validation/ApiParameterValidator.js";
import { IParameterDataType } from "./validation/dataType/IParameterDataType.js";
/**
 * [API] Parameter
 * -----------------
 * Defines type, validation, sanitizers and source
 * for a parameter!
 */
export interface ApiEndpointParameter {
    /**
     * Name
     * -----
     * Name of the parameter
     */
    name: string;
    /**
     * Data Type
     * ----------
     * By defining its data type the system can apply "global" and "centralized" sanitizers
     * ans validators!
     */
    dataType?: IParameterDataType;
    /**
     * Sanitizers
     * ----------
     * CHANGES the parameter eliminating undesired values or transforming them
     * this function CANNOT stop the request flow!
     */
    sanitizers?: ApiParameterSanitizer | ApiParameterSanitizer[];
    /**
     * Validators
     * ----------
     * Functions that check if the value passed is "valid"
     * failure to meet these will result in the endpoint not being called
     * and the request being rejected with an error
     */
    validators?: ApiParameterValidator | ApiParameterValidator[];
    /**
     * Source
     * -------
     * Where does the parameter comes from!
     * by default it's set to 'body' which may be misleading
     * since it also contains queryString + URL parameters
     *
     * Other options includes "header" and cookie
     *
     * @default "body"
     */
    source?: "body" | "header" | "cookie";
}
