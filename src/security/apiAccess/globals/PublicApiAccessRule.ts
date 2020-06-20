import { GlobalApiAccessRule } from "./GlobalApiAccessRule.js";
import { GlobalApiAccessRuleContext } from "../GlobalApiAccessRuleContext.js";

export const PublicApiAccessRule: GlobalApiAccessRule = (context: GlobalApiAccessRuleContext) => {
    context.accessGranted();
    return true;
};