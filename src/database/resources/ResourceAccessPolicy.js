import { ResourceRow } from "./sql/ResourceRow.js";
import { ResourceCatalog } from "./ResourceCatalog.js";
import { ColumnRow } from "./sql/ColumnRow.js";
import { ReferenceRow } from "./sql/ReferenceRow.js";
export class ResourceAccessPolicy extends ResourceRow {
    constructor() {
        super({
            name: ResourceCatalog.ResourceAccessPolicy.name,
            table_name: ResourceCatalog.ResourceAccessPolicy.table_name,
            title: "@{Auria.Resource.ResourceAccessPolicy.Title}",
            description: "@{Auria.Resource.ResourceAccessPolicy.Description}",
            status: "active",
            is_system_resource: true,
        });
        this.addColumns(
        // Resource ID
        new ColumnRow({
            name: "Resource ID",
            column_name: "resource_id",
            sql_type: "CHAR",
            length: 22,
            nullable: false,
            title: "@{Auria.Columns.ResourceAccessPolicy.ResourceID.Title}",
            description: "@{Auria.Columns.ResourceAccessPolicy.ResourceID.Description}",
        }), 
        // User ID
        new ColumnRow({
            name: "User ID",
            column_name: "user_id",
            sql_type: "CHAR",
            length: 22,
            nullable: true,
            title: "@{Auria.Columns.ResourceAccessPolicy.UserID.Title}",
            description: "@{Auria.Columns.ResourceAccessPolicy.UserID.Description}",
        }), 
        // Role ID
        new ColumnRow({
            name: "Role ID",
            column_name: "role_id",
            sql_type: "CHAR",
            length: 22,
            nullable: true,
            title: "@{Auria.Columns.ResourceAccessPolicy.RoleID.Title}",
            description: "@{Auria.Columns.ResourceAccessPolicy.RoleID.Description}",
        }), 
        // Resource Row ID
        new ColumnRow({
            name: "Resource Row ID",
            column_name: "resource_row_id",
            sql_type: "CHAR",
            length: 22,
            nullable: false,
            title: "@{Auria.Columns.ResourceAccessPolicy.ResourceRowID.Title}",
            description: "@{Auria.Columns.ResourceAccessPolicy.ResourceRowID.Description}",
        }), 
        // Data Procedure
        new ColumnRow({
            name: "Data Procedure",
            column_name: "data_procedure",
            sql_type: "VARCHAR",
            nullable: false,
            title: "@{Auria.Columns.ResourceAccessPolicy.DataProcedure.Title}",
            description: "@{Auria.Columns.ResourceAccessPolicy.DataProcedure.Description}",
        }));
        this.addReferences(
        // Resource ID
        new ReferenceRow(this, {
            name: "Resource_Which_Policy_Applies",
            // Source Info
            resource_id: this.get("_id"),
            resource_table_name: this.get("table_name"),
            resource_column_name: "resource_id",
            // Reference Info
            reference_table_name: ResourceCatalog.Resource.table_name,
            reference_column_name: "_id"
        }), 
        // User ID
        new ReferenceRow(this, {
            name: "User_That_Policy_Applies_To",
            // Source Info
            resource_id: this.get("_id"),
            resource_table_name: this.get("table_name"),
            resource_column_name: "user_id",
            // Reference Info
            reference_table_name: ResourceCatalog.User.table_name,
            reference_column_name: "_id"
        }), 
        // Role ID
        new ReferenceRow(this, {
            name: "Role_That_Policy_Applies_To",
            // Source Info
            resource_id: this.get("_id"),
            resource_table_name: this.get("table_name"),
            resource_column_name: "role_id",
            // Reference Info
            reference_table_name: ResourceCatalog.Role.table_name,
            reference_column_name: "_id"
        }));
    }
}
//# sourceMappingURL=ResourceAccessPolicy.js.map