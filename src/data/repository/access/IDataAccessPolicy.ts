import { User } from "../../../user/User.js";
import { DataProcedure } from "../../../database/procedures/DataProcedure.js";
import { DataAccessPolicyFlag } from "./DataAccessPolicyFlag.js";

export interface IDataAccessPolicy {

    readonly name : string;
    readonly title : string;
    readonly description : string;

    flags? : DataAccessPolicyFlag[];

    getReadPolicy : (context : IResourceAccessPolicyContext, options : any) => Promise<string>;
    getUpdatePolicy : (context : IResourceAccessPolicyContext, options : any) => Promise<string>;
    getDeletePolicy : (context : IResourceAccessPolicyContext, options : any) => Promise<string>;
    onInsert : (context : IResourceAccessPolicyContext, options : any) => void;
    on : (procedure : DataProcedure, context : IResourceAccessPolicyContext) => void;

}

export interface IResourceAccessPolicyContext {
    user : User;
    resource : string;
    procedure : DataProcedure;    
}