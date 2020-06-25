import { EntitySchema } from "./sql/EntitySchema.js";
import { EntityCatalog } from "./EntityCatalog.js";
import { ReferenceSchema } from "./sql/ReferenceSchema.js";

export class EntityHistorySchema extends EntitySchema {

    constructor() {
        super({
            name: EntityCatalog.EntityActivity.name,
            table_name: EntityCatalog.EntityActivity.table_name,
            title: "@{Auria.Entity.EntityActivity.Title}",
            description: "@{Auria.Entity.EntityActivity.Description}",
            is_system_entity: true,
            status: "active"
        });

        this.addReferences(
            // Entity ID
            new ReferenceSchema(this, {
                name : "Activity_Belong_To_Entity",
                entity_id : this.get("_id"),
                entity_table_name : this.get("table_name"),
                entity_column_name : "entity_id",

                reference_table_name : EntityCatalog.Entity.table_name,
                reference_column_name : "_id"
            }),

            // User ID
            new ReferenceSchema(this, {
                name : "Activity_Performed_By_User",
                entity_id : this.get("_id"),
                entity_table_name : this.get("table_name"),
                entity_column_name : "user_id",

                reference_table_name : EntityCatalog.User.table_name,
                reference_column_name : "_id"
            }),
            // Role ID
            new ReferenceSchema(this, {
                name : "Activity_Performed_By_Role",
                entity_id : this.get("_id"),
                entity_table_name : this.get("table_name"),
                entity_column_name : "role_id",

                reference_table_name : EntityCatalog.Role.table_name,
                reference_column_name : "_id"
            }),

            // User Authority
            new ReferenceSchema(this, {
                name : "Activity_Authorized_By_User",
                entity_id : this.get("_id"),
                entity_table_name : this.get("table_name"),
                entity_column_name : "user_authority",

                reference_table_name : EntityCatalog.User.table_name,
                reference_column_name : "_id"
            }),
            // Role Authority
            new ReferenceSchema(this, {
                name : "Activity_Authorized_By_Role",
                entity_id : this.get("_id"),
                entity_table_name : this.get("table_name"),
                entity_column_name : "role_authority",

                reference_table_name : EntityCatalog.Role.table_name,
                reference_column_name : "_id"
            }),


        )
    }
}