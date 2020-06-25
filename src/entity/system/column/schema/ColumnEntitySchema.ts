import { EntitySchema } from "../../../../database/schema/sql/EntitySchema.js";
import { EntityCatalog } from "../../../../database/schema/EntityCatalog.js";
import { ReferenceSchema } from "../../../../database/schema/sql/ReferenceSchema.js";

export class ColumnEntitySchema extends EntitySchema {

    constructor() {
        super({
            name: EntityCatalog.Column.name,
            table_name: EntityCatalog.Column.table_name,
            title: "@{Auria.Entity.Column.Title}",
            description: "@{Auria.Entity.Column.Description}",
            is_system_entity: true
        });

        this.addReferences(
            // Reference ID
            new ReferenceSchema( {
                name: "Column_Has_Reference_ID",
                // Source Info
                entity_id : this.get("_id"),
                entity_table_name: EntityCatalog.Column.table_name,
                entity_column_name: 'reference_id',

                // Reference info
                reference_table_name: EntityCatalog.Reference.table_name,
                reference_column_name: "_id",
            }),
            // Entity ID
            new ReferenceSchema({
                name: "Column_Belong_To_Entity_ID",
                // Source Info
                entity_id : this.get("_id"),
                entity_table_name: EntityCatalog.Column.table_name,
                entity_column_name: 'entity_id',
                
                // Reference info
                reference_table_name: EntityCatalog.Entity.table_name,
                reference_column_name: "_id",
            })
        )
    }
}