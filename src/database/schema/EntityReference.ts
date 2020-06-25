import { EntitySchema } from "./sql/EntitySchema.js";
import { EntityCatalog } from "./EntityCatalog.js";
import { ColumnSchema } from "./sql/ColumnSchema.js";
import { ReferenceSchema } from "./sql/ReferenceSchema.js";

export class EntityReference extends EntitySchema {

    constructor() {
        super({
            name: EntityCatalog.Reference.name,
            table_name: EntityCatalog.Reference.table_name,
            title: "@{Auria.Entity.EntityReference.Title}",
            description: "@{Auria.Entity.EntityReference.Description}",
            is_system_entity: true,
            status: "active"
        });

        this.addColumns(
            // Name
            new ColumnSchema({
                name: "Name",
                column_name: "name",
                sql_type: "VARCHAR",
                nullable: false,
                title: "@{Auria.Columns.EntityReference.Name.Title}",
                description: "@{Auria.Columns.EntityReference.Name.Description}",
                entity_id: this.get("_id"),
                status: "active"
            }),
            // Entity ID
            new ColumnSchema({
                name: "Entity ID",
                column_name: "entity_id",
                sql_type: "CHAR",
                length : 22,
                column_keys: ["IND"],
                nullable: false,
                title: "@{Auria.Columns.EntityReference.Name.Title}",
                description: "@{Auria.Columns.EntityReference.Name.Description}",
                entity_id: this.get("_id"),
                status: "active"
            }),
            // Entity Table Name
            new ColumnSchema({
                name: "Entity Table Name",
                column_name: "entity_table_name",
                sql_type: "VARCHAR",
                nullable: false,
                title: "@{Auria.Columns.EntityReference.EntityTableName.Title}",
                description: "@{Auria.Columns.EntityReference.EntityTableName.Description}",
                entity_id: this.get("_id"),
                status: "active"
            }),
            // Entity Table Name
            new ColumnSchema({
                name: "Entity Column Name",
                column_name: "entity_column_name",
                sql_type: "VARCHAR",
                nullable: false,
                title: "@{Auria.Columns.EntityReference.EntityColumnName.Title}",
                description: "@{Auria.Columns.EntityReference.EntityColumnName.Description}",
                entity_id: this.get("_id"),
                status: "active"
            }),
            // Reference Table Name
            new ColumnSchema({
                name: "Reference Table Name",
                column_name: "reference_table_name",
                sql_type: "VARCHAR",
                nullable: false,
                title: "@{Auria.Columns.EntityReference.ReferenceTableName.Title}",
                description: "@{Auria.Columns.EntityReference.ReferenceTableName.Description}",
                entity_id: this.get("_id"),
                status: "active"
            }),
            // Reference Column Name
            new ColumnSchema({
                name: "Reference Column Name",
                column_name: "reference_column_name",
                sql_type: "VARCHAR",
                nullable: false,
                title: "@{Auria.Columns.EntityReference.ReferenceColumnName.Title}",
                description: "@{Auria.Columns.EntityReference.ReferenceColumnName.Description}",
                entity_id: this.get("_id"),
                status: "active"
            }),

        );

        this.addReferences(

            // Entity ID
            new ReferenceSchema(this, {
                name: "Reference_Belong_To_Entity",
                //Source Info
                entity_id: this.get("_id"),
                entity_table_name: EntityCatalog.Reference.table_name,
                entity_column_name: "entity_id",

                // Reference info
                reference_table_name: EntityCatalog.Entity.table_name,
                reference_column_name: "_id"
            })
        )
    }
}