import { IExplicitPermissionFactory } from "./apiAccess/IExplicitPermissionFactory.js";
import { System } from "../System.js";
import { ApiAccessRuleContext } from "./apiAccess/ApiAccessRuleContext.js";
export declare class ExplicitPermissionFactory implements IExplicitPermissionFactory {
    protected system: System;
    constructor(system: System);
    getAccessRule(): (context: ApiAccessRuleContext) => Promise<boolean>;
}
