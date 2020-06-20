import { User } from "../User.js";
import { ISystemRequest } from "../../http/ISystemRequest.js";
export declare class UserAuthentication {
    protected user: User;
    /**
     * Refresh Token
     * --------------
     * Holds the currently viable refreshToken!
     * The refresh token can be used 7 days without the need to re-login
     * using one of the 2 methods:
     *
     * 1. Credentials
     * 2. PERSIST_LOGIN cookie
     *
     */
    protected refreshToken: string;
    /**
     * Valid Tokens
     * ------------
     *
     * Hold all the viable JWT access tokens
     */
    protected validTokens: string[];
    protected refreshTokenInfo: UserRefreshTokenInfo;
    constructor(user: User);
    newAuthentication(referer: string): Promise<{
        refreshToken: string;
        accessToken: string;
    }>;
    setRefreshToken(refresh: string): void;
    getRefreshToken(): string;
    generateAccessToken(): string;
    emptyAccessTokens(): UserAuthentication;
    validateRequestAuthentication(request: ISystemRequest): boolean;
}
export declare type UserRefreshTokenInfo = {
    _id: string;
    username: string;
    referer_identification: string;
};
export declare type UserAccessTokenInfo = {
    _id: string;
    username: string;
    referer_identification: string;
};
