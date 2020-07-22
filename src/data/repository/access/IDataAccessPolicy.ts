import { User } from "../../../user/User.js";
import { DataAccessPolicyFlag } from "./DataAccessPolicyFlag.js";
import { IDataFilterProvider } from "../../../database/query/IDataFilterProvider.js";
import { EntityProcedureCatalog } from '../../../entity/standart/procedures/entity/EntityProcedureCatalog.js';

export interface IDataAccessPolicy extends IDataFilterProvider {

    readonly name : string;
    readonly title : string;
    readonly description : string;

    flags? : DataAccessPolicyFlag[];
}

export interface IEntityAccessPolicyContext {
    user : User;
    entity : string;
    procedure : keyof typeof EntityProcedureCatalog;    
}