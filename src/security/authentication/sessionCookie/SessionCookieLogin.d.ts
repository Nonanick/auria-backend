import { System } from "../../../System.js";
import { IPersistentLogin } from "../../../database/rowData/IPersistentLogin.js";
import { User } from "../../../user/User.js";
import { ILoginMethod, LoginReturn, LoginOptions } from "../interfaces/IAuthenticationMethod.js";
import { RefererInfo } from "../../../http/RefererInfo.js";
export declare class SessionCookieLogin implements ILoginMethod {
    static createUserSession(system: System, user: User, referer: RefererInfo): Promise<import("../../../database/resources/default/AuriaRow.js").AuriaRow<IPersistentLogin>>;
    login(system: System, referer: string, params: any): Promise<LoginReturn>;
    protected validateToken(system: System, token: string, username: string): Promise<boolean>;
}
export interface SessionCookieLoginParams extends LoginOptions {
    sessionToken: string;
}
