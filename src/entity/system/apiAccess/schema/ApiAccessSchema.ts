import { EntitySchema } from "../../../../database/schema/sql/EntitySchema.js";
import { EntityCatalog } from "../../../../database/schema/EntityCatalog.js";
import { ReferenceSchema } from "../../../../database/schema/sql/ReferenceSchema.js";

export class ApiAccessSchema extends EntitySchema {


    constructor() {
        super({
            name: EntityCatalog.ApiAccess.name,
            table_name: EntityCatalog.ApiAccess.table_name,
            title: "@{Auria.Entity.ApiAccess.Title}",
            description: "@{Auria.Entity.ApiAccess.Description}",
            is_system_entity: true,
            status: "active"
        });

        this.addReferences(
            // User ID
            new ReferenceSchema( {
                name: "User_Have_Explicit_Permission_To_Api",

                entity_id: this.get("_id"),
                entity_table_name: this.get("table_name"),
                entity_column_name: "user_id",

                reference_table_name: EntityCatalog.User.table_name,
                reference_column_name: "_id"
            }),

            // Role ID
            new ReferenceSchema({
                name: "Role_Have_Explicit_Permission_To_Api",

                entity_id: this.get("_id"),
                entity_table_name: this.get("table_name"),
                entity_column_name: "user_id",

                reference_table_name: EntityCatalog.User.table_name,
                reference_column_name: "_id"
            }),

        );
    }
}