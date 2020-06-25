import { EntityCatalog } from './EntityCatalog.js';
import { EntitySchema } from './sql/EntitySchema.js';
import { ColumnSchema } from './sql/ColumnSchema.js';
import { ReferenceSchema } from './sql/ReferenceSchema.js';

export class Entity extends EntitySchema {

    constructor() {
        super({
            name: EntityCatalog.Entity.name,
            table_name: EntityCatalog.Entity.table_name,
            title: "@{Auria.Entity.Entity.Title}",
            description: "@{Auria.Entity.Entity.Description}",
            is_system_entity: true
        });

        this.addColumns(
            // Name
            new ColumnSchema({
                name: "Name",
                column_name: "name",
                sql_type: "VARCHAR",
                nullable: false,
                title: "@{Auria.Column.Entity.Name.Title}",
                description: "@{Auria.Column.Entity.Name.Description}"
            }),
            // Table Name
            new ColumnSchema({
                name: "Table name",
                column_name: "table_name",
                sql_type: "VARCHAR",
                nullable: false,
                title: "@{Auria.Column.Entity.TableName.Title}",
                description: "@{Auria.Column.Entity.TableName.Description}"
            }),
            // Connection ID
            new ColumnSchema({
                name: "Connection ID",
                column_name: "connection_id",
                sql_type: "CHAR",
                length : 22,
                nullable: true,
                title: "@{Auria.Column.Entity.ConnectionId.Title}",
                description: "@{Auria.Column.Entity.ConnectionId.Description}"
            }),
            // Title
            new ColumnSchema({
                name: "Title",
                column_name: "title",
                sql_type: "VARCHAR",
                nullable: false,
                title: "@{Auria.Column.Entity.Title.Title}",
                description: "@{Auria.Column.Entity.Title.Description}"
            }),
            //Description
            new ColumnSchema({
                name: "Description",
                column_name: "description",
                sql_type: "TEXT",
                nullable: true,
                title: "@{Auria.Column.Entity.Description.Title}",
                description: "@{Auria.Column.Entity.Description.Description}"
            }),
            //Is System Entity
            new ColumnSchema({
                name: "Is System Entity",
                column_name: "is_system_entity",
                sql_type: "BOOLEAN",
                nullable: false,
                default_value: false,
                title: "@{Auria.Column.Entity.IsSystemEntity.Title}",
                description: "@{Auria.Column.Entity.IsSystemEntity.Description}"
            })
        );

        this.addReferences(
            
            // Connection ID
            new ReferenceSchema(this, {
                name: "Entity_Exists_In_Connection",

                // Source Info
                entity_id: this.get("_id"),
                entity_table_name: EntityCatalog.Entity.table_name,
                entity_column_name: "connection_id",

                //Reference info
                reference_table_name: EntityCatalog.Connection.table_name,
                reference_column_name: "_id"
            })
        )

    }

}

