import { IDataAccessPolicy } from "../IDataAccessPolicy.js";
import { QueryBuilder } from "knex";
import { IDataFilterContext } from "../../../../database/query/IDataFilterContext.js";
import { EntityCatalog } from "../../../../database/schema/EntityCatalog.js";
import { IEntityActivity } from "../../../../database/schemaInterface/IEntityActivity.js";

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
                    context.entity.getRowPrimaryField(),
                    function () {
                        this.table(EntityCatalog.EntityActivity.table_name)
                            .select<IEntityActivity>("entity_row_id")
                            .where("entity_id", context.entity.get("_id"))
                            .whereIn("role_id", roles)
                            .orWhereIn("role_authority", roles)
                    }
                );
        }
        return query;
    }



}