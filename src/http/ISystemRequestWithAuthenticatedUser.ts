import { ISystemRequest } from "./ISystemRequest.js";
import { User } from "../user/User.js";

export interface ISystemRequestWithAuthenticatedUser extends ISystemRequest {
    getUser() : User;
}