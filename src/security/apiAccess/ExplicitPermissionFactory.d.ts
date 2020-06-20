import { ApiAccessRule } from "./AccessRule.js";
export interface ExplicitPermissionFactory {
    getAccessRule(): ApiAccessRule;
}
