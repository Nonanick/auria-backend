import { ApiAccessRule } from "./AccessRule.js";

export interface IExplicitPermissionFactory {
    
    getAccessRule() : ApiAccessRule;

}