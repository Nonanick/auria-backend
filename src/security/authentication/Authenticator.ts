import jwt from 'jsonwebtoken';
import { System } from "../../System.js";
import { User } from "../../user/User.js";
import { ISystemRequest } from "../../http/ISystemRequest.js";
import { AuthenticationConfig } from "./AuthenticationConfig.js";
import { UserAccessTokenInfo } from "../../user/auth/UserAuthentication.js";
import { LoginMethods } from './LoginMethods.js';
import { HeaderAuthenticationName } from './interfaces/HeaderAuthenticationName.js';

export class Authenticator {

    protected system: System;

    constructor(system: System) {
        this.system = system;
    }

    public getLoginFunction(method: keyof typeof LoginMethods) {
        return LoginMethods[method].login.bind(LoginMethods[method]);
    }

    public async authenticateRequest(request: ISystemRequest): Promise<User> {
        if (request.headers[HeaderAuthenticationName] != null) {
            try {
                const token = request.headers[HeaderAuthenticationName] as string;
                const tokenInfo = jwt.verify(token, AuthenticationConfig.jwt_secret.token) as UserAccessTokenInfo;

                // Only return a u'ser if it is 'logged in'
                const user = await this.system
                    .users()
                    .getUser(tokenInfo.username,
                        {
                            loadIfNotExists: false,
                            markAsLoggedIn: false
                        }
                    );

                if (user.auth().validateRequestAuthentication(request)) {
                    return user;
                }
            }
            // Possible Errors: "JWT.verify" and "UserManager.getUser"
            catch (err) {
                console.error("[Authenticator] ERROR! Failed to validate auth token!", err);
                return this.system.users().getOrCreateGuestUser(request.referer!);
            }
        }
        return this.system.users().getOrCreateGuestUser(request.referer!); 
    }

}


