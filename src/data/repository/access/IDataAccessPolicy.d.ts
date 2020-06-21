import { User } from "../../../user/User.js";
import { DataProcedure } from "../../../database/procedures/DataProcedure.js";
import { DataAccessPolicyFlag } from "./DataAccessPolicyFlag.js";
import { IDataFilterProvider } from "../../../database/query/IDataFilterProvider.js";
export interface IDataAccessPolicy extends IDataFilterProvider {
    readonly name: string;
    readonly title: string;
    readonly description: string;
    flags?: DataAccessPolicyFlag[];
}
export interface IResourceAccessPolicyContext {
    user: User;
    resource: string;
    procedure: DataProcedure;
}
