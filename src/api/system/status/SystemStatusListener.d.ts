import { IApiListener } from "../../IApiListener.js";
import { ISystemRequest } from "../../../http/ISystemRequest.js";
import { ExposedApiRoutesMetadata } from "../../ExposedApiEnpointsMetadata.js";
import { ApiRoute } from "../../ApiEndpoint.js";
import { System } from "../../../System.js";
export declare class SystemStatusListener implements IApiListener {
    get name(): string;
    protected system: System;
    constructor(system: System);
    exposedApiRoutes(): ExposedApiRoutesMetadata;
    baseUrl(): string;
    answerRequest(request: ISystemRequest): string;
    environment: ApiRoute;
    status: ApiRoute;
}
