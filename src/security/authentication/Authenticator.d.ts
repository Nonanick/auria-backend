import { System } from "../../System.js";
import { User } from "../../user/User.js";
import { ISystemRequest } from "../../http/ISystemRequest.js";
import { LoginMethods } from './LoginMethods.js';
export declare class Authenticator {
    protected system: System;
    constructor(system: System);
    getLoginFunction(method: keyof typeof LoginMethods): ((system: System, referer: string, params: any) => Promise<import("./interfaces/IAuthenticationMethod.js").LoginReturn>) | ((system: System, referer: string, options: any) => Promise<import("./interfaces/IAuthenticationMethod.js").LoginReturn>);
    authenticateRequest(request: ISystemRequest): Promise<User>;
}
