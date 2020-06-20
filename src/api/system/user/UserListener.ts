import { ApiListener } from "../../ApiListener.js";
import { IApiListener } from "../../IApiListener.js";
import { ExposedApiRoutesMetadata } from "../../ExposedApiEnpointsMetadata.js";
import { ApiRoute } from "../../ApiEndpoint.js";
import { Guest_Username } from "../../../user/User.js";
import { SystemApiListener } from "../SystemApiListener.js";

export class UserListener extends SystemApiListener implements IApiListener {

    public get name(): string {
        return "UserRelatedRoutines";
    }

    public baseUrl(): string {
        return "user";
    }

    public exposedApiRoutes(): ExposedApiRoutesMetadata {
        return {
            "info": {
                functionName: "info"
            }
        };
    }

    protected info: ApiRoute = (req) => {
        if (req.getUser()?.username != Guest_Username) {
            return req.getUser()?.getUserInfo().then(info => info.asJSON());
        } else {
            return "Guest User does not have any attached info!";
        }
    }

}