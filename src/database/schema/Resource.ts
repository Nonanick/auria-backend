import { ResourceCatalog } from './ResourceCatalog.js';
import { ResourceSchema } from './sql/ResourceSchema.js';
import { ColumnSchema } from './sql/ColumnSchema.js';
import { ReferenceSchema } from './sql/ReferenceSchema.js';

export class Resource extends ResourceSchema {

    constructor() {
        super({
            name: ResourceCatalog.Resource.name,
            table_name: ResourceCatalog.Resource.table_name,
            title: "@{Auria.Resource.Resource.Title}",
            description: "@{Auria.Resource.Resource.Description}",
            is_system_resource: true
        });

        this.addColumns(
            // Name
            new ColumnSchema({
                name: "Name",
                column_name: "name",
                sql_type: "VARCHAR",
                nullable: false,
                title: "@{Auria.Column.Resource.Name.Title}",
                description: "@{Auria.Column.Resource.Name.Description}"
            }),
            // Table Name
            new ColumnSchema({
                name: "Table name",
                column_name: "table_name",
                sql_type: "VARCHAR",
                nullable: false,
                title: "@{Auria.Column.Resource.TableName.Title}",
                description: "@{Auria.Column.Resource.TableName.Description}"
            }),
            // Connection ID
            new ColumnSchema({
                name: "Connection ID",
                column_name: "connection_id",
                sql_type: "CHAR",
                length : 22,
                nullable: true,
                title: "@{Auria.Column.Resource.ConnectionId.Title}",
                description: "@{Auria.Column.Resource.ConnectionId.Description}"
            }),
            // Title
            new ColumnSchema({
                name: "Title",
                column_name: "title",
                sql_type: "VARCHAR",
                nullable: false,
                title: "@{Auria.Column.Resource.Title.Title}",
                description: "@{Auria.Column.Resource.Title.Description}"
            }),
            //Description
            new ColumnSchema({
                name: "Description",
                column_name: "description",
                sql_type: "TEXT",
                nullable: true,
                title: "@{Auria.Column.Resource.Description.Title}",
                description: "@{Auria.Column.Resource.Description.Description}"
            }),
            //Is System Resource
            new ColumnSchema({
                name: "Is System Resource",
                column_name: "is_system_resource",
                sql_type: "BOOLEAN",
                nullable: false,
                default_value: false,
                title: "@{Auria.Column.Resource.IsSystemResource.Title}",
                description: "@{Auria.Column.Resource.IsSystemResource.Description}"
            })
        );

        this.addReferences(
            
            // Connection ID
            new ReferenceSchema(this, {
                name: "Resource_Exists_In_Connection",

                // Source Info
                resource_id: this.get("_id"),
                resource_table_name: ResourceCatalog.Resource.table_name,
                resource_column_name: "connection_id",

                //Reference info
                reference_table_name: ResourceCatalog.Connection.table_name,
                reference_column_name: "_id"
            })
        )

    }

}

