import { ApiAccessRuleContext } from "./ApiAccessRuleContext.js";
export declare type ApiAccessRule = (context: ApiAccessRuleContext) => boolean | Promise<boolean>;
