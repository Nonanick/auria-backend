import { ApiRouteMetadata } from "../ExposedApiEnpointsMetadata.js";
import { ISystemRequest } from "../../http/ISystemRequest.js";
import { ApiEndpointParameter } from "../ApiEndpointParameter.js";
/**
* Validate Endpoint Constraints
* ------------------------------
* Check if the request conforms to
*
* @param meta
* @param request
*/
export declare function validateRequestWithApiMetadata(apiMetadata: ApiRouteMetadata, request: ISystemRequest): Promise<boolean | string>;
/**
 * Validates a single API Parameter specification
 * -----------------------------------------------
 *
 * Check if all conditions set by *ApiEndpointParameter* are met by the request object!
 *
 * @param apiParam ApiEndpointParameter with all constraints and sanitizers meant to be used on the request!
 * @param request
 */
export declare function validateApiParam(apiParam: ApiEndpointParameter, request: ISystemRequest): Promise<boolean>;
