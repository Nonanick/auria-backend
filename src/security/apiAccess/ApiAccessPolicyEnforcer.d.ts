import { System } from "../../System.js";
import { ApiAccessRule } from "./AccessRule.js";
import { GlobalApiAccessRule } from "./globals/GlobalApiAccessRule.js";
import { User } from "../../user/User.js";
import { ISystemRequest } from "../../http/ISystemRequest.js";
export declare class ApiAccessPolicyEnforcer {
    protected globalAccessRules: Map<string | RegExp, GlobalApiAccessRule>;
    protected apiEndpointAccessRules: Map<string, ApiAccessRule | ApiAccessRule[]>;
    protected system: System;
    constructor(system: System);
    addRouteAccessRules(url: string, accessRules: ApiAccessRule | ApiAccessRule[]): this;
    setGlobalPolicy(searchFor: string | RegExp, policy: GlobalApiAccessRule): this;
    userCanAccessApi(user: User, request: ISystemRequest): Promise<boolean>;
    getGlobalsFromApiURL(apiUrl: string): GlobalApiAccessRule[];
}
