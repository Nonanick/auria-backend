import { IApiListener } from "../../IApiListener.js";
import { System } from "../../../System.js";
import { ExposedApiRoutesMetadata } from "../../ExposedApiEnpointsMetadata.js";
import { SystemApiListener } from "../SystemApiListener.js";
import { LoginAttemptManager } from "../../../security/authentication/loginAttempt/LoginAttemptManager.js";
import { SystemApiRoute } from '../SystemApiRoute.js';
export declare class AuthListener extends SystemApiListener implements IApiListener {
    name: string;
    protected loginAttemptManager: LoginAttemptManager;
    constructor(system: System);
    exposedApiRoutes(): ExposedApiRoutesMetadata;
    baseUrl(): string;
    protected hashPassword: SystemApiRoute;
    protected login: SystemApiRoute;
    protected refresh: SystemApiRoute;
    protected handshake: SystemApiRoute;
    private buildLoginResponse;
}
