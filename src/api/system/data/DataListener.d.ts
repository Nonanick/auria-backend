import { ApiListener } from "../../ApiListener.js";
import { ExposedApiRoutesMetadata } from "../../ExposedApiEnpointsMetadata.js";
import { ApiRoute } from "../../ApiEndpoint.js";
export declare class DataListener extends ApiListener {
    get name(): string;
    baseUrl(): string;
    exposedApiRoutes(): ExposedApiRoutesMetadata;
    protected read: ApiRoute;
}
