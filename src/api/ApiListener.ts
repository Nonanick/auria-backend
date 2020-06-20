import { IApiListener } from "./IApiListener.js";
import { ExposedApiRoutesMetadata, ApiRouteMetadata } from "./ExposedApiEnpointsMetadata.js";
import { ISystemRequest } from "../http/ISystemRequest.js";
import pathToRegExp from 'path-to-regexp';
import { AuriaException } from "auria-lib";
import { validateRequestWithApiMetadata } from "./validation/ApiRequestValidation.js";
import { ApiRouteNotFound } from "../exception/system/request/ApiRouteNotFound.js";
export abstract class ApiListener implements IApiListener {

    private endpointsByURLCache!: {
        [url: string]: ApiRouteMetadata & {
            matcherFn: pathToRegExp.MatchFunction;
        };
    };

    protected getAllApiRoutes() {
        if (this.endpointsByURLCache == null) {
            this.endpointsByURLCache = {};
            const routes = this.exposedApiRoutes();
            for (let url in routes) {
                if (routes.hasOwnProperty(url)) {
                    this.endpointsByURLCache[url] = {
                        ...routes[url],
                        ...{
                            matcherFn: pathToRegExp.match(url)
                        }
                    };
                }
            }
        }

        return this.endpointsByURLCache;

    }

    public abstract get name(): string;

    public abstract baseUrl(): string;

    public abstract exposedApiRoutes(): ExposedApiRoutesMetadata;

    public async answerRequest(request: ISystemRequest) {

        let endpointsByURL = this.getAllApiRoutes();

        for (let url in endpointsByURL) {
            if (!endpointsByURL.hasOwnProperty(url))
                continue;

            if (endpointsByURL[url].matcherFn(request.url)) {
                const functionName = endpointsByURL[url].functionName;
                try {
                    if (await validateRequestWithApiMetadata(endpointsByURL[url], request)) {
                        return this.callApiFunction(functionName, request);
                    }
                } catch (err) {
                    if (err instanceof AuriaException) {
                        throw err;
                    } else {
                        console.error("A NON AuriaException was raised!", err);
                        throw err;
                    }
                }
            }
        }
    }

    /**
     * Call API Function
     * ------------------
     * 
     * Call a function of the class if it was exposed!
     * @param functionName 
     * @param request 
     */
    public callApiFunction(functionName: string, request: ISystemRequest) {

        const matchesExposedFn = Array.from(Object.values(this.exposedApiRoutes())).filter((value) => {
            return value.functionName === functionName;
        });

        if (matchesExposedFn.length < 1) {
            console.error(`Failed to call api function ${functionName} it is probably NOT exposed!`);
            throw new ApiRouteNotFound("Function called is not exposed by its listener!");
        }

        if (typeof (this as any)[functionName] == "function") {
            const ans = this.execute(functionName, request);
            return ans;
        } else {
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
    protected execute(fn: string, request: ISystemRequest) {
        return (this as any)[fn](request);
    }

}