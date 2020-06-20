import { IDataAccessPolicy, IResourceAccessPolicyContext } from "../IDataAccessPolicy.js";
import { DataProcedure } from "../../../../database/procedures/DataProcedure.js";
import { User } from "../../../../user/User.js";

export class RoleBasedDataAccessPolicy implements IDataAccessPolicy {

    public get name(): string {
        return "RoleBasedDataAccessPolicy";
    };

    public get title(): string {
        return "@{Auria.DataAccessPolicy.RoleBased.Title}";
    }

    public get description(): string {
        return "@{Auria.DataAccessPolicy.RoleBased.Description}";
    }

    public get flags() {
        return [
            {
                name: "ALLOW_PARENT_ROLE",
                title: "@{Auria.DataAccessPolicy.RoleBased.AllowParentTole.Title}",
                description: "@{Auria.DataAccessPolicy.RoleBased.AllowParentRole.Description}"
            },
            {
                name: "ALLOW_SAME_ROLE",
                title: "@{Auria.DataAccessPolicy.RoleBased.AllowSameRole.Title}",
                description: "@{Auria.DataAccessPolicy.RoleBased.AllowSameRole.Description}"
            }
        ];
    }

    public async getReadPolicy(context: IResourceAccessPolicyContext, options: any): Promise<string> {
        let includedRoles = this.getIncludedRoles(context.user, options);

        return "";

    }

    protected async getIncludedRoles(user: User, options: any) {
        if (options["ALLOW_PARENT_ROLE"] && options["ALLOW_SAME_ROLE"]) {
            return (await user.roles()).getAccessibleRolesId();
        }

        if (options["ALLOW_PARENT_ROLE"]) {
            let allAcessibleRoles;
        }


    }

    public async getUpdatePolicy(context: IResourceAccessPolicyContext, options: any): Promise<string> {
        return "";
    }
    public async getDeletePolicy(context: IResourceAccessPolicyContext, options: any): Promise<string> {
        return ""
    }

    public onInsert(context: IResourceAccessPolicyContext, options: any) {


    }
    public on(procedure: DataProcedure, context: IResourceAccessPolicyContext) {

    }



}