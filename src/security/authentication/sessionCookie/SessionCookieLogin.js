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
import { AuthenticationConfig } from "../AuthenticationConfig.js";
import { ResourceCatalog } from "../../../database/resources/ResourceCatalog.js";
export class SessionCookieLogin {
    static createUserSession(system, user, referer) {
        return __awaiter(this, void 0, void 0, function* () {
            // Inavlidate previous sessions
            yield system.getConnection()
                .table(ResourceCatalog.PersistentLogin.table_name)
                .update({ status: "inactive" })
                .where("username", user.username);
            let persist = yield system
                .resourceManager()
                .getResource(ResourceCatalog.PersistentLogin.name)
                .createRow();
            persist.set({
                login_time: new Date(Date.now()),
                referer_identification: referer,
                token: user.auth().generateAccessToken(),
                username: user.username
            });
            let saved = yield persist.save();
            if (saved) {
                return persist;
            }
            else {
                console.error("[Credentials] Failed to generate Session for login! user session is NOT SAVED!");
                throw new Error("Failed to persist user login!");
            }
        });
    }
    login(system, referer, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const sessionParams = params;
            try {
                const tokenInfo = jwt.verify(sessionParams.sessionToken, AuthenticationConfig.jwt_secret.token, {
                    ignoreExpiration: true
                });
                const isSessionTokenValid = yield this.validateToken(system, sessionParams.sessionToken, tokenInfo.username);
                if (isSessionTokenValid && referer === tokenInfo.referer_identification) {
                    let systemUser = yield system.users()
                        .getUser(tokenInfo.username, {
                        loadIfNotExists: true,
                        markAsLoggedIn: true,
                        bootUser: true
                    });
                    const { refreshToken, accessToken } = yield systemUser.auth().newAuthentication(referer);
                    // Refresh Keep signed in! (Should it happen ? )
                    if (sessionParams.keepSignedIn) {
                        const persistToken = (yield SessionCookieLogin.createUserSession(system, systemUser, referer)).get("token");
                        return {
                            refresh_token: refreshToken,
                            access_token: accessToken,
                            persist_login_token: persistToken,
                        };
                    }
                    return {
                        refresh_token: refreshToken,
                        access_token: accessToken
                    };
                }
                else {
                    console.error("[SessionCookieLogin] Token information mismatch/not pinpointed in the database!");
                    throw new Error("Failed to verify session token!");
                }
            }
            // jwt verify may throw an error!
            catch (err) {
                console.error("[SessionCookieLogin] Failed to verify session token!");
                throw new Error("Failed to verify session token!");
            }
        });
    }
    validateToken(system, token, username) {
        return __awaiter(this, void 0, void 0, function* () {
            return system.getConnection()
                .select("_id")
                .from(ResourceCatalog.PersistentLogin.table_name)
                .where("token", token)
                .where("username", username)
                .where("status", "active")
                .then((tokens) => {
                if (tokens.length === 1) {
                    console.log("Persistent Login found match!");
                    return true;
                }
                else {
                    console.error("Failed to pinpoint any session that matches the given token!\nFound: ", tokens.length);
                    return false;
                }
            });
        });
    }
}
//# sourceMappingURL=SessionCookieLogin.js.map