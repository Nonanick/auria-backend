import { EntitySchema } from "./sql/EntitySchema.js";
import { EntityCatalog } from "./EntityCatalog.js";
import { ReferenceSchema } from "./sql/ReferenceSchema.js";

export class UserRoleSchema extends EntitySchema {
    constructor() {
        super({
            name : EntityCatalog.UserRole.name,
            table_name : EntityCatalog.UserRole.table_name,
            title : "@{Auria.Entity.UserRole.Title}",
            description : "@{Auria.Entity.UserRole.Description}",
            is_system_entity : true,
            status : "active"
        });

        

        this.addReferences(
            // User ID
            new ReferenceSchema(this, {
                name : "User_Inscribed_To_Role",
                // Source Info
                entity_id : this.get("_id"),
                entity_table_name : this.get("table_name"),
                entity_column_name : "user_id",
                // Reference Info
                reference_table_name : EntityCatalog.User.table_name,
                reference_column_name : "_id"
            }),
            // Role ID
            new ReferenceSchema(this, {
                name : "Role_Assigned_To_User",
                // Source Info
                entity_id : this.get("_id"),
                entity_table_name : this.get("table_name"),
                entity_column_name : "role_id",
                // Reference Info
                reference_table_name : EntityCatalog.Role.table_name,
                reference_column_name : "_id"
            }),
        )
    }
}