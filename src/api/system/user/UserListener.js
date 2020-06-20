import { Guest_Username } from "../../../user/User.js";
import { SystemApiListener } from "../SystemApiListener.js";
export class UserListener extends SystemApiListener {
    constructor() {
        super(...arguments);
        this.info = (req) => {
            var _a, _b;
            if (((_a = req.getUser()) === null || _a === void 0 ? void 0 : _a.username) != Guest_Username) {
                return (_b = req.getUser()) === null || _b === void 0 ? void 0 : _b.getUserInfo().then(info => info.asJSON());
            }
            else {
                return "Guest User does not have any attached info!";
            }
        };
    }
    get name() {
        return "UserRelatedRoutines";
    }
    baseUrl() {
        return "user";
    }
    exposedApiRoutes() {
        return {
            "info": {
                functionName: "info"
            }
        };
    }
}
//# sourceMappingURL=UserListener.js.map