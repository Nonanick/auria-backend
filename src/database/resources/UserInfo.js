import { ResourceRow } from "./sql/ResourceRow.js";
import { ResourceCatalog } from "./ResourceCatalog.js";
import { ColumnRow } from "./sql/ColumnRow.js";
import { ReferenceRow } from "./sql/ReferenceRow.js";
export class UserInfo extends ResourceRow {
    constructor() {
        super({
            name: ResourceCatalog.UserInfo.name,
            table_name: ResourceCatalog.UserInfo.table_name,
            title: "@{Auria.Resource.UserInfo.Title}",
            description: "@{Auria.Resource.UserInfo.Description}",
            is_system_resource: true,
            status: "active"
        });
        delete this.columns["_id"]; // User ID is PRI Key
        this.addColumns(
        // User ID
        new ColumnRow({
            name: "User ID",
            column_name: "user_id",
            sql_type: "CHAR",
            length: 22,
            nullable: false,
            title: "@{Auria.Columns.UserInfo.UserID.Title}",
            description: "@{Auria.Columns.UserInfo.UserID.Description}",
            status: "active",
            column_keys: ["UNI"]
        }), 
        // Name
        new ColumnRow({
            name: "Name",
            column_name: "name",
            sql_type: "VARCHAR",
            length: 100,
            nullable: false,
            title: "@{Auria.Columns.UserInfo.Name.Title}",
            description: "@{Auria.Columns.UserInfo.Name.Description}",
            status: "active",
        }), 
        // Surname
        new ColumnRow({
            name: "Surname",
            column_name: "surname",
            sql_type: "VARCHAR",
            length: 100,
            nullable: true,
            title: "@{Auria.Columns.UserInfo.Surname.Title}",
            description: "@{Auria.Columns.UserInfo.Surname.Description}",
            status: "active",
        }), 
        // Email
        new ColumnRow({
            name: "Email",
            column_name: "email",
            sql_type: "VARCHAR",
            length: 100,
            nullable: true,
            title: "@{Auria.Columns.UserInfo.Email.Title}",
            description: "@{Auria.Columns.UserInfo.Email.Description}",
            status: "active",
        }), 
        // Photo
        new ColumnRow({
            name: "Photo",
            column_name: "photo",
            sql_type: "VARCHAR",
            nullable: true,
            title: "@{Auria.Columns.UserInfo.Photo.Title}",
            description: "@{Auria.Columns.UserInfo.Photo.Description}",
            default_value: "default-avatar",
            status: "active",
        }));
        this.addReferences(
        // User ID
        new ReferenceRow(this, {
            name: "Info_Belongs_To_User",
            // Source info
            resource_id: this.get("_id"),
            resource_table_name: this.get("table_name"),
            resource_column_name: "user_id",
            // Reference info
            reference_table_name: ResourceCatalog.User.table_name,
            reference_column_name: "_id"
        }));
    }
}
//# sourceMappingURL=UserInfo.js.map