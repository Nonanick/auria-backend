import { ResourceSchema } from "./sql/ResourceSchema.js";
import { ResourceCatalog } from "./ResourceCatalog.js";
import { ReferenceSchema } from "./sql/ReferenceSchema.js";

export class ResourceAccessShare extends ResourceSchema {

    constructor() {
        super({
            name: ResourceCatalog.ResourceAccessShare.name,
            table_name: ResourceCatalog.ResourceAccessShare.table_name,
            title: "@{Auria.Resource.ResourceAccessShare.Title}",
            description: "@{Auria.Resource.ResourceAccessShare.Description}",
            is_system_resource: true,
            status: "active"
        });

        this.addReferences(
            // Resource ID
            new ReferenceSchema(this, {
                name: "Resource_That_Has_Shared_Row",

                // Source info
                resource_id: this.get("_id"),
                resource_table_name: this.get("table_name"),
                resource_column_name: "resource_id",

                // Reference info
                reference_table_name: ResourceCatalog.Resource.table_name,
                reference_column_name: "_id"
            }),

            // User Authority 
            new ReferenceSchema(this, {
                name: "User_That_Granted_Share_Access",

                // Source info
                resource_id: this.get("_id"),
                resource_table_name: this.get("table_name"),
                resource_column_name: "user_authority",

                // Reference info
                reference_table_name: ResourceCatalog.User.table_name,
                reference_column_name: "_id"
            }),

            // Role Authority 
            new ReferenceSchema(this, {
                name: "Role_That_Granted_Share_Access",

                // Source info
                resource_id: this.get("_id"),
                resource_table_name: this.get("table_name"),
                resource_column_name: "role_authority",

                // Reference info
                reference_table_name: ResourceCatalog.Role.table_name,
                reference_column_name: "_id"
            }),

            // Shared With User
            new ReferenceSchema(this, {
                name: "User_That_Row_Was_Shared_With",

                // Source info
                resource_id: this.get("_id"),
                resource_table_name: this.get("table_name"),
                resource_column_name: "shared_with_user_id",

                // Reference info
                reference_table_name: ResourceCatalog.User.table_name,
                reference_column_name: "_id"
            }),

            // Shared With Role
            new ReferenceSchema(this, {
                name: "Role_That_Row_Was_Shared_With",

                // Source info
                resource_id: this.get("_id"),
                resource_table_name: this.get("table_name"),
                resource_column_name: "shared_with_role_id",

                // Reference info
                reference_table_name: ResourceCatalog.Role.table_name,
                reference_column_name: "_id"
            }),
        );
    }
}