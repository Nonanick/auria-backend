import { ResourceSchema } from "./sql/ResourceSchema.js";
import { ResourceCatalog } from "./ResourceCatalog.js";
import { ColumnSchema } from "./sql/ColumnSchema.js";
import { ReferenceSchema } from "./sql/ReferenceSchema.js";

export class ResourcePagePermissionSchema extends ResourceSchema {

    constructor() {
        super({
            name: ResourceCatalog.ResourcePagePermission.name,
            table_name: ResourceCatalog.ResourcePagePermission.table_name,
            title: "@{Auria.Resource.ResourcePagePermission.Title}",
            description: "@{Auria.Resource.ResourcePagePermission.Description}",
            is_system_resource: true,
            status: "active"
        });

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


