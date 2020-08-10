import bcrypt from 'bcrypt';
import { nanoid } from "nanoid";
import { isBoolean } from "util";
import jwt from 'jsonwebtoken';

import { IApiListener } from "../../IApiListener.js";
import { System } from "../../../System.js";
import { ExposedApiRoutesMetadata } from "../../ExposedApiEnpointsMetadata.js";
import { SystemApiListener } from "../SystemApiListener.js";
import { LoginAttemptDenied } from "../../../exception/system/authentication/LoginAttemptDenied.js";
import { LoginAttemptManager } from "../../../security/authentication/loginAttempt/LoginAttemptManager.js";
import { SystemResponse } from '../../../http/SystemResponse.js';
import { AuthenticationConfig } from '../../../security/authentication/AuthenticationConfig.js';
import { UserRefreshTokenInfo } from '../../../user/auth/UserAuthentication.js';
import { SessionCookieLoginParams } from '../../../security/authentication/sessionCookie/SessionCookieLogin.js';
import { ISystemResponse } from 'auria-lib';
import { LoginAttempt } from '../../../security/authentication/loginAttempt/LoginAttempt.js';
import { LoginReturn } from '../../../security/authentication/interfaces/IAuthenticationMethod.js';
import { HeaderAuthenticationName } from '../../../security/authentication/interfaces/HeaderAuthenticationName.js';
import { RefreshCookieName } from '../../../security/authentication/interfaces/RefreshCookieName.js';
import { PersistentLoginCookieName } from '../../../security/authentication/interfaces/PersistentLoginCookieName.js';
import { CredentialsLoginParams } from '../../../security/authentication/credentials/CredentialsLoginParams.js';
import { Guest_Username } from '../../../user/User.js';
import { SystemApiRoute } from '../SystemApiRoute.js';

export class AuthListener extends SystemApiListener implements IApiListener {

  public name: string = "SystemAuthentication";

  protected loginAttemptManager: LoginAttemptManager;

  constructor(system: System) {
    super(system);
    this.loginAttemptManager = new LoginAttemptManager();
  }

  public exposedApiRoutes(): ExposedApiRoutesMetadata {
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
          validators: (value: string) => value.length > 2
        }],
        allowInternalRedirects: false,
        requiresExplicitPermission: false
      }
    }
  }

  public baseUrl() {
    return 'auth';
  };

  protected hashPassword: SystemApiRoute = async (request) => {
    return {
      hash: await bcrypt.hash(request.parameters['password'], 10),
      _id: nanoid()
    };
  };

  protected login: SystemApiRoute = async (request) => {

    const username = request.parameters["username"]; // Marked as required param!
    const password = request.parameters["password"]; // Marked as required param!
    const keepSignedIn = request.parameters["keep-signed-in"] ?? false;

    try {
      const attempt = this.loginAttemptManager.requestLoginAttempt(request);
      const credentialsLoginParams: CredentialsLoginParams = {
        username,
        password,
        keepSignedIn
      };

      // Will throw an exception if it fails!
      let authentication = await this.system
        .authenticator()
        .getLoginFunction("Credentials")
        (this.system, request.referer!, credentialsLoginParams);

      attempt.success = true;
      const oldAttempts = this.loginAttemptManager.clearLoginAttempts(request);

      // Since we are sending cookies / headers we will nedd to return a ISystemResponse!
      const response = this.buildLoginResponse(oldAttempts, authentication);

      return response;

    } catch (err) {

      if (err instanceof LoginAttemptDenied)
        console.error("Login Attempt denied! Cooldown", err.getReponseData());

      throw err;
    }
  };

  protected refresh: SystemApiRoute = async (request, system) => {

    if (request.cookies[RefreshCookieName] == null) {
      console.error("[AuthListener] Refresh token not sent, request failed!");
      throw new Error("Cannot refresh token!");
    }

    const refresh = request.cookies[RefreshCookieName];

    try {
      const refreshInfo = jwt.verify(refresh, AuthenticationConfig.jwt_secret.refresh) as UserRefreshTokenInfo;
      const user = await system.users()
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

  };

  protected handshake: SystemApiRoute = async (request, system) => {
    if (request.cookies[PersistentLoginCookieName] == null) {
      console.error("[AuthListener] Persistent Login token not sent, request failed!");
      
      let nRetResponse = new SystemResponse("Could not perform handshake, missing information!");
      nRetResponse.httpStatus =401;
      nRetResponse.data = { success : false};
      nRetResponse.setExitCode('SYS.AUTH.HANDSHAKE_MISSING_INFO');
      nRetResponse.errors = ['Persistent login information was not found on the request!'];

      return nRetResponse;
    }

    try {
      // Avoid bruteforcing a persistent login attempt!
      const attempt = this.loginAttemptManager.requestLoginAttempt(request);
      const sessionToken = request.cookies[PersistentLoginCookieName];
      const sessionLoginParams: SessionCookieLoginParams = {
        sessionToken,
        keepSignedIn: true
      };

      const authentication = await system
        .authenticator()
        .getLoginFunction("SessionCookie")
        (system, request.referer!, sessionLoginParams);

      attempt.success = true;

      const attempts = this.loginAttemptManager.clearLoginAttempts(request);

      const response = this.buildLoginResponse(attempts, authentication);

      return response;

    } catch (err) {
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
  };

  private buildLoginResponse(attempts: LoginAttempts, authentication: LoginReturn): ISystemResponse {
    const response = new SystemResponse("Login performed succcesfully!");

    response.headers[HeaderAuthenticationName] = authentication.access_token;
    response.cookies[RefreshCookieName] = {
      value: authentication.refresh_token,
      options: {
        sameSite: "strict",
        // secure: true, // Turn on when SSL enabled!
      }
    };

    if (authentication.persist_login_token != null) {
      response.cookies[PersistentLoginCookieName] = {
        value: authentication.persist_login_token!,
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

    response.data = {
      ...attempts,
      success: true
    };

    return response;
  }
}

type LoginAttempts = {
  perUsername: LoginAttempt[];
  perIdentification: LoginAttempt[];
}