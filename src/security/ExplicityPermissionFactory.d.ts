import { IExplicitPermissionFactory } from "./apiAccess/IExplicitPermissionFactory.js";
import { System } from "../System.js";
import { ApiAccessRuleContext } from "./apiAccess/ApiAccessRuleContext.js";
import { User } from "../user/User.js";
export declare class ExplicitPermissionFactory implements IExplicitPermissionFactory {
    protected system: System;
    constructor(system: System);
    getAccessRule(): (context: ApiAccessRuleContext) => Promise<boolean>;
    protected getAccessibleRolesIdFromUser(user: User): Promise<string[]>;
}
