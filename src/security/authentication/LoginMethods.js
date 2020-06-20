import { CredentialsAuthentication } from "./credentials/CredentialsMethod.js";
import { SessionCookieLogin } from "./sessionCookie/SessionCookieLogin.js";
export const LoginMethods = {
    "Credentials": new CredentialsAuthentication(),
    "SessionCookie": new SessionCookieLogin(),
};
//# sourceMappingURL=LoginMethods.js.map