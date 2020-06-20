import { User } from "../../user/User.js";
import { ISystemRequest } from "../../http/ISystemRequest.js";

export interface ApiAccessRuleContext {
    user: User;
    url: string;
    request : ISystemRequest;
}