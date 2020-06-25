import { EntitySchema } from "./sql/EntitySchema.js";
import { EntityCatalog } from "./EntityCatalog.js";
import { ReferenceSchema } from "./sql/ReferenceSchema.js";

export class EntityAccessShare extends EntitySchema {

    constructor() {
        super({
            name: EntityCatalog.EntityAccessShare.name,
            table_name: EntityCatalog.EntityAccessShare.table_name,
            title: "@{Auria.Entity.EntityAccessShare.Title}",
            description: "@{Auria.Entity.EntityAccessShare.Description}",
            is_system_entity: true,
            status: "active"
        });

        this.addReferences(
            // Entity ID
            new ReferenceSchema(this, {
                name: "Entity_That_Has_Shared_Row",

                // Source info
                entity_id: this.get("_id"),
                entity_table_name: this.get("table_name"),
                entity_column_name: "entity_id",

                // Reference info
                reference_table_name: EntityCatalog.Entity.table_name,
                reference_column_name: "_id"
            }),

            // User Authority 
            new ReferenceSchema(this, {
                name: "User_That_Granted_Share_Access",

                // Source info
                entity_id: this.get("_id"),
                entity_table_name: this.get("table_name"),
                entity_column_name: "user_authority",

                // Reference info
                reference_table_name: EntityCatalog.User.table_name,
                reference_column_name: "_id"
            }),

            // Role Authority 
            new ReferenceSchema(this, {
                name: "Role_That_Granted_Share_Access",

                // Source info
                entity_id: this.get("_id"),
                entity_table_name: this.get("table_name"),
                entity_column_name: "role_authority",

                // Reference info
                reference_table_name: EntityCatalog.Role.table_name,
                reference_column_name: "_id"
            }),

            // Shared With User
            new ReferenceSchema(this, {
                name: "User_That_Row_Was_Shared_With",

                // Source info
                entity_id: this.get("_id"),
                entity_table_name: this.get("table_name"),
                entity_column_name: "shared_with_user_id",

                // Reference info
                reference_table_name: EntityCatalog.User.table_name,
                reference_column_name: "_id"
            }),

            // Shared With Role
            new ReferenceSchema(this, {
                name: "Role_That_Row_Was_Shared_With",

                // Source info
                entity_id: this.get("_id"),
                entity_table_name: this.get("table_name"),
                entity_column_name: "shared_with_role_id",

                // Reference info
                reference_table_name: EntityCatalog.Role.table_name,
                reference_column_name: "_id"
            }),
        );
    }
}