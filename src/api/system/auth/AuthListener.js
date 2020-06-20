var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcrypt';
import { nanoid } from "nanoid";
import { isBoolean } from "util";
import jwt from 'jsonwebtoken';
import { BooleanSanitizer } from "../../../data/sanitizer/BooleanSanitizer.js";
import { SystemApiListener } from "../SystemApiListener.js";
import { LoginAttemptDenied } from "../../../exception/system/authentication/LoginAttemptDenied.js";
import { LoginAttemptManager } from "../../../security/authentication/loginAttempt/LoginAttemptManager.js";
import { SystemResponse } from '../../../http/SystemResponse.js';
import { AuthenticationConfig } from '../../../security/authentication/AuthenticationConfig.js';
import { HeaderAuthenticationName } from '../../../security/authentication/interfaces/HeaderAuthenticationName.js';
import { RefreshCookieName } from '../../../security/authentication/interfaces/RefreshCookieName.js';
import { PersistentLoginCookieName } from '../../../security/authentication/interfaces/PersistentLoginCookieName.js';
import { Guest_Username } from '../../../user/User.js';
export class AuthListener extends SystemApiListener {
    constructor(system) {
        super(system);
        this.name = "SystemAuthentication";
        this.hashPassword = (request) => __awaiter(this, void 0, void 0, function* () {
            return {
                hash: yield bcrypt.hash(request.parameters['password'], 10),
                _id: nanoid()
            };
        });
        this.login = (request) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const username = request.parameters["username"]; // Marked as required param!
            const password = request.parameters["password"]; // Marked as required param!
            const keepSignedIn = (_a = request.parameters["keep-signed-in"]) !== null && _a !== void 0 ? _a : false;
            try {
                const attempt = this.loginAttemptManager.requestLoginAttempt(request);
                const credentialsLoginParams = {
                    username,
                    password,
                    keepSignedIn
                };
                // Will throw an exception if it fails!
                let authentication = yield this.system
                    .authenticator()
                    .getLoginFunction("Credentials")(this.system, request.referer, credentialsLoginParams);
                attempt.success = true;
                const oldAttempts = this.loginAttemptManager.clearLoginAttempts(request);
                // Since we are sending cookies / headers we will nedd to return a ISystemResponse!
                const response = this.buildLoginResponse(oldAttempts, authentication);
                return response;
            }
            catch (err) {
                if (err instanceof LoginAttemptDenied)
                    console.error("Login Attempt denied! Cooldown", err.getReponseData());
                throw err;
            }
        });
        this.refresh = (request, system) => __awaiter(this, void 0, void 0, function* () {
            if (request.cookies[RefreshCookieName] == null) {
                console.error("[AuthListener] Refresh token not sent, request failed!");
                throw new Error("Cannot refresh token!");
            }
            const refresh = request.cookies[RefreshCookieName];
            try {
                const refreshInfo = jwt.verify(refresh, AuthenticationConfig.jwt_secret.refresh);
                const user = yield system.getUserManager()
                    .getUser(refreshInfo.username, {
                    loadIfNotExists: false,
                    markAsLoggedIn: false
                });
                if (user.auth().getRefreshToken() === refresh) {
                    const response = new SystemResponse("Token refreshed!");
                    const accessToken = user.auth().generateAccessToken();
                    response.headers[HeaderAuthenticationName] = accessToken;
                    response.data = { success: true };
                    return response;
                }
            }
            // Since the cookie was set but it's invalid destroy it!
            catch (err) {
                const response = new SystemResponse("Cannot refresh token!");
                response.cookies[RefreshCookieName] = {
                    value: "",
                    options: {
                        expires: new Date(Date.now() - 1000)
                    }
                };
                response.setExitCode("SYS.AUTHENTICATION.INVALID_TOKEN");
                response.errors.push("Cannot refresh token!");
                // Bad Request status error = 400
                response.httpStatus = 400;
                return response;
            }
        });
        this.handshake = (request, system) => __awaiter(this, void 0, void 0, function* () {
            if (request.cookies[PersistentLoginCookieName] == null) {
                console.error("[AuthListener] Persistent Login token not sent, request failed!");
                throw new Error("Cannot refresh token!");
            }
            try {
                // Avoid bruteforcing a persistent login attempt!
                const attempt = this.loginAttemptManager.requestLoginAttempt(request);
                const sessionToken = request.cookies[PersistentLoginCookieName];
                const sessionLoginParams = {
                    sessionToken,
                    keepSignedIn: true
                };
                const authentication = yield system.getUserAuthenticator()
                    .getLoginFunction("SessionCookie")(system, request.referer, sessionLoginParams);
                attempt.success = true;
                const attempts = this.loginAttemptManager.clearLoginAttempts(request);
                const response = this.buildLoginResponse(attempts, authentication);
                return response;
            }
            catch (err) {
                // Invalidate old persistent login cookie!
                const response = new SystemResponse("Failed to login with session information!");
                response.setExitCode("SYS.AUTHENTICATION.INVALID_TOKEN");
                // Bad request = 400
                response.httpStatus = 400;
                response.errors.push("Failed to login with session information!");
                response.cookies[PersistentLoginCookieName] = {
                    value: "",
                    options: {
                        expires: new Date(Date.now() - 1000)
                    }
                };
                response.cookies[PersistentLoginCookieName + "_HINT"] = {
                    value: "",
                    options: {
                        expires: new Date(Date.now() - 1000)
                    }
                };
                return response;
            }
        });
        this.loginAttemptManager = new LoginAttemptManager();
    }
    exposedApiRoutes() {
        return {
            "login": {
                functionName: "login",
                requiredParams: ["username", "password"],
                optionalParams: [{
                        name: "keep-signed-in",
                        sanitizers: [BooleanSanitizer],
                        validators: (value) => isBoolean(value)
                    }],
                requiresExplicitPermission: false
            },
            "refresh": {
                functionName: "refresh",
                accessRules: [
                    (context) => {
                        if (context.user.username == Guest_Username) {
                            console.log("[AccessRule] Only Non Guests can refresh!");
                            return false;
                        }
                        return true;
                    }
                ],
                requiresExplicitPermission: false
            },
            "handshake": {
                functionName: "handshake",
                requiresExplicitPermission: false
            },
            "hash": {
                functionName: "hashPassword",
                requiredParams: [{
                        name: "password",
                        validators: (value) => value.length > 2
                    }],
                allowInternalRedirects: false,
                requiresExplicitPermission: false
            }
        };
    }
    baseUrl() {
        return 'auth';
    }
    ;
    buildLoginResponse(attempts, authentication) {
        const response = new SystemResponse("Login performed succcesfully!");
        response.headers[HeaderAuthenticationName] = authentication.access_token;
        response.cookies[RefreshCookieName] = {
            value: authentication.refresh_token,
            options: {
                sameSite: "strict",
            }
        };
        if (authentication.persist_login_token != null) {
            response.cookies[PersistentLoginCookieName] = {
                value: authentication.persist_login_token,
                options: {
                    httpOnly: true,
                    // secure: true, // Turn on when SSL enabled!
                    sameSite: "strict"
                }
            };
            response.cookies[PersistentLoginCookieName + "_HINT"] = {
                value: "",
                options: {
                    // secure: true, // Turn on when SSL enabled!
                    sameSite: "strict"
                }
            };
        }
        response.data = Object.assign(Object.assign({}, attempts), { success: true });
        return response;
    }
}
//# sourceMappingURL=AuthListener.js.map