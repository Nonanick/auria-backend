import { ResourceRow } from "./sql/ResourceRow.js";
import { ResourceCatalog } from "./ResourceCatalog.js";
import { ColumnRow } from "./sql/ColumnRow.js";
export class Role extends ResourceRow {
    constructor() {
        super({
            name: ResourceCatalog.Role.name,
            table_name: ResourceCatalog.Role.table_name,
            title: "@{Auria.Resource.Role.Title}",
            description: "@{Auria.Resource.Role.Description}",
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
            title: "@{Auria.Columns.Role.Name.Title}",
            description: "@{Auria.Columns.Role.Name.Description}",
            status: "active",
            column_keys: ["IND"]
        }), 
        // Title
        new ColumnRow({
            name: "Title",
            column_name: "title",
            sql_type: "VARCHAR",
            nullable: false,
            title: "@{Auria.Columns.Role.Title.Title}",
            description: "@{Auria.Columns.Role.Title.Description}",
            status: "active",
        }), 
        // Icon
        new ColumnRow({
            name: "Icon",
            column_name: "icon",
            sql_type: "VARCHAR",
            nullable: true,
            title: "@{Auria.Columns.Role.Icon.Title}",
            description: "@{Auria.Columns.Role.Icon.Description}",
            status: "active",
        }), 
        // Description
        new ColumnRow({
            name: "Description",
            column_name: "description",
            sql_type: "VARCHAR",
            nullable: false,
            title: "@{Auria.Columns.Role.Description.Title}",
            description: "@{Auria.Columns.Role.Description.Description}",
            status: "active",
        }));
    }
}
//# sourceMappingURL=Role.js.map