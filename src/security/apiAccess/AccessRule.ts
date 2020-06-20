import { ApiAccessRuleContext } from "./ApiAccessRuleContext.js";

export type ApiAccessRule = (context : ApiAccessRuleContext) => boolean | Promise<boolean>;