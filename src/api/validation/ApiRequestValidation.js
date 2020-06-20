var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MissingRequiredParameter } from "../../exception/system/validation/MissingRequiredParameter.js";
import { ValidationFailed } from "../../exception/system/validation/ValidationFailed.js";
import { AuriaException } from "auria-lib";
/**
* Validate Endpoint Constraints
* ------------------------------
* Check if the request conforms to
*
* @param meta
* @param request
*/
export function validateRequestWithApiMetadata(apiMetadata, request) {
    return __awaiter(this, void 0, void 0, function* () {
        const bodyParams = request.parameters;
        const cookies = request.cookies;
        const headers = request.headers;
        // Validate Required Parameters
        if (apiMetadata.requiredParams) {
            for (let paramName of apiMetadata.requiredParams) {
                if (typeof paramName === "string") {
                    if (request.parameters[paramName] === undefined) {
                        console.error("ERROR! Requested parameter is not present in the request!", paramName);
                        throw new MissingRequiredParameter(`Parameter ${paramName} is required in this api but was not passed!`);
                    }
                }
                else {
                    let checkIn;
                    switch (paramName.source) {
                        case undefined:
                        case "body":
                            checkIn = bodyParams;
                            break;
                        case "cookie":
                            checkIn = cookies;
                            break;
                        case "header":
                            checkIn = headers;
                            break;
                    }
                    if (checkIn[paramName.name] === undefined) {
                        console.error("ERROR! Requested parameter is not present in the request!", paramName.name);
                        throw new MissingRequiredParameter(`Parameter ${paramName} is required in this api but was not passed!`);
                    }
                    else if (!(yield validateApiParam(paramName, request))) {
                        throw new ValidationFailed(`Validation for parameter ${paramName} failed! Please check the expected input for this api!`);
                    }
                }
            }
        }
        // Validate optional parameters
        if (apiMetadata.optionalParams) {
            for (let paramName of apiMetadata.optionalParams) {
                if (typeof paramName !== "string") {
                    let valid = yield validateApiParam(paramName, request);
                    if (!valid) {
                        throw new ValidationFailed(`Validation for parameter ${paramName} failed! Please check the expected input for this api!`);
                    }
                }
            }
        }
        // Access Rules and Internal Redirects are handled by AccessPolicyEnforcer!
        return true;
    });
}
/**
 * Validates a single API Parameter specification
 * -----------------------------------------------
 *
 * Check if all conditions set by *ApiEndpointParameter* are met by the request object!
 *
 * @param apiParam ApiEndpointParameter with all constraints and sanitizers meant to be used on the request!
 * @param request
 */
export function validateApiParam(apiParam, request) {
    return __awaiter(this, void 0, void 0, function* () {
        let checkIn;
        switch (apiParam.source) {
            case undefined:
            case "body":
                checkIn = request.parameters;
                break;
            case "cookie":
                checkIn = request.cookies;
                break;
            case "header":
                checkIn = request.headers;
                break;
        }
        //Data Type: Applies generic sanitizers/validations!
        if (apiParam.dataType) {
            const dType = apiParam.dataType;
            if (dType.sanitizers) {
                checkIn[apiParam.name] = yield runSanitizers(apiParam.name, checkIn[apiParam.name], dType.sanitizers);
            }
            if (dType.validators) {
                try {
                    yield runValidators(apiParam.name, dType.validators, checkIn[apiParam.name]);
                }
                catch (exc) {
                    if (exc instanceof AuriaException)
                        throw exc;
                    else {
                        console.error("[RequestValidator] Unexpected failure on parameter validation! DataType Validation!", dType.name, exc);
                        throw exc;
                    }
                }
            }
        }
        // Api Defined sanitizers!
        if (apiParam.sanitizers) {
            checkIn[apiParam.name] = yield runSanitizers(apiParam.name, checkIn[apiParam.name], apiParam.sanitizers);
        }
        // Validate
        if (apiParam.validators) {
            try {
                yield runValidators(apiParam.name, apiParam.validators, checkIn[apiParam.name]);
            }
            catch (exc) {
                if (exc instanceof AuriaException)
                    throw exc;
                else {
                    console.error("[RequestValidator] Unexpected failure on parameter validation!", exc);
                    throw exc;
                }
            }
        }
        return true;
    });
}
/**
 * Run Validators
 * ---------------
 *
 * @param parameter The name of the parameter baing validated
 * @param validators All the validators to be applied
 * @param value
 */
function runValidators(parameter, validators, value) {
    return __awaiter(this, void 0, void 0, function* () {
        if (Array.isArray(validators)) {
            for (let validator of validators) {
                let valid = yield validator(value);
                if (valid !== true) {
                    console.error("ERROR! Validation failed on parameter ", parameter, "! ", valid);
                    throw new ValidationFailed("Validation failed on parameter " + parameter) + "! - " + valid;
                }
            }
        }
        else {
            let valid = yield validators(value);
            if (valid !== true) {
                console.error("ERROR! Validation failed on parameter ", parameter, "! ", valid);
                throw new ValidationFailed("Validation failed on parameter " + parameter);
            }
        }
        return true;
    });
}
function runSanitizers(parameter, value, sanitizers) {
    return __awaiter(this, void 0, void 0, function* () {
        if (Array.isArray(sanitizers)) {
            let oldValue;
            for (let sanitizer of sanitizers) {
                oldValue = value;
                value = yield sanitizer(value);
                // Prevent nullification of parameter!
                if (value == null) {
                    console.error(`Sanitizer function applied in ${parameter} is not retuning anything! Ignoring its return statement!`);
                    value = oldValue;
                }
            }
        }
        else {
            value = value;
        }
        return value;
    });
}
//# sourceMappingURL=ApiRequestValidation.js.map