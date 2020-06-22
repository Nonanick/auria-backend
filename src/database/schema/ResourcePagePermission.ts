import { ResourceSchema } from "./sql/ResourceSchema.js";
import { ResourceCatalog } from "./ResourceCatalog.js";
import { ColumnSchema } from "./sql/ColumnSchema.js";
import { ReferenceSchema } from "./sql/ReferenceSchema.js";

export class ResourcePagePermission extends ResourceSchema {

    constructor() {
        super({
            name: ResourceCatalog.ResourcePagePermission.name,
            table_name: ResourceCatalog.ResourcePagePermission.table_name,
            title: "@{Auria.Resource.ResourcePagePermission.Title}",
            description: "@{Auria.Resource.ResourcePagePermission.Description}",
            is_system_resource: true,
            status: "active"
        });

        this.addColumns(
            // Page ID
            new ColumnSchema({
                name: "Page ID",
                column_name: "page_id",
                sql_type: "CHAR",
                length : 22,
                title: "@{Auria.Columns.ResourcePagePermission.PageID.Title}",
                description: "@{Auria.Columns.ResourcePagePermission.PageID.Description}",
                nullable: false,
                column_keys : ["IND"],
                status : "active"
            }),
            // User ID
            new ColumnSchema({
                name: "User ID",
                column_name: "user_id",
                sql_type: "CHAR",
                length : 22,
                title: "@{Auria.Columns.ResourcePagePermission.UserID.Title}",
                description: "@{Auria.Columns.ResourcePagePermission.UserID.Description}",
                nullable: true,
                column_keys : ["IND"],
                status : "active"
            }),
            // Role ID
            new ColumnSchema({
                name: "Role ID",
                column_name: "role_id",
                sql_type: "CHAR",
                length : 22,
                title: "@{Auria.Columns.ResourcePagePermission.RoleID.Title}",
                description: "@{Auria.Columns.ResourcePagePermission.RoleID.Description}",
                nullable: true,
                column_keys : ["IND"],
                status : "active"
            }),
        );

        this.addReferences(
            // Page ID
            new ReferenceSchema(this, {
                name : "Permission_Applies_To_Page",
                // Source Info
                resource_id : this.get("_id"),
                resource_table_name : this.get("table_name"),
                resource_column_name : "page_id",

                // Reference Info
                reference_table_name : ResourceCatalog.ModulePage.table_name,
                reference_column_name : "_id"
            }),

            // User ID
            new ReferenceSchema(this, {
                name : "Permission_Granted_To_User",
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
                name : "Permission_Granted_To_Role",
                // Source Info
                resource_id : this.get("_id"),
                resource_table_name : this.get("table_name"),
                resource_column_name : "role_id",

                // Reference Info
                reference_table_name : ResourceCatalog.Role.table_name,
                reference_column_name : "_id"
            }),
        )
    }
}


