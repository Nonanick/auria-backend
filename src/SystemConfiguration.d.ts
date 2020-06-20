import { IApiListener } from "./api/IApiListener.js";
import { IModule } from 'auria-lib';
export interface SystemConfiguration {
    name: string;
    systemApiListeners?: IApiListener[];
    disableSystemApiListeners?: string[];
    modules?: IModule[];
}
