var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DataReadRequest } from "../../../data/repository/read/DataReadRequest.js";
import { SystemApiListener } from "../SystemApiListener.js";
export class DataListener extends SystemApiListener {
    constructor(system) {
        super(system);
        this.read = (req) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const from = req.parameters.from;
            //const procedure = req.parameters.procedure || "FETCH";
            let readRequest = new DataReadRequest(from);
            if (req.parameters.limit)
                readRequest.limit = req.parameters.limit;
            if (req.parameters.page)
                readRequest.page = req.parameters.page;
            if (req.parameters.order) {
                if (typeof req.parameters.order === "string") {
                    readRequest.order = req.parameters.order;
                }
                else {
                    if (req.parameters.order.by != null) {
                        readRequest.order = {
                            by: req.parameters.order.by,
                            direction: String((_a = req.parameters.order.direction) !== null && _a !== void 0 ? _a : "ASC").toLocaleUpperCase()
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
                }
                else {
                    readRequest.addFilter("User Filter", req.parameters['filter']);
                }
            }
            const readResp = yield this.system.data().read(req.getUser(), readRequest);
            return Object.assign(Object.assign({}, readResp), { models: readResp.all() });
        });
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
                optionalParams: [{
                        name: "procedure",
                        validators: (value) => {
                            const allowedValues = ["FETCH", "COUNT", "PERMISSION"];
                            const isAllowedValue = allowedValues.includes(String(value).toLocaleUpperCase());
                            if (!isAllowedValue) {
                                return "Only " + allowedValues.join(" , ") + " values are allowed!";
                            }
                            return true;
                        }
                    }, "filter", "limit", "page", "order", "considerAsFirst"],
                allowGuestUser: false,
            }
        };
    }
}
//# sourceMappingURL=DataListener.js.map