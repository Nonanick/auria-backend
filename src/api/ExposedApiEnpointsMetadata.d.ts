import { ApiEndpointParameter } from "./ApiEndpointParameter.js";
import { ApiAccessRule } from "../security/apiAccess/AccessRule.js";
export declare type ApiRouteMetadata = {
    /**
     * URL
     * ----
     * Piece of URL that this endpoint will match!
     * Auria uses path-to-regexp lib meaning that
     * you can use all the features avaliable for url
     * matching!
     *
     * URL parameters are merged inside th request "body"
     */
    functionName: string;
    /**
     * Required Params
     * ---------------
     * Defines which parameters are required by this api endpoint
     * This parameters are NOT limited to the response.body + queryString
     * + url params but headers and cookies can also be defined as "required"
     * @todo properly handle the "parameter" source
     */
    requiredParams?: (ApiEndpointParameter | string)[];
    /**
     * Options Params
     * --------------
     * Defines which parameters might be passed through as optional
     * this will not prevent the user from passing non-defined parameters
     * but it's a way to validate/sanitize such values!
     */
    optionalParams?: (ApiEndpointParameter | string)[];
    /**
     * Access Rules
     * ------------
     * Functions that shall validate if the context can access the api endpoint
     * These are applied *AFTER* "Global" Access Rules and "Explicit Permission" Access Rule;
     * Global Access Rules are defined by the system and "Explicit Permission" might be turned of
     * by setting this object property "requiresExplicitPermission" to "false"!
     *
     */
    accessRules?: ApiAccessRule[] | ApiAccessRule;
    /**
     * Requeris Explicit Permission?
     * -----------------------------
     *  Define either this api endpoint NEEDs an explicit permission
     * in the database to be accessed!
     *  Public routes shoudl have this feature set to "false" so guests
     * can access it aswell
     *
     * @default true
     */
    requiresExplicitPermission?: boolean;
    /**
     * Allow Guest User
     * ----------------
     *  Define either this api endpoint can be acessed by "guest" users
     * (users that don't have an authentication associated);
     *
     * @default false
     */
    allowGuestUser?: boolean;
    /**
     * Allow Internal Redirects
     * ------------------------
     *  Define if this api endpoint can be called by another api endpoint
     * using the "redirect" feature;
     *
     *  The same request will go through ALL of the steps before reaching
     * the API meaning Access Rules will still apply!
     *
     *  When called the flow will go through the original endpoint called
     * meaning that the first api endpoint will have acces to the response
     * of the second one!
     *
     *  This behaviour can be changed by defining the configuration:
     * > "Disable_Backwards_Response_Flow" to "true"
     * @default true
     *
     */
    allowInternalRedirects?: boolean;
};
export interface ExposedApiRoutesMetadata {
    [url: string]: ApiRouteMetadata;
}
