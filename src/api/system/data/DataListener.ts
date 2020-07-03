import { ExposedApiRoutesMetadata } from "../../ExposedApiEnpointsMetadata.js";
import { ApiRoute } from "../../ApiEndpoint.js";
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
            },
            "create": {
                functionName: "create",
                requiredParams: ["entity"],
                allowGuestUser: false,
                requiresExplicitPermission: false
            }
        }
    }

    protected read: ApiRoute = async (req) => {
        /*
                const from = req.parameters.from;
                //const procedure = req.parameters.procedure || "FETCH";
        
                let readRequest = new DataReadRequest(from);
        
                if (req.parameters.limit) readRequest.limit = req.parameters.limit;
                if (req.parameters.page) readRequest.page = req.parameters.page;
        
                if (req.parameters.order) {
                    if (typeof req.parameters.order === "string") {
                        readRequest.order = req.parameters.order;
                    } else {
                        if (req.parameters.order.by != null) {
                            readRequest.order = {
                                by: req.parameters.order.by,
                                direction: String(req.parameters.order.direction ?? "ASC").toLocaleUpperCase() as any
                            };
                        }
                    }
                }
        
                if (req.parameters.pick) {
                    readRequest.pick = req.parameters.pick;
                }
        
                if (req.parameters.filter) {
                    if (Array.isArray(req.parameters.filter)) {
                        let userFilterCount = 1;
                        req.parameters['filter'].forEach((filter) => {
                            readRequest.addFilter("User Filter - " + userFilterCount++, filter);
                        });
                    } else {
                        readRequest.addFilter("User Filter", req.parameters['filter']);
                    }
                }
        
                const readResp = await this.system.data().read(req.getUser()!, readRequest);
        
                return { ...readResp, models: readResp.all() };*/
    };

    protected create: ApiRoute = async (req) => {

        const entity = req.parameters.entity; // Marked as required!

        return "Entity " + entity;
    };

}