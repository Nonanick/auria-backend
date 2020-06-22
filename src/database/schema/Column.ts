import { ResourceCatalog } from "./ResourceCatalog.js";
import { ColumnSchema } from "./sql/ColumnSchema.js";
import { ResourceSchema } from "./sql/ResourceSchema.js";
import { ReferenceSchema } from "./sql/ReferenceSchema.js";

export class Column extends ResourceSchema {

    constructor() {
        super({
            name: ResourceCatalog.Column.name,
            table_name: ResourceCatalog.Column.table_name,
            title: "@{Auria.Resource.Column.Title}",
            description: "@{Auria.Resource.Column.Description}",
            is_system_resource: true
        });

        this.addColumns(
            // Resource ID
            new ColumnSchema({
                name: "Resource Id",
                column_name: "resource_id",
                sql_type: "CHAR",
                length : 22,
                column_keys: ["IND"],
                description: "Reference to Auria resource ID",
                nullable: false,
                status: 'active',
                title: "@{Auria.Columns.Column.ResourceId.Title}"
            }),
            // Name 
            new ColumnSchema({
                name: "Name",
                column_name: "name",
                sql_type: "VARCHAR",
                nullable: false,
                status: 'active',
                title: "@{Auria.Columns.Column.Name.Title}",
                description: "@{Auria.Columns.Column.Name.Description}"
            }),
            // Column Name
            new ColumnSchema({
                name: "Column Name",
                column_name: "column_name",
                sql_type: "VARCHAR",
                nullable: false,
                status: 'active',
                title: "@{Auria.Columns.Column.ColumnName.Title}",
                description: "@{Auria.Columns.Column.ColumnName.Description}"
            }),
            // Title 
            new ColumnSchema({
                name: "Title",
                column_name: "title",
                sql_type: "VARCHAR",
                nullable: false,
                status: 'active',
                title: "@{Auria.Columns.Column.Title.Title}",
                description: "@{Auria.Columns.Column.Title.Description}"
            }),
            // Description 
            new ColumnSchema({
                name: "Description",
                column_name: "description",
                sql_type: "TEXT",
                nullable: true,
                status: 'active',
                title: "@{Auria.Columns.Column.Description.Title}",
                description: "@{Auria.Columns.Column.Description.Description}"
            }),
            // SQL Type
            new ColumnSchema({
                name: "SQL Type",
                column_name: "sql_type",
                sql_type: "VARCHAR",
                nullable: false,
                status: 'active',
                title: "@{Auria.Columns.Column.SQLType.Title}",
                description: "@{Auria.Columns.Column.SQLType.Description}"
            }),
            // Length 
            new ColumnSchema({
                name: "Length",
                column_name: "length",
                sql_type: "INTEGER",
                nullable: true,
                status: 'active',
                title: "@{Auria.Columns.Column.Length.Title}",
                description: "@{Auria.Columns.Column.Length.Description}"
            }),
            // Data Type
            new ColumnSchema({
                name: "Data Type",
                column_name: "data_type",
                sql_type: "VARCHAR",
                nullable: false,
                status: 'active',
                title: "@{Auria.Columns.Column.DataType.Title}",
                description: "@{Auria.Columns.Column.DataType.Description}"
            }),
            // Default Value
            new ColumnSchema({
                name: "Default Value",
                column_name: "default_value",
                sql_type: "VARCHAR",
                nullable: true,
                status: 'active',
                title: "@{Auria.Columns.Column.DefaultValue.Title}",
                description: "@{Auria.Columns.Column.DefaultValue.Description}"
            }),
            // Nullable
            new ColumnSchema({
                name: "Nullable",
                column_name: "nullable",
                sql_type: "BOOLEAN",
                nullable: false,
                status: 'active',
                title: "@{Auria.Columns.Column.Nullable.Title}",
                description: "@{Auria.Columns.Column.Nullable.Description}",
                default_value: true
            }),
            // Column Keys
            new ColumnSchema({
                name: "Column Keys",
                column_name: "column_keys",
                sql_type: "VARCHAR",
                nullable: true,
                status: 'active',
                title: "@{Auria.Columns.Column.ColumnKeys.Title}",
                description: "@{Auria.Columns.Column.ColumnKeys.Description}",
                default_value: ""
            }),
            // Readable
            new ColumnSchema({
                name: "Readable",
                column_name: "readable",
                sql_type: "BOOLEAN",
                nullable: false,
                status: 'active',
                title: "@{Auria.Columns.Column.Readable.Title}",
                description: "@{Auria.Columns.Column.Readable.Description}",
                default_value: true
            }),
            // Readable
            new ColumnSchema({
                name: "Required",
                column_name: "required",
                sql_type: "BOOLEAN",
                nullable: false,
                status: 'active',
                title: "@{Auria.Columns.Column.Readable.Title}",
                description: "@{Auria.Columns.Column.Readable.Description}",
                default_value: false
            }),
            // Reference ID
            new ColumnSchema({
                name: "Reference ID",
                column_name: "reference_id",
                sql_type: "CHAR",
                length : 22,
                nullable: true,
                status: 'active',
                title: "@{Auria.Columns.Column.ReferenceId.Title}",
                description: "@{Auria.Columns.Column.ReferenceId.Description}",
            })
        );

        this.addReferences(
            // Reference ID
            new ReferenceSchema(this, {
                name: "Column_Has_Reference_ID",
                // Source Info
                resource_id : this.get("_id"),
                resource_table_name: ResourceCatalog.Column.table_name,
                resource_column_name: 'reference_id',

                // Reference info
                reference_table_name: ResourceCatalog.Reference.table_name,
                reference_column_name: "_id",
            }),
            // Resource ID
            new ReferenceSchema(this, {
                name: "Column_Belong_To_Resource_ID",
                // Source Info
                resource_id : this.get("_id"),
                resource_table_name: ResourceCatalog.Column.table_name,
                resource_column_name: 'resource_id',
                
                // Reference info
                reference_table_name: ResourceCatalog.Resource.table_name,
                reference_column_name: "_id",
            })
        )
    }
}