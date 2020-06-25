import { EntitySchema } from "./sql/EntitySchema.js";
import { EntityCatalog } from "./EntityCatalog.js";
import { ColumnSchema } from "./sql/ColumnSchema.js";
import { ReferenceSchema } from "./sql/ReferenceSchema.js";

export class EntityPagePermissionSchema extends EntitySchema {

    constructor() {
        super({
            name: EntityCatalog.EntityPagePermission.name,
            table_name: EntityCatalog.EntityPagePermission.table_name,
            title: "@{Auria.Entity.EntityPagePermission.Title}",
            description: "@{Auria.Entity.EntityPagePermission.Description}",
            is_system_entity: true,
            status: "active"
        });

        this.addReferences(
            // Page ID
            new ReferenceSchema(this, {
                name : "Permission_Applies_To_Page",
                // Source Info
                entity_id : this.get("_id"),
                entity_table_name : this.get("table_name"),
                entity_column_name : "page_id",

                // Reference Info
                reference_table_name : EntityCatalog.ModulePage.table_name,
                reference_column_name : "_id"
            }),

            // User ID
            new ReferenceSchema(this, {
                name : "Permission_Granted_To_User",
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
                name : "Permission_Granted_To_Role",
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


