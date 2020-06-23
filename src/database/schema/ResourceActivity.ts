import { ResourceSchema } from "./sql/ResourceSchema.js";
import { ResourceCatalog } from "./ResourceCatalog.js";
import { ReferenceSchema } from "./sql/ReferenceSchema.js";

export class ResourceHistorySchema extends ResourceSchema {

    constructor() {
        super({
            name: ResourceCatalog.ResourceActivity.name,
            table_name: ResourceCatalog.ResourceActivity.table_name,
            title: "@{Auria.Resource.ResourceActivity.Title}",
            description: "@{Auria.Resource.ResourceActivity.Description}",
            is_system_resource: true,
            status: "active"
        });

        this.addReferences(
            // Resource ID
            new ReferenceSchema(this, {
                name : "Activity_Belong_To_Resource",
                resource_id : this.get("_id"),
                resource_table_name : this.get("table_name"),
                resource_column_name : "resource_id",

                reference_table_name : ResourceCatalog.Resource.table_name,
                reference_column_name : "_id"
            }),

            // User ID
            new ReferenceSchema(this, {
                name : "Activity_Performed_By_User",
                resource_id : this.get("_id"),
                resource_table_name : this.get("table_name"),
                resource_column_name : "user_id",

                reference_table_name : ResourceCatalog.User.table_name,
                reference_column_name : "_id"
            }),
            // Role ID
            new ReferenceSchema(this, {
                name : "Activity_Performed_By_Role",
                resource_id : this.get("_id"),
                resource_table_name : this.get("table_name"),
                resource_column_name : "role_id",

                reference_table_name : ResourceCatalog.Role.table_name,
                reference_column_name : "_id"
            }),

            // User Authority
            new ReferenceSchema(this, {
                name : "Activity_Authorized_By_User",
                resource_id : this.get("_id"),
                resource_table_name : this.get("table_name"),
                resource_column_name : "user_authority",

                reference_table_name : ResourceCatalog.User.table_name,
                reference_column_name : "_id"
            }),
            // Role Authority
            new ReferenceSchema(this, {
                name : "Activity_Authorized_By_Role",
                resource_id : this.get("_id"),
                resource_table_name : this.get("table_name"),
                resource_column_name : "role_authority",

                reference_table_name : ResourceCatalog.Role.table_name,
                reference_column_name : "_id"
            }),


        )
    }
}