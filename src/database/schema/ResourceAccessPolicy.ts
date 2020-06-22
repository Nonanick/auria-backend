import { ResourceSchema } from "./sql/ResourceSchema.js";
import { ResourceCatalog } from "./ResourceCatalog.js";
import { ColumnSchema } from "./sql/ColumnSchema.js";
import { ReferenceSchema } from "./sql/ReferenceSchema.js";

export class ResourceAccessPolicy extends ResourceSchema {

    constructor() {
        super({
            name: ResourceCatalog.ResourceAccessPolicy.name,
            table_name: ResourceCatalog.ResourceAccessPolicy.table_name,
            title: "@{Auria.Resource.ResourceAccessPolicy.Title}",
            description: "@{Auria.Resource.ResourceAccessPolicy.Description}",
            status: "active",
            is_system_resource: true,
        });

        this.addColumns(
            // Resource ID
            new ColumnSchema({
                name: "Resource ID",
                column_name: "resource_id",
                sql_type: "CHAR",
                length : 22,
                nullable: false,
                title: "@{Auria.Columns.ResourceAccessPolicy.ResourceID.Title}",
                description: "@{Auria.Columns.ResourceAccessPolicy.ResourceID.Description}",
            }),
            // User ID
            new ColumnSchema({
                name: "User ID",
                column_name: "user_id",
                sql_type: "CHAR",
                length : 22,
                nullable: true,
                title: "@{Auria.Columns.ResourceAccessPolicy.UserID.Title}",
                description: "@{Auria.Columns.ResourceAccessPolicy.UserID.Description}",
            }),
            // Role ID
            new ColumnSchema({
                name: "Role ID",
                column_name: "role_id",
                sql_type: "CHAR",
                length : 22,
                nullable: true,
                title: "@{Auria.Columns.ResourceAccessPolicy.RoleID.Title}",
                description: "@{Auria.Columns.ResourceAccessPolicy.RoleID.Description}",
            }),
            // Resource Row ID
            new ColumnSchema({
                name: "Resource Row ID",
                column_name: "resource_row_id",
                sql_type: "CHAR",
                length : 22,
                nullable: false,
                title: "@{Auria.Columns.ResourceAccessPolicy.ResourceSchemaID.Title}",
                description: "@{Auria.Columns.ResourceAccessPolicy.ResourceSchemaID.Description}",
            }),
            // Data Procedure
            new ColumnSchema({
                name: "Data Procedure",
                column_name: "data_procedure",
                sql_type: "VARCHAR",
                nullable: false,
                title: "@{Auria.Columns.ResourceAccessPolicy.DataProcedure.Title}",
                description: "@{Auria.Columns.ResourceAccessPolicy.DataProcedure.Description}",
            }),
        );

        this.addReferences(
            // Resource ID
            new ReferenceSchema(this, {
                name: "Resource_Which_Policy_Applies",
                // Source Info
                resource_id : this.get("_id"),
                resource_table_name : this.get("table_name"),
                resource_column_name : "resource_id",

                // Reference Info
                reference_table_name : ResourceCatalog.Resource.table_name,
                reference_column_name : "_id"
            }),

             // User ID
             new ReferenceSchema(this, {
                name: "User_That_Policy_Applies_To",
                // Source Info
                resource_id : this.get("_id"),
                resource_table_name : this.get("table_name"),
                resource_column_name : "user_id",

                // Reference Info
                reference_table_name : ResourceCatalog.User.table_name,
                reference_column_name : "_id"
            }),

            // Role ID
            new ReferenceSchema(this, {
                name: "Role_That_Policy_Applies_To",
                // Source Info
                resource_id : this.get("_id"),
                resource_table_name : this.get("table_name"),
                resource_column_name : "role_id",

                // Reference Info
                reference_table_name : ResourceCatalog.Role.table_name,
                reference_column_name : "_id"
            })
        )
    }
}