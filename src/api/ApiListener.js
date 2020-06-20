var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import pathToRegExp from 'path-to-regexp';
import { AuriaException } from "auria-lib";
import { validateRequestWithApiMetadata } from "./validation/ApiRequestValidation.js";
import { ApiRouteNotFound } from "../exception/system/request/ApiRouteNotFound.js";
export class ApiListener {
    getAllApiRoutes() {
        if (this.endpointsByURLCache == null) {
            this.endpointsByURLCache = {};
            const routes = this.exposedApiRoutes();
            for (let url in routes) {
                if (routes.hasOwnProperty(url)) {
                    this.endpointsByURLCache[url] = Object.assign(Object.assign({}, routes[url]), {
                        matcherFn: pathToRegExp.match(url)
                    });
                }
            }
        }
        return this.endpointsByURLCache;
    }
    answerRequest(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let endpointsByURL = this.getAllApiRoutes();
            for (let url in endpointsByURL) {
                if (!endpointsByURL.hasOwnProperty(url))
                    continue;
                if (endpointsByURL[url].matcherFn(request.url)) {
                    const functionName = endpointsByURL[url].functionName;
                    try {
                        if (yield validateRequestWithApiMetadata(endpointsByURL[url], request)) {
                            return this.callApiFunction(functionName, request);
                        }
                    }
                    catch (err) {
                        if (err instanceof AuriaException) {
                            throw err;
                        }
                        else {
                            console.error("A NON AuriaException was raised!", err);
                            throw err;
                        }
                    }
                }
            }
        });
    }
    /**
     * Call API Function
     * ------------------
     *
     * Call a function of the class if it was exposed!
     * @param functionName
     * @param request
     */
    callApiFunction(functionName, request) {
        const matchesExposedFn = Array.from(Object.values(this.exposedApiRoutes())).filter((value) => {
            return value.functionName === functionName;
        });
        if (matchesExposedFn.length < 1) {
            console.error(`Failed to call api function ${functionName} it is probably NOT exposed!`);
            throw new ApiRouteNotFound("Function called is not exposed by its listener!");
        }
        if (typeof this[functionName] == "function") {
            const ans = this.execute(functionName, request);
            return ans;
        }
        else {
            console.error("[ApiListener] ERROR! This listener does not posses the function exposed ", functionName);
            throw new Error("ERROR! The exposed api route refers to a method that was NOT implemented!");
        }
    }
    /**
     * Execute
     * --------
     * Execute a function passing the request as its first parameter!
     *
     * @param fn Function name
     * @param request SystemRequest that originated the route call
     */
    execute(fn, request) {
        return this[fn](request);
    }
}
//# sourceMappingURL=ApiListener.js.map