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
            const from = req.parameters['from'];
            const procedure = req.parameters['procedure'] || "FETCH";
            let readRequest = new DataReadRequest(from);
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