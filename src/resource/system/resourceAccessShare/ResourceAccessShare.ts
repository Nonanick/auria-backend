import { ResourceClass } from "../../ResourceClass";
import { ResourceSchema } from "../../../database/schema/sql/ResourceSchema";

export class ResourceAccessShare extends ResourceClass {
    constructor() {
        super();

        this.addColumns(
            // _ID
            this.buildDefaultIdColumn(),

            // Resource ID
            {
                schema: {
                    name: "Resource ID",
                    column_name: "resource_id",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: false,
                    title: "@{Auria.Column.ResourceAccessShare.ResourceID.Title}",
                    description: "@{Auria.Column.ResourceAccessShare.ResourceID.Description}",
                    column_keys: ["IND"],
                    status: "active"
                }
            },
            // Resource Row ID
            {
                schema: {
                    name: "Resource Row ID",
                    column_name: "resource_row_id",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: false,
                    title: "@{Auria.Column.ResourceAccessShare.ResourceSchemaID.Title}",
                    description: "@{Auria.Column.ResourceAccessShare.ResourceSchemaID.Description}",
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
                    title: "@{Auria.Column.ResourceAccessShare.UserAuthority.Title}",
                    description: "@{Auria.Column.ResourceAccessShare.UserAuthority.Description}",
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
                    title: "@{Auria.Column.ResourceAccessShare.RoleAuthority.Title}",
                    description: "@{Auria.Column.ResourceAccessShare.RoleAuthority.Description}",
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
                    title: "@{Auria.Column.ResourceAccessShare.SharedWithUserID.Title}",
                    description: "@{Auria.Column.ResourceAccessShare.SharedWithUserID.Description}",
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
                    title: "@{Auria.Column.ResourceAccessShare.SharedWithRoleID.Title}",
                    description: "@{Auria.Column.ResourceAccessShare.SharedWithRoleID.Description}",
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
                    title: "@{Auria.Column.ResourceAccessShare.DataProcedure.Title}",
                    description: "@{Auria.Column.ResourceAccessShare.DataProcedure.Description}",
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
    protected buildSchema(): ResourceSchema {
        throw new Error("Method not implemented.");
    }

}