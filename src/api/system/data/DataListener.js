import { ApiListener } from "../../ApiListener.js";
import { DataReadRequest } from "../../../data/repository/read/DataReadRequest.js";
export class DataListener extends ApiListener {
    constructor() {
        super(...arguments);
        this.read = (req) => {
            const from = req.parameters['from'];
            let readRequest = new DataReadRequest(from);
        };
    }
    get name() {
        return "DataListener";
    }
    baseUrl() {
        return "data";
    }
    exposedApiRoutes() {
        return {
            "read": {
                functionName: "read",
                requiredParams: ["from"],
                optionalParams: ["filter", "limit", "page", "order", "considerAsFirst"],
                allowGuestUser: false,
            }
        };
    }
}
//# sourceMappingURL=DataListener.js.map