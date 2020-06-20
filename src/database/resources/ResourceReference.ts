import { ResourceRow } from "./sql/ResourceRow.js";
import { ResourceCatalog } from "./ResourceCatalog.js";
import { ColumnRow } from "./sql/ColumnRow.js";
import { ReferenceRow } from "./sql/ReferenceRow.js";

export class ResourceReference extends ResourceRow {

    constructor() {
        super({
            name: ResourceCatalog.Reference.name,
            table_name: ResourceCatalog.Reference.table_name,
            title: "@{Auria.Resource.ResourceReference.Title}",
            description: "@{Auria.Resource.ResourceReference.Description}",
            is_system_resource: true,
            status: "active"
        });

        this.addColumns(
            // Name
            new ColumnRow({
                name: "Name",
                column_name: "name",
                sql_type: "VARCHAR",
                nullable: false,
                title: "@{Auria.Columns.ResourceReference.Name.Title}",
                description: "@{Auria.Columns.ResourceReference.Name.Description}",
                resource_id: this.get("_id"),
                status: "active"
            }),
            // Resource ID
            new ColumnRow({
                name: "Resource ID",
                column_name: "resource_id",
                sql_type: "CHAR",
                length : 22,
                column_keys: ["IND"],
                nullable: false,
                title: "@{Auria.Columns.ResourceReference.Name.Title}",
                description: "@{Auria.Columns.ResourceReference.Name.Description}",
                resource_id: this.get("_id"),
                status: "active"
            }),
            // Resource Table Name
            new ColumnRow({
                name: "Resource Table Name",
                column_name: "resource_table_name",
                sql_type: "VARCHAR",
                nullable: false,
                title: "@{Auria.Columns.ResourceReference.ResourceTableName.Title}",
                description: "@{Auria.Columns.ResourceReference.ResourceTableName.Description}",
                resource_id: this.get("_id"),
                status: "active"
            }),
            // Resource Table Name
            new ColumnRow({
                name: "Resource Column Name",
                column_name: "resource_column_name",
                sql_type: "VARCHAR",
                nullable: false,
                title: "@{Auria.Columns.ResourceReference.ResourceColumnName.Title}",
                description: "@{Auria.Columns.ResourceReference.ResourceColumnName.Description}",
                resource_id: this.get("_id"),
                status: "active"
            }),
            // Reference Table Name
            new ColumnRow({
                name: "Reference Table Name",
                column_name: "reference_table_name",
                sql_type: "VARCHAR",
                nullable: false,
                title: "@{Auria.Columns.ResourceReference.ReferenceTableName.Title}",
                description: "@{Auria.Columns.ResourceReference.ReferenceTableName.Description}",
                resource_id: this.get("_id"),
                status: "active"
            }),
            // Reference Column Name
            new ColumnRow({
                name: "Reference Column Name",
                column_name: "reference_column_name",
                sql_type: "VARCHAR",
                nullable: false,
                title: "@{Auria.Columns.ResourceReference.ReferenceColumnName.Title}",
                description: "@{Auria.Columns.ResourceReference.ReferenceColumnName.Description}",
                resource_id: this.get("_id"),
                status: "active"
            }),

        );

        this.addReferences(

            // Resource ID
            new ReferenceRow(this, {
                name: "Reference_Belong_To_Resource",
                //Source Info
                resource_id: this.get("_id"),
                resource_table_name: ResourceCatalog.Reference.table_name,
                resource_column_name: "resource_id",

                // Reference info
                reference_table_name: ResourceCatalog.Resource.table_name,
                reference_column_name: "_id"
            })
        )
    }
}