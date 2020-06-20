import { System } from "../../../System.js";
import { ILoginMethod, LoginReturn } from '../interfaces/IAuthenticationMethod.js';
import { RefererInfo } from '../../../http/RefererInfo.js';
export declare class CredentialsAuthentication implements ILoginMethod {
    login(system: System, referer: RefererInfo, options: any): Promise<LoginReturn>;
    /**
     * Compare User Credentials
     * --------------------------
     *
     *
     * @param system
     * @param username
     * @param password
     */
    private compareCredentials;
}
