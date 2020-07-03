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
            },
            "create": {
                functionName: "createUser",
                requiredParams: [
                    {
                        name: "username",
                        validators: (value) => {
                            if (String(value).length < 3) return "Username is too short";
                            let invalidChars = /(^[^A-z])|([^A-z-_\.0-9])*/g;
                            if (String(value).match(invalidChars)) return "Username can only contain characters A-Z, numbers, ., -, and _!";
                            return true;
                        }
                    },
                    {
                        name: "password",
                        validators: (value) => {
                            if (String(value).length < 3) return "Password is too short";
                            return true;
                        }
                    }
                ]
            }
        };
    }

    protected createUser : ApiRoute = (req) => {

    }

    protected info: ApiRoute = (req) => {
        if (req.getUser()?.username != Guest_Username) {
            return req.getUser()?.getUserInfo().then(info => info.asJSON());
        } else {
            return "Guests does not have any attached info!";
        }
    }

}