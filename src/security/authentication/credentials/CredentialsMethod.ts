import bcrypt from 'bcrypt';
import { System } from "../../../System.js";
import { SystemEntityCatalog } from "../../../database/schema/SystemEntityCatalog.js";
import { AuthenticationFailed } from "../../../exception/system/authentication/AuthenticationFailed.js";
import { SessionCookieLogin } from '../sessionCookie/SessionCookieLogin.js';
import { ILoginMethod, LoginReturn } from '../interfaces/IAuthenticationMethod.js';
import { RefererInfo } from '../../../http/RefererInfo.js';
import { IUser } from '../../../database/schemaInterface/IUser.js';

export class CredentialsAuthentication implements ILoginMethod {

    public async login(system: System, referer: RefererInfo, options: any): Promise<LoginReturn> {

        return this.compareCredentials(system, options.username, options.password)
            .then(async (userId) => {
                let systemUser = await system.users().getUser(options.username, {
                    loadIfNotExists: true,
                    markAsLoggedIn: true,
                    bootUser: true
                });

                const { refreshToken, accessToken } = await systemUser.auth().newAuthentication(referer);

                if (options.keepSignedIn) {
                    const persistToken = (await SessionCookieLogin.createUserSession(system, systemUser, referer)).get("token");
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
            })
            .catch((err) => {
                console.error("[CredentialsMethod] Failed to authetnticate!", err);
                throw new Error("Failed to generate auth!");
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
    private compareCredentials(system: System, username: string, password: string): Promise<string> {
        return system.getConnection()
            .select<IUser[]>("_id", "username", "password", "user_privilege")
            .from(SystemEntityCatalog.User.table_name)
            .where("username", username)
            .then(async (results) => {

                if (results.length != 1) {

                    if (results.length > 1)
                        console.error("[PasswordAuthenticator] WARNING dupped username in User Table! Authentication will fail!");

                    throw new AuthenticationFailed("Failed to authenticate user in this system!");
                }

                let userInfo = results[0];

                console.log("Bcrypt will compare: ", password, userInfo.password);

                if (await bcrypt.compare(password, userInfo.password)) {
                    return userInfo._id;
                } else {
                    throw new AuthenticationFailed("Failed to authenticate user in this system!");
                }
            });
    }

}