import { User } from "../User.js";
import { AuthenticationConfig } from "../../security/authentication/AuthenticationConfig.js";
import jwt from 'jsonwebtoken';
import { SystemRequest } from "../../http/SystemRequest.js";
import { nanoid } from "nanoid";
import { ISystemRequest } from "../../http/ISystemRequest.js";
import { HeaderAuthenticationName } from "../../security/authentication/interfaces/HeaderAuthenticationName.js";

export class UserAuthentication {

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
    protected refreshToken!: string;

    /**
     * Valid Tokens
     * ------------
     * 
     * Hold all the viable JWT access tokens
     */
    protected validTokens: string[] = [];

    protected refreshTokenInfo!: UserRefreshTokenInfo;


    constructor(user: User) {
        this.user = user;
    }

    public async newAuthentication(referer: string) {

        let refreshTokenPayload: UserRefreshTokenInfo = {
            _id: await this.user.getId(),
            username: this.user.username,
            referer_identification: referer
        };

        const refreshToken = jwt.sign(refreshTokenPayload, AuthenticationConfig.jwt_secret.refresh);
        this.setRefreshToken(refreshToken);

        const accessToken = this.generateAccessToken();

        return {
            refreshToken,
            accessToken
        };
    }

    public setRefreshToken(refresh: string) {

        let refInfo: UserRefreshTokenInfo = jwt.verify(refresh, AuthenticationConfig.jwt_secret.refresh) as any;

        if (refInfo.username == this.user.username) {
            this.refreshTokenInfo = refInfo;
        }

        this.refreshToken = refresh;
        this.emptyAccessTokens();

    }

    public getRefreshToken(): string {
        return this.refreshToken;
    }

    public generateAccessToken(): string {

        if (this.refreshTokenInfo == null) {
            throw new Error("[UserAuthentication] Cannot generate an access token, refresh token not defined!");
        }

        let info: UserAccessTokenInfo = {
            _id: nanoid(),
            username: this.refreshTokenInfo.username,
            referer_identification: this.refreshTokenInfo.referer_identification,
        };

        const token = jwt.sign(info, AuthenticationConfig.jwt_secret.token, {
            expiresIn: "5 minutes"
        });

        this.validTokens.push(token);

        setTimeout(
            () => {
                this.validTokens = this.validTokens.filter((v) => v != token);
            },
            (1000 * 60 * 5) + 50 // After 5 minutes and 50 milisseconds, cause why not...
        );
        return token;
    }


    public emptyAccessTokens(): UserAuthentication {
        this.validTokens = [];
        return this;
    }

    public validateRequestAuthentication(request: ISystemRequest): boolean {

        let headerToken = request.headers[HeaderAuthenticationName] as string ?? "";
        if (!this.validTokens.includes(headerToken)) {
            console.error("[UserAuthentication] Token REFUSED! It is NOT included in the valid tokens!");
            return false;
        }
        try {
            let info: UserAccessTokenInfo = jwt.verify(headerToken, AuthenticationConfig.jwt_secret.token) as any;

            if (request.referer !== info.referer_identification) {
                console.error("[UserAuthentication] Token REFUSED! Referer identification mismatch!");
                return false;
            }
        } catch (err) {
            console.error("[UserAuthentication] Token signature failed!", err);
            return false;
        }

        return true;


    }

}

export type UserRefreshTokenInfo = {
    _id: string;
    username: string;
    referer_identification: string;
};

export type UserAccessTokenInfo = {
    _id: string;
    username: string;
    referer_identification: string;
};