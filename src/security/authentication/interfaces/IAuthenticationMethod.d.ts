import { System } from "../../../System.js";
import { RefererInfo } from "../../../http/RefererInfo.js";
export interface ILoginMethod {
    login: (system: System, referer: RefererInfo, params: LoginOptions & any) => LoginReturn | Promise<LoginReturn>;
}
export declare type LoginReturn = {
    refresh_token: string;
    access_token: string;
    persist_login_token?: string;
};
export interface LoginOptions {
    keepSignedIn?: boolean;
}
