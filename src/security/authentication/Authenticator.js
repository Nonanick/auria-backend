var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import { AuthenticationConfig } from "./AuthenticationConfig.js";
import { LoginMethods } from './LoginMethods.js';
import { HeaderAuthenticationName } from './interfaces/HeaderAuthenticationName.js';
export class Authenticator {
    constructor(system) {
        this.system = system;
    }
    getLoginFunction(method) {
        return LoginMethods[method].login.bind(LoginMethods[method]);
    }
    authenticateRequest(request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (request.headers[HeaderAuthenticationName] != null) {
                try {
                    const token = request.headers[HeaderAuthenticationName];
                    const tokenInfo = jwt.verify(token, AuthenticationConfig.jwt_secret.token);
                    // Only return a u'ser if it is 'logged in'
                    const user = yield this.system
                        .users()
                        .getUser(tokenInfo.username, {
                        loadIfNotExists: false,
                        markAsLoggedIn: false
                    });
                    if (user.auth().validateRequestAuthentication(request)) {
                        return user;
                    }
                }
                // Possible Errors: "JWT.verify" and "UserManager.getUser"
                catch (err) {
                    console.error("[Authenticator] ERROR! Failed to validate auth token!", err);
                    return this.system.users().getOrCreateGuestUser(request.referer);
                }
            }
            return this.system.users().getOrCreateGuestUser(request.referer);
        });
    }
}
//# sourceMappingURL=Authenticator.js.map