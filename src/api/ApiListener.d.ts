import { IApiListener } from "./IApiListener.js";
import { ExposedApiRoutesMetadata, ApiRouteMetadata } from "./ExposedApiEnpointsMetadata.js";
import { ISystemRequest } from "../http/ISystemRequest.js";
import pathToRegExp from 'path-to-regexp';
export declare abstract class ApiListener implements IApiListener {
    private endpointsByURLCache;
    protected getAllApiRoutes(): {
        [url: string]: ApiRouteMetadata & {
            matcherFn: pathToRegExp.MatchFunction<object>;
        };
    };
    abstract get name(): string;
    abstract baseUrl(): string;
    abstract exposedApiRoutes(): ExposedApiRoutesMetadata;
    answerRequest(request: ISystemRequest): Promise<any>;
    /**
     * Call API Function
     * ------------------
     *
     * Call a function of the class if it was exposed!
     * @param functionName
     * @param request
     */
    callApiFunction(functionName: string, request: ISystemRequest): any;
    /**
     * Execute
     * --------
     * Execute a function passing the request as its first parameter!
     *
     * @param fn Function name
     * @param request SystemRequest that originated the route call
     */
    protected execute(fn: string, request: ISystemRequest): any;
}
