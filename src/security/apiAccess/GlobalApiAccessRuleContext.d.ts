import { ApiAccessRuleContext } from "./ApiAccessRuleContext.js";
export interface GlobalApiAccessRuleContext extends ApiAccessRuleContext {
    /**
     * Access Granted
     * --------------
     * Global Api Access Rule have access to 'accessGranted' function
     * this function skips all of the other Access Rules and immediately
     * signals to the PolicyEnforcer that the user can use the api!
     */
    accessGranted: () => void;
}
