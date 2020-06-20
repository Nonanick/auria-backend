import { IApiListener } from "../../IApiListener.js";
import { ISystemRequest } from "../../../http/ISystemRequest.js";
import { ExposedApiRoutesMetadata } from "../../ExposedApiEnpointsMetadata.js";
import { ApiRoute } from "../../ApiEndpoint.js";
import { System } from "../../../System.js";

export class SystemStatusListener implements IApiListener {

    public get name(): string { return "SystemStatus" };

    protected system: System;

    constructor(system: System) {
        this.system = system;
    }

    public exposedApiRoutes(): ExposedApiRoutesMetadata {
        return {
            "env": {
                functionName : "environment"
            },
            "status": {
                functionName: "status"
            }
        }
    }

    public baseUrl(): string {
        return "status";
    }

    public answerRequest(request: ISystemRequest) {
        return "ok";
    }

    public environment: ApiRoute = (req) => {
        
    };

    public status: ApiRoute = (req) => {

    };

}