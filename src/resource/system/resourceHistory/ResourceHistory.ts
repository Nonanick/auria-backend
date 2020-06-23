import { ResourceClass } from "../../ResourceClass";
import { ResourceSchema } from "../../../database/schema/sql/ResourceSchema";
import { ResourceHistorySchema } from "../../../database/schema/ResourceActivity";

export class ResourceHistory extends ResourceClass {

    constructor() {
        super();

        this.addColumns(
            // Resource ID
            {
                schema: {
                    name: "Resource ID",
                    column_name: "resource_id",
                    sql_type: "CHAR",
                    length: 22,
                    title: "@{Auria.Columns.ResourceActivty.ResourceID.Title}",
                    description: "@{Auria.Column.ResourceActivity.ResourceID.Description}",
                    nullable: false,
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
                    title: "@{Auria.Columns.ResourceActivty.ResourceSchemaID.Title}",
                    description: "@{Auria.Column.ResourceActivity.ResourceSchemaID.Description}",
                    nullable: false,
                    status: "active"
                }
            },
            // User ID
            {
                schema: {
                    name: "User ID",
                    column_name: "user_id",
                    sql_type: "CHAR",
                    length: 22,
                    title: "@{Auria.Columns.ResourceActivty.UserID.Title}",
                    description: "@{Auria.Column.ResourceActivity.UserID.Description}",
                    nullable: false,
                    status: "active"
                }
            },
            // Role ID
            {
                schema: {
                    name: "Role ID",
                    column_name: "role_id",
                    sql_type: "CHAR",
                    length: 22,
                    title: "@{Auria.Columns.ResourceActivty.UserID.Title}",
                    description: "@{Auria.Column.ResourceActivity.UserID.Description}",
                    nullable: false,
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
                    title: "@{Auria.Column.ResourceActivty.UserAuthority.Title}",
                    description: "@{Auria.Column.ResourceActivty.UserAuthority.Description}",
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
                    title: "@{Auria.Column.ResourceActivty.RoleAuthority.Title}",
                    description: "@{Auria.Column.ResourceActivty.RoleAuthority.Description}",
                    status: "active"
                }
            },
            // Data Procedure
            {
                schema: {
                    name: "Data Procedure",
                    column_name: "data_procedure",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: false,
                    title: "@{Auria.Column.ResourceAccessShare.DataProcedure.Title}",
                    description: "@{Auria.Column.ResourceAccessShare.DataProcedure.Description}",
                    status: "active"
                }
            },
            // Extra Information
            {
                schema: {
                    name: "Extra Information",
                    column_name: "extra_information",
                    sql_type: "JSON",
                    nullable: true,
                    title: "@{Auria.Column.ResourceAccessShare.ExtraInformation.Title}",
                    description: "@{Auria.Column.ResourceAccessShare.ExtraInformation.Description}",
                    status: "active"
                }
            },
        );
    }

    public getBootDependencies(): string[] {
        return [];
    }

    public getBootFunction(): () => boolean | Promise<boolean> {
        return () => true;
    }
    protected buildSchema(): ResourceSchema {
        return new ResourceHistorySchema();
    }

}