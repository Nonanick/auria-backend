import { User } from "../../../user/User.js";
import { DataAccessPolicyFlag } from "./DataAccessPolicyFlag.js";
import { IDataFilterProvider } from "../../../database/query/IDataFilterProvider.js";
import { ProcedureCatalog } from "../../../resource/standart/procedures/ProcedureCatalog.js";

export interface IDataAccessPolicy extends IDataFilterProvider {

    readonly name : string;
    readonly title : string;
    readonly description : string;

    flags? : DataAccessPolicyFlag[];
}

export interface IResourceAccessPolicyContext {
    user : User;
    resource : string;
    procedure : keyof typeof ProcedureCatalog;    
}