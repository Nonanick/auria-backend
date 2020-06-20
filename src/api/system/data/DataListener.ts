import { ApiListener } from "../../ApiListener.js";
import { ExposedApiRoutesMetadata } from "../../ExposedApiEnpointsMetadata.js";
import { ApiRoute } from "../../ApiEndpoint.js";
import { DataReadRequest } from "../../../data/repository/read/DataReadRequest.js";

export class DataListener extends ApiListener {

    public get name(): string {
        return "DataListener";
    }

    public baseUrl(): string {
        return "data";
    }

    public exposedApiRoutes(): ExposedApiRoutesMetadata {
        return {
            "read": {
                functionName: "read",
                requiredParams: ["from"],
                optionalParams: ["filter", "limit", "page", "order", "considerAsFirst"],
                allowGuestUser: false,
            }
        }
    }

    protected read: ApiRoute = (req) => {
        const from = req.parameters['from'];
        let readRequest = new DataReadRequest(from);
    };


}