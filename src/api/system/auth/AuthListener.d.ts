import { IApiListener } from "../../IApiListener.js";
import { System } from "../../../System.js";
import { ExposedApiRoutesMetadata } from "../../ExposedApiEnpointsMetadata.js";
import { SystemApiEndpoint } from "../SystemApiEndpoint.js";
import { SystemApiListener } from "../SystemApiListener.js";
import { LoginAttemptManager } from "../../../security/authentication/loginAttempt/LoginAttemptManager.js";
export declare class AuthListener extends SystemApiListener implements IApiListener {
    name: string;
    protected loginAttemptManager: LoginAttemptManager;
    constructor(system: System);
    exposedApiRoutes(): ExposedApiRoutesMetadata;
    baseUrl(): string;
    protected hashPassword: SystemApiEndpoint;
    protected login: SystemApiEndpoint;
    protected refresh: SystemApiEndpoint;
    protected handshake: SystemApiEndpoint;
    private buildLoginResponse;
}
