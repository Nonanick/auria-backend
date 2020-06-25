import { EntityClass } from "../../EntityClass";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema";

export class EntityAccessShare extends EntityClass {
    constructor() {
        super();

        this.addColumns(
            // _ID
            this.buildDefaultIdColumn(),

            // Entity ID
            {
                schema: {
                    name: "Entity ID",
                    column_name: "entity_id",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: false,
                    title: "@{Auria.Column.EntityAccessShare.EntityID.Title}",
                    description: "@{Auria.Column.EntityAccessShare.EntityID.Description}",
                    column_keys: ["IND"],
                    status: "active"
                }
            },
            // Entity Row ID
            {
                schema: {
                    name: "Entity Row ID",
                    column_name: "entity_row_id",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: false,
                    title: "@{Auria.Column.EntityAccessShare.EntitySchemaID.Title}",
                    description: "@{Auria.Column.EntityAccessShare.EntitySchemaID.Description}",
                    column_keys: ["IND"],
                    status: "active"
                }
            },
            // User Authority
            {
                schema: {
                    name: "User Authority",
                    column_name: "user_authority",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: true,
                    title: "@{Auria.Column.EntityAccessShare.UserAuthority.Title}",
                    description: "@{Auria.Column.EntityAccessShare.UserAuthority.Description}",
                    status: "active"
                }
            },
            // Role Authority
            {
                schema: {
                    name: "Role Authority",
                    column_name: "role_authority",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: true,
                    title: "@{Auria.Column.EntityAccessShare.RoleAuthority.Title}",
                    description: "@{Auria.Column.EntityAccessShare.RoleAuthority.Description}",
                    status: "active"
                }
            },
            // Shared With User ID
            {
                schema: {
                    name: "Shared With User ID",
                    column_name: "shared_with_user_id",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: true,
                    title: "@{Auria.Column.EntityAccessShare.SharedWithUserID.Title}",
                    description: "@{Auria.Column.EntityAccessShare.SharedWithUserID.Description}",
                    status: "active"
                }
            },
            // Shared With Role ID
            {
                schema: {
                    name: "Shared With Role ID",
                    column_name: "shared_with_role_id",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: true,
                    title: "@{Auria.Column.EntityAccessShare.SharedWithRoleID.Title}",
                    description: "@{Auria.Column.EntityAccessShare.SharedWithRoleID.Description}",
                    status: "active"
                }
            },
            // Data Procedure
            {
                schema: {
                    name: "Data Procedure",
                    column_name: "data_procedure",
                    sql_type: "VARCHAR",
                    nullable: false,
                    title: "@{Auria.Column.EntityAccessShare.DataProcedure.Title}",
                    description: "@{Auria.Column.EntityAccessShare.DataProcedure.Description}",
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
    protected buildSchema(): EntitySchema {
        throw new Error("Method not implemented.");
    }

}