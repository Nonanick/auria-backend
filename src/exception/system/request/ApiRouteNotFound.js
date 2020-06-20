import { AuriaException } from "auria-lib";
export class ApiRouteNotFound extends AuriaException {
    getCode() {
        return "SYS.REQUEST.API_ROUTE_NOT_FOUND";
    }
}
//# sourceMappingURL=ApiRouteNotFound.js.map