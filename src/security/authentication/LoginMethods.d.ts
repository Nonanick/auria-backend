import { CredentialsAuthentication } from "./credentials/CredentialsMethod.js";
import { SessionCookieLogin } from "./sessionCookie/SessionCookieLogin.js";
export declare const LoginMethods: {
    Credentials: CredentialsAuthentication;
    SessionCookie: SessionCookieLogin;
};
