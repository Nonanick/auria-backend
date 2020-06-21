import { ExposedApiRoutesMetadata } from "../../ExposedApiEnpointsMetadata.js";
import { ApiRoute } from "../../ApiEndpoint.js";
import { System } from "../../../System.js";
import { SystemApiListener } from "../SystemApiListener.js";
export declare class DataListener extends SystemApiListener {
    get name(): string;
    constructor(system: System);
    baseUrl(): string;
    exposedApiRoutes(): ExposedApiRoutesMetadata;
    protected read: ApiRoute;
}
