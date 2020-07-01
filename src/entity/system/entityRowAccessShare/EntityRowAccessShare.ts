import { EntityClass } from "../../EntityClass.js";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema.js";
import { SystemEntityCatalog } from "../../../database/schema/SystemEntityCatalog.js";
import { IEntityInfo } from "../../standart/info/IEntityInfo.js";

export class EntityRowAccessShare extends EntityClass {
    
    constructor() {
        super(SystemEntityCatalog.EntityRowAccessShare.name);

        this.addColumns(
            // _ID
            this.buildDefaultIdColumn(),

            // Entity ID
            {
                name: "Entity Name",
                info: {
                    title: "@{Auria.Column.EntityAccessShare.EntityName.Title}",
                    description: "@{Auria.Column.EntityAccessShare.EntityName.Description}",
                },
                schema: {
                    column_name: "entity_name",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: false,
                    column_keys: ["IND"],
                    status: "active"
                }
            },
            // Entity Row ID
            {
                name: "Entity Row ID",
                info: {
                    title: "@{Auria.Column.EntityAccessShare.EntitySchemaID.Title}",
                    description: "@{Auria.Column.EntityAccessShare.EntitySchemaID.Description}",
                },
                schema: {
                    column_name: "entity_row_id",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: false,
                    column_keys: ["IND"],
                    status: "active"
                }
            },
            // User Authority
            {
                name: "User Authority",
                info: {
                    title: "@{Auria.Column.EntityAccessShare.UserAuthority.Title}",
                    description: "@{Auria.Column.EntityAccessShare.UserAuthority.Description}",
                },
                schema: {
                    column_name: "user_authority",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: true,
                    status: "active"
                }
            },
            // Role Authority
            {
                name: "Role Authority",
                info: {
                    title: "@{Auria.Column.EntityAccessShare.RoleAuthority.Title}",
                    description: "@{Auria.Column.EntityAccessShare.RoleAuthority.Description}",
                },
                schema: {
                    column_name: "role_authority",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: true,
                    status: "active"
                }
            },
            // Shared With User ID
            {
                name: "Shared With User ID",
                info: {
                    title: "@{Auria.Column.EntityAccessShare.SharedWithUserID.Title}",
                    description: "@{Auria.Column.EntityAccessShare.SharedWithUserID.Description}",
                },
                schema: {
                    column_name: "shared_with_user_id",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: true,
                    status: "active"
                }
            },
            // Shared With Role ID
            {
                name: "Shared With Role ID",
                info: {
                    title: "@{Auria.Column.EntityAccessShare.SharedWithRoleID.Title}",
                    description: "@{Auria.Column.EntityAccessShare.SharedWithRoleID.Description}",
                },
                schema: {
                    column_name: "shared_with_role_id",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: true,
                    status: "active"
                }
            },
            // Data Procedure
            {
                name: "Data Procedure",
                info: {
                    title: "@{Auria.Column.EntityAccessShare.DataProcedure.Title}",
                    description: "@{Auria.Column.EntityAccessShare.DataProcedure.Description}",
                },
                schema: {
                    column_name: "data_procedure",
                    sql_type: "VARCHAR",
                    nullable: false,
                    status: "active"
                }
            },

            // Status
            this.buildDefaultStatusColumn()
        );
    }

    public getBootDependencies(): string[] {
        throw new Error("Method not implemented.");
    }

    public getBootFunction(): () => boolean | Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    protected buildInfo(): IEntityInfo {
        return {
            title: "@{Auria.Entity.EntityRowAccessShare.Title}",
            description: "@{Auria.Entity.EntityRowAccessShare.Description}"
        };
    }

    protected buildSchema(): EntitySchema {
        return new EntitySchema({
            table_name: SystemEntityCatalog.EntityRowAccessShare.table_name,
            is_system_entity: true
        });
    }

}