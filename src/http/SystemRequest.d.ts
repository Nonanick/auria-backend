import { ISystemRequest } from "./ISystemRequest.js";
import { User } from "../user/User.js";
import { RefererInfo } from "./RefererInfo.js";
export declare class SystemRequest implements ISystemRequest {
    fullUrl: string;
    url: string;
    queryString: string;
    resolvedQueryString: {
        [parameter: string]: any;
    };
    parameters: any;
    headers: {
        [name: string]: string | string[];
    };
    cookies: {
        [name: string]: string;
    };
    redirected: false;
    system: string;
    referer: RefererInfo;
    protected user: User;
    constructor(data?: Partial<ISystemRequest>);
    getUser(): User;
    setUser(user: User): void;
}
