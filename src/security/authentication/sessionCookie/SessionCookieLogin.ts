import { System } from "../../../System.js";
import jwt from 'jsonwebtoken';
import { AuthenticationConfig } from "../AuthenticationConfig.js";
import { UserAccessTokenInfo, UserRefreshTokenInfo } from "../../../user/auth/UserAuthentication.js";
import { SystemEntityCatalog } from "../../../database/schema/SystemEntityCatalog.js";
import { IPersistentLogin } from "../../../database/schemaInterface/IPersistentLogin.js";
import { User } from "../../../user/User.js";
import { ILoginMethod, LoginReturn, LoginOptions } from "../interfaces/IAuthenticationMethod.js";
import { RefererInfo } from "../../../http/RefererInfo.js";

export class SessionCookieLogin implements ILoginMethod {

  public static async createUserSession(system: System, user: User, referer: RefererInfo) {

    // Invalidate previous sessions
    await system.getConnection()
      .table(SystemEntityCatalog.PersistentLogin.table_name)
      .update({ status: "inactive" })
      .where("username", user.username);

    let persist = await system
      .entityManager()
      .getEntity(SystemEntityCatalog.PersistentLogin.name)
      .row<IPersistentLogin>();

    persist.set({
      login_time: new Date(Date.now()),
      referer_identification: referer,
      token: user.auth().generateAccessToken(),
      username: user.username
    });

    let saved = await persist.save();

    if (saved) {
      return persist;
    } else {
      console.error("[Credentials] Failed to generate Session for login! user session is NOT SAVED!");
      throw new Error("Failed to persist user login!");
    }
  }

  public async login(system: System, referer: string, params: any): Promise<LoginReturn> {

    const sessionParams: SessionCookieLoginParams = params as SessionCookieLoginParams;

    try {
      const tokenInfo = jwt.verify(sessionParams.sessionToken, AuthenticationConfig.jwt_secret.token,
        {
          ignoreExpiration: true
        }
      ) as UserAccessTokenInfo;

      const isSessionTokenValid = await this.validateToken(system, sessionParams.sessionToken, tokenInfo.username);

      console.debug('Compare referer:', tokenInfo.referer_identification, referer, referer === tokenInfo.referer_identification);

      if (isSessionTokenValid && referer === tokenInfo.referer_identification) {

        let systemUser = await system.users()
          .getUser(tokenInfo.username, {
            loadIfNotExists: true,
            markAsLoggedIn: true,
            bootUser: true
          });

        const { refreshToken, accessToken } = await systemUser.auth().newAuthentication(referer);

        // Refresh Keep signed in! (Should it happen ? )
        if (sessionParams.keepSignedIn) {
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
      } else {
        console.error("[SessionCookieLogin] Token information mismatch/not pinpointed in the database!");
        throw new Error("Failed to verify session token!");
      }

    }
    // jwt verify may throw an error!
    catch (err) {
      console.error("[SessionCookieLogin] Failed to verify session token!", err);
      throw new Error("Failed to verify session token!");
    }
  }

  protected async validateToken(system: System, token: string, username: string): Promise<boolean> {
    console.log('Validate Token', token, username);

    return system.getConnection()
      .select<IPersistentLogin[]>("_id")
      .from(SystemEntityCatalog.PersistentLogin.table_name)
      .where("token", token)
      .where("username", username)
      .where("status", "active")
      .then((tokens) => {
        if (tokens.length === 1) {
          console.log("Persistent Login found match!");
          return true;
        } else {
          console.error("Failed to pinpoint any session that matches the given token!\nFound: ", tokens.length);
          return false;
        }
      });
  }

}

export interface SessionCookieLoginParams extends LoginOptions {
  sessionToken: string;
}