import { AuthListener } from "./auth/AuthListener.js";
import { UserListener } from "./user/UserListener.js";
export declare const SystemApiCatalog: {
    SystemAuthentication: typeof AuthListener;
    UserUtilities: typeof UserListener;
};
