import { ISystemRequest } from "./ISystemRequest.js";
import { CookieOptions } from "express";
import { User } from "../user/User.js";
import { ISystemRequestWithAuthenticatedUser } from "./ISystemRequestWithAuthenticatedUser.js";
import { RefererInfo } from "./RefererInfo.js";

export class SystemRequest implements ISystemRequest {

    public fullUrl!: string;
    public url!: string;
    public queryString!: string;
    public resolvedQueryString: {
        [parameter: string]: any;
    } = {};
    public parameters: any;
    public headers: {
        [name: string]: string | string[];
    } = {};
    public cookies: {
        [name: string]: string
    } = {};

    public redirected!: false;
    public system!: string;
    public referer!: RefererInfo;

    protected user!: User;

    constructor(data?: Partial<ISystemRequest>) {

        this.url = data?.url || "";
        this.fullUrl = data?.fullUrl || "";
        this.queryString = data?.queryString || "";
        this.headers = data?.headers || {};
        this.cookies = data?.cookies || {};
        this.system = data?.system || "";
        this.redirected = data?.redirected || false;
        this.resolvedQueryString = data?.resolvedQueryString || {};
        this.parameters = data?.parameters || {};
        this.referer = data?.referer || "REFERER_INFO_NOT_PROVIDED";

    }

    public getUser(): User {
        return this.user!;
    }

    public setUser(user: User) {
        this.user = user;
    }
}