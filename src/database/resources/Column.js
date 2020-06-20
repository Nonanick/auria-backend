import { ResourceRow } from "./sql/ResourceRow.js";
import { ResourceCatalog } from "./ResourceCatalog.js";
import { ColumnRow } from "./sql/ColumnRow.js";
import { ReferenceRow } from "./sql/ReferenceRow.js";
export class Column extends ResourceRow {
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
        new ColumnRow({
            name: "Resource Id",
            column_name: "resource_id",
            sql_type: "CHAR",
            length: 22,
            column_keys: ["IND"],
            description: "Reference to Auria resource ID",
            nullable: false,
            status: 'active',
            title: "@{Auria.Columns.Column.ResourceId.Title}"
        }), 
        // Name 
        new ColumnRow({
            name: "Name",
            column_name: "name",
            sql_type: "VARCHAR",
            nullable: false,
            status: 'active',
            title: "@{Auria.Columns.Column.Name.Title}",
            description: "@{Auria.Columns.Column.Name.Description}"
        }), 
        // Column Name
        new ColumnRow({
            name: "Column Name",
            column_name: "column_name",
            sql_type: "VARCHAR",
            nullable: false,
            status: 'active',
            title: "@{Auria.Columns.Column.ColumnName.Title}",
            description: "@{Auria.Columns.Column.ColumnName.Description}"
        }), 
        // Title 
        new ColumnRow({
            name: "Title",
            column_name: "title",
            sql_type: "VARCHAR",
            nullable: false,
            status: 'active',
            title: "@{Auria.Columns.Column.Title.Title}",
            description: "@{Auria.Columns.Column.Title.Description}"
        }), 
        // Description 
        new ColumnRow({
            name: "Description",
            column_name: "description",
            sql_type: "TEXT",
            nullable: true,
            status: 'active',
            title: "@{Auria.Columns.Column.Description.Title}",
            description: "@{Auria.Columns.Column.Description.Description}"
        }), 
        // SQL Type
        new ColumnRow({
            name: "SQL Type",
            column_name: "sql_type",
            sql_type: "VARCHAR",
            nullable: false,
            status: 'active',
            title: "@{Auria.Columns.Column.SQLType.Title}",
            description: "@{Auria.Columns.Column.SQLType.Description}"
        }), 
        // Length 
        new ColumnRow({
            name: "Length",
            column_name: "length",
            sql_type: "INTEGER",
            nullable: true,
            status: 'active',
            title: "@{Auria.Columns.Column.Length.Title}",
            description: "@{Auria.Columns.Column.Length.Description}"
        }), 
        // Data Type
        new ColumnRow({
            name: "Data Type",
            column_name: "data_type",
            sql_type: "VARCHAR",
            nullable: false,
            status: 'active',
            title: "@{Auria.Columns.Column.DataType.Title}",
            description: "@{Auria.Columns.Column.DataType.Description}"
        }), 
        // Default Value
        new ColumnRow({
            name: "Default Value",
            column_name: "default_value",
            sql_type: "VARCHAR",
            nullable: true,
            status: 'active',
            title: "@{Auria.Columns.Column.DefaultValue.Title}",
            description: "@{Auria.Columns.Column.DefaultValue.Description}"
        }), 
        // Nullable
        new ColumnRow({
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
        new ColumnRow({
            name: "Column Keys",
            column_name: "column_keys",
            sql_type: "VARCHAR",
            nullable: true,
            status: 'active',
            title: "@{Auria.Columns.Column.ColumnKeys.Title}",
            description: "@{Auria.Columns.Column.ColumnKeys.Description}",
            default_value: ""
        }), 
        // Reference ID
        new ColumnRow({
            name: "Reference ID",
            column_name: "reference_id",
            sql_type: "CHAR",
            length: 22,
            nullable: true,
            status: 'active',
            title: "@{Auria.Columns.Column.ReferenceId.Title}",
            description: "@{Auria.Columns.Column.ReferenceId.Description}",
        }));
        this.addReferences(
        // Reference ID
        new ReferenceRow(this, {
            name: "Column_Has_Reference_ID",
            // Source Info
            resource_id: this.get("_id"),
            resource_table_name: ResourceCatalog.Column.table_name,
            resource_column_name: 'reference_id',
            // Reference info
            reference_table_name: ResourceCatalog.Reference.table_name,
            reference_column_name: "_id",
        }), 
        // Resource ID
        new ReferenceRow(this, {
            name: "Column_Belong_To_Resource_ID",
            // Source Info
            resource_id: this.get("_id"),
            resource_table_name: ResourceCatalog.Column.table_name,
            resource_column_name: 'resource_id',
            // Reference info
            reference_table_name: ResourceCatalog.Resource.table_name,
            reference_column_name: "_id",
        }));
    }
}
//# sourceMappingURL=Column.js.map