import { ResourceRow } from "./sql/ResourceRow.js";
import { ResourceCatalog } from "./ResourceCatalog.js";
import { ColumnRow } from "./sql/ColumnRow.js";
import { ReferenceRow } from "./sql/ReferenceRow.js";
export class ResourceAccessShare extends ResourceRow {
    constructor() {
        super({
            name: ResourceCatalog.ResourceAccessShare.name,
            table_name: ResourceCatalog.ResourceAccessShare.table_name,
            title: "@{Auria.Resource.ResourceAccessShare.Title}",
            description: "@{Auria.Resource.ResourceAccessShare.Description}",
            is_system_resource: true,
            status: "active"
        });
        this.addColumns(
        // Resource ID
        new ColumnRow({
            name: "Resource ID",
            column_name: "resource_id",
            sql_type: "CHAR",
            length: 22,
            nullable: false,
            title: "@{Auria.Column.ResourceAccessShare.ResourceID.Title}",
            description: "@{Auria.Column.ResourceAccessShare.ResourceID.Description}",
            column_keys: ["IND"],
            status: "active"
        }), 
        // Resource Row ID
        new ColumnRow({
            name: "Resource Row ID",
            column_name: "resource_row_id",
            sql_type: "CHAR",
            length: 22,
            nullable: false,
            title: "@{Auria.Column.ResourceAccessShare.ResourceRowID.Title}",
            description: "@{Auria.Column.ResourceAccessShare.ResourceRowID.Description}",
            column_keys: ["IND"],
            status: "active"
        }), 
        // User Authority
        new ColumnRow({
            name: "User Authority",
            column_name: "user_authority",
            sql_type: "CHAR",
            length: 22,
            nullable: true,
            title: "@{Auria.Column.ResourceAccessShare.UserAuthority.Title}",
            description: "@{Auria.Column.ResourceAccessShare.UserAuthority.Description}",
            status: "active"
        }), 
        // Role Authority
        new ColumnRow({
            name: "Role Authority",
            column_name: "role_authority",
            sql_type: "CHAR",
            length: 22,
            nullable: true,
            title: "@{Auria.Column.ResourceAccessShare.RoleAuthority.Title}",
            description: "@{Auria.Column.ResourceAccessShare.RoleAuthority.Description}",
            status: "active"
        }), 
        // Shared With User ID
        new ColumnRow({
            name: "Shared With User ID",
            column_name: "shared_with_user_id",
            sql_type: "CHAR",
            length: 22,
            nullable: true,
            title: "@{Auria.Column.ResourceAccessShare.SharedWithUserID.Title}",
            description: "@{Auria.Column.ResourceAccessShare.SharedWithUserID.Description}",
            status: "active"
        }), 
        // Shared With Role ID
        new ColumnRow({
            name: "Shared With Role ID",
            column_name: "shared_with_role_id",
            sql_type: "CHAR",
            length: 22,
            nullable: true,
            title: "@{Auria.Column.ResourceAccessShare.SharedWithRoleID.Title}",
            description: "@{Auria.Column.ResourceAccessShare.SharedWithRoleID.Description}",
            status: "active"
        }), 
        // Data Procedure
        new ColumnRow({
            name: "Data Procedure",
            column_name: "data_procedure",
            sql_type: "VARCHAR",
            nullable: false,
            title: "@{Auria.Column.ResourceAccessShare.DataProcedure.Title}",
            description: "@{Auria.Column.ResourceAccessShare.DataProcedure.Description}",
            status: "active"
        }));
        this.addReferences(
        // Resource ID
        new ReferenceRow(this, {
            name: "Resource_That_Has_Shared_Row",
            // Source info
            resource_id: this.get("_id"),
            resource_table_name: this.get("table_name"),
            resource_column_name: "resource_id",
            // Reference info
            reference_table_name: ResourceCatalog.Resource.table_name,
            reference_column_name: "_id"
        }), 
        // User Authority 
        new ReferenceRow(this, {
            name: "User_That_Granted_Share_Access",
            // Source info
            resource_id: this.get("_id"),
            resource_table_name: this.get("table_name"),
            resource_column_name: "user_authority",
            // Reference info
            reference_table_name: ResourceCatalog.User.table_name,
            reference_column_name: "_id"
        }), 
        // Role Authority 
        new ReferenceRow(this, {
            name: "Role_That_Granted_Share_Access",
            // Source info
            resource_id: this.get("_id"),
            resource_table_name: this.get("table_name"),
            resource_column_name: "role_authority",
            // Reference info
            reference_table_name: ResourceCatalog.Role.table_name,
            reference_column_name: "_id"
        }), 
        // Shared With User
        new ReferenceRow(this, {
            name: "User_That_Row_Was_Shared_With",
            // Source info
            resource_id: this.get("_id"),
            resource_table_name: this.get("table_name"),
            resource_column_name: "shared_with_user_id",
            // Reference info
            reference_table_name: ResourceCatalog.User.table_name,
            reference_column_name: "_id"
        }), 
        // Shared With Role
        new ReferenceRow(this, {
            name: "Role_That_Row_Was_Shared_With",
            // Source info
            resource_id: this.get("_id"),
            resource_table_name: this.get("table_name"),
            resource_column_name: "shared_with_role_id",
            // Reference info
            reference_table_name: ResourceCatalog.Role.table_name,
            reference_column_name: "_id"
        }));
    }
}
//# sourceMappingURL=ResourceAccessShare.js.map