import { GlobalApiAccessRuleContext } from "../GlobalApiAccessRuleContext.js";

export type GlobalApiAccessRule = (context : GlobalApiAccessRuleContext ) => boolean | Promise<boolean>;