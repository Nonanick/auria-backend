import { LoginOptions } from "../interfaces/IAuthenticationMethod.js";
export interface CredentialsLoginParams extends LoginOptions {
    username: string;
    password: string;
}
