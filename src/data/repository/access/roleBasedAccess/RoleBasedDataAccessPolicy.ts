import { IDataAccessPolicy, IResourceAccessPolicyContext } from "../IDataAccessPolicy.js";
import { DataProcedure } from "../../../../database/procedures/DataProcedure.js";
import { User } from "../../../../user/User.js";
import { QueryBuilder } from "knex";
import { IDataFilterContext } from "../../../../database/query/IDataFilterContext.js";
import { ResourceCatalog } from "../../../../database/resources/ResourceCatalog.js";
import { ResourceActivity } from "../../../../database/resources/ResourceActivity.js";
import { IResourceActivity } from "../../../../database/rowData/IResourceActivity.js";

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

    public async applyFilter(query: QueryBuilder, context: IDataFilterContext) {
        const roles = await (await context.user.roles()).getRolesId();
        switch (context.procedure) {
            default:
                query.whereIn(
                    context.resource.getRowPrimaryField(),
                    function () {
                        this.table(ResourceCatalog.ResourceActivity.table_name)
                            .select<IResourceActivity>("resource_row_id")
                            .where("resource_id", context.resource.get("_id"))
                            .whereIn("role_id", roles)
                            .orWhereIn("role_authority", roles)
                    }
                );
        }
        return query;
    }



}