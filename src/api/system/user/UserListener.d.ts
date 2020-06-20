import { IApiListener } from "../../IApiListener.js";
import { ExposedApiRoutesMetadata } from "../../ExposedApiEnpointsMetadata.js";
import { ApiRoute } from "../../ApiEndpoint.js";
import { SystemApiListener } from "../SystemApiListener.js";
export declare class UserListener extends SystemApiListener implements IApiListener {
    get name(): string;
    baseUrl(): string;
    exposedApiRoutes(): ExposedApiRoutesMetadata;
    protected info: ApiRoute;
}
