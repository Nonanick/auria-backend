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
import { ResourceCatalog } from "../../../database/resources/ResourceCatalog.js";
import { AuthenticationFailed } from "../../../exception/system/authentication/AuthenticationFailed.js";
import { SessionCookieLogin } from '../sessionCookie/SessionCookieLogin.js';
export class CredentialsAuthentication {
    login(system, referer, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.compareCredentials(system, options.username, options.password)
                .then((userId) => __awaiter(this, void 0, void 0, function* () {
                let systemUser = yield system.users().getUser(options.username, {
                    loadIfNotExists: true,
                    markAsLoggedIn: true,
                    bootUser: true
                });
                const { refreshToken, accessToken } = yield systemUser.auth().newAuthentication(referer);
                if (options.keepSignedIn) {
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
            }))
                .catch((err) => {
                console.error("[CredentialsMethod] Failed to authetnticate!", err);
                throw new Error("Failed to generate auth!");
            });
        });
    }
    /**
     * Compare User Credentials
     * --------------------------
     *
     *
     * @param system
     * @param username
     * @param password
     */
    compareCredentials(system, username, password) {
        return system.getConnection()
            .select("_id", "username", "password", "user_privilege")
            .from(ResourceCatalog.User.table_name)
            .where("username", username)
            .then((results) => __awaiter(this, void 0, void 0, function* () {
            if (results.length != 1) {
                if (results.length > 1)
                    console.error("[PasswordAuthenticator] WARNING dupped username in User Table! Authentication will fail!");
                throw new AuthenticationFailed("Failed to authenticate user in this system!");
            }
            let userInfo = results[0];
            console.log("Bcrypt will compare: ", password, userInfo.password);
            if (yield bcrypt.compare(password, userInfo.password)) {
                return userInfo._id;
            }
            else {
                throw new AuthenticationFailed("Failed to authenticate user in this system!");
            }
        }));
    }
}
//# sourceMappingURL=CredentialsMethod.js.map