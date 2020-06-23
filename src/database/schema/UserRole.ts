import { ResourceSchema } from "./sql/ResourceSchema.js";
import { ResourceCatalog } from "./ResourceCatalog.js";
import { ReferenceSchema } from "./sql/ReferenceSchema.js";

export class UserRoleSchema extends ResourceSchema {
    constructor() {
        super({
            name : ResourceCatalog.UserRole.name,
            table_name : ResourceCatalog.UserRole.table_name,
            title : "@{Auria.Resource.UserRole.Title}",
            description : "@{Auria.Resource.UserRole.Description}",
            is_system_resource : true,
            status : "active"
        });

        

        this.addReferences(
            // User ID
            new ReferenceSchema(this, {
                name : "User_Inscribed_To_Role",
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
                name : "Role_Assigned_To_User",
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