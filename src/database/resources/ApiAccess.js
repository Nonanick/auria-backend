import { ResourceRow } from "./sql/ResourceRow.js";
import { ResourceCatalog } from "./ResourceCatalog.js";
import { ColumnRow } from "./sql/ColumnRow.js";
import { ReferenceRow } from "./sql/ReferenceRow.js";
export class ApiAccess extends ResourceRow {
    constructor() {
        super({
            name: ResourceCatalog.ApiAccess.name,
            table_name: ResourceCatalog.ApiAccess.table_name,
            title: "@{Auria.Resource.ApiAccess.Title}",
            description: "@{Auria.Resource.ApiAccess.Description}",
            is_system_resource: true,
            status: "active"
        });
        this.addColumns(
        // URL
        new ColumnRow({
            name: "URL",
            column_name: "url",
            sql_type: "VARCHAR",
            title: "@{Auria.Columns.ApiAccess.URL.Title}",
            description: "@{Auria.Columns.ApiAccess.URL.Description}",
            nullable: false,
        }), 
        // User ID
        new ColumnRow({
            name: "User ID",
            column_name: "user_id",
            sql_type: "CHAR",
            length: 22,
            title: "@{Auria.Columns.ApiAccess.UserID.Title}",
            description: "@{Auria.Columns.ApiAccess.UserID.Description}",
            nullable: true,
            column_keys: ["IND"]
        }), 
        // Role ID
        new ColumnRow({
            name: "Role ID",
            column_name: "role_id",
            sql_type: "CHAR",
            length: 22,
            title: "@{Auria.Columns.ApiAccess.RoleID.Title}",
            description: "@{Auria.Columns.ApiAccess.RoleID.Description}",
            nullable: true,
            column_keys: ["IND"]
        }), 
        // Description
        new ColumnRow({
            name: "Description",
            column_name: "description",
            sql_type: "TEXT",
            title: "@{Auria.Columns.ApiAccess.Description.Title}",
            description: "@{Auria.Columns.ApiAccess.Description.Description}",
            nullable: true,
        }));
        this.addReferences(
        // User ID
        new ReferenceRow(this, {
            name: "User_Have_Explicit_Permission_To_Api",
            resource_id: this.get("_id"),
            resource_table_name: this.get("table_name"),
            resource_column_name: "user_id",
            reference_table_name: ResourceCatalog.User.table_name,
            reference_column_name: "_id"
        }), 
        // Role ID
        new ReferenceRow(this, {
            name: "Role_Have_Explicit_Permission_To_Api",
            resource_id: this.get("_id"),
            resource_table_name: this.get("table_name"),
            resource_column_name: "user_id",
            reference_table_name: ResourceCatalog.User.table_name,
            reference_column_name: "_id"
        }));
    }
}
//# sourceMappingURL=ApiAccess.js.map