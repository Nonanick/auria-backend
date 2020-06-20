import { IApiListener } from "../IApiListener.js";
import { ISystemRequest } from "../../http/ISystemRequest.js";
import { ExposedApiEndpointsMetadata } from "../ExposedApiEnpointsMetadata.js";
import { ApiRoute } from "../ApiEndpoint.js";
import { System } from "../../System.js";
export declare class SystemStatusListener implements IApiListener {
    get name(): string;
    protected system: System;
    constructor(system: System);
    exposedApiEndpoints(): ExposedApiEndpointsMetadata;
    baseUrl(): string;
    answerRequest(request: ISystemRequest): string;
    environment: ApiRoute;
    status: ApiRoute;
}
