import { IDataAccessPolicy, IResourceAccessPolicyContext } from "../IDataAccessPolicy.js";
import { DataProcedure } from "../../../../database/procedures/DataProcedure.js";
import { User } from "../../../../user/User.js";
export declare class RoleBasedDataAccessPolicy implements IDataAccessPolicy {
    get name(): string;
    get title(): string;
    get description(): string;
    get flags(): {
        name: string;
        title: string;
        description: string;
    }[];
    getReadPolicy(context: IResourceAccessPolicyContext, options: any): Promise<string>;
    protected getIncludedRoles(user: User, options: any): Promise<any>;
    getUpdatePolicy(context: IResourceAccessPolicyContext, options: any): Promise<string>;
    getDeletePolicy(context: IResourceAccessPolicyContext, options: any): Promise<string>;
    onInsert(context: IResourceAccessPolicyContext, options: any): void;
    on(procedure: DataProcedure, context: IResourceAccessPolicyContext): void;
}
