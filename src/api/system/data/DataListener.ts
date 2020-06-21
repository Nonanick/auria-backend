import { ExposedApiRoutesMetadata } from "../../ExposedApiEnpointsMetadata.js";
import { ApiRoute } from "../../ApiEndpoint.js";
import { DataReadRequest } from "../../../data/repository/read/DataReadRequest.js";
import { System } from "../../../System.js";
import { SystemApiListener } from "../SystemApiListener.js";

export class DataListener extends SystemApiListener {


    public get name(): string {
        return "DataListener";
    }

    constructor(system: System) {
        super(system);
    }

    public baseUrl(): string {
        return "data";
    }

    public exposedApiRoutes(): ExposedApiRoutesMetadata {
        return {
            "read": {
                functionName: "read",
                requiredParams: ["from"],
                optionalParams: [{
                    name: "procedure",
                    validators: (value) => {
                        const allowedValues = ["FETCH", "COUNT", "PERMISSION"];
                        const isAllowedValue = allowedValues.includes(String(value).toLocaleUpperCase());

                        if (!isAllowedValue) {
                            return "Only " + allowedValues.join(" , ") + " values are allowed!"
                        }
                        return true;
                    }
                }, "filter", "limit", "page", "order", "considerAsFirst"],
                allowGuestUser: false,
            }
        }
    }

    protected read: ApiRoute = async (req) => {
        const from = req.parameters['from'];
        const procedure = req.parameters['procedure'] || "FETCH";
        
        let readRequest = new DataReadRequest(from);

        const readResp = await this.system.data().read(req.getUser()!, readRequest);

        return { ...readResp, models: readResp.all() };
    };


}