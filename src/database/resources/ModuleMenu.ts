import { ResourceRow } from "./sql/ResourceRow.js";
import { ResourceCatalog } from "./ResourceCatalog.js";
import { ColumnRow } from "./sql/ColumnRow.js";
import { ReferenceRow } from "./sql/ReferenceRow.js";

export class ModuleMenu extends ResourceRow {

    constructor() {
        super({
            name : ResourceCatalog.ModuleMenu.name,
            table_name : ResourceCatalog.ModuleMenu.table_name,
            title : "@{Auria.Resource.ModuleMenu.Title}",
            description : "@{Auria.Resource.ModuleMenu.Description}",
            is_system_resource : true
        });

        this.addColumns(
            // Module ID
            new ColumnRow({
                name : "Module ID",
                column_name : "module_id",
                sql_type: "CHAR",
                length : 22,
                nullable : false,
                title : "@{Auria.Columns.ModuleMenu.ModuleId.Title}",
                description : "@{Auria.Columns.ModuleMenu.ModuleId.Description}",
                status : "active",
                column_keys : ["IND"]
            }),
            // Parent Menu
            new ColumnRow({
                name : "Parent Menu ID",
                column_name : "parent_menu_id",
                sql_type: "CHAR",
                length : 22,
                nullable : true,
                title : "@{Auria.Columns.ModuleMenu.ParentMenuId.Title}",
                description : "@{Auria.Columns.ModuleMenu.ParentMenuId.Description}",
                status : "active",
                column_keys : ["IND"]
            }),
            // Name
            new ColumnRow({
                name : "Name",
                column_name : "name",
                sql_type : "VARCHAR",
                nullable : false,
                title : "@{Auria.Columns.ModuleMenu.Name.Title}",
                description : "@{Auria.Columns.ModuleMenu.Name.Description}",
                status : "active",
            }), 
            // Title
            new ColumnRow({
                name : "Title",
                column_name : "title",
                sql_type : "VARCHAR",
                nullable : false,
                title : "@{Auria.Columns.ModuleMenu.Title.Title}",
                description : "@{Auria.Columns.ModuleMenu.Title.Description}",
                status : "active",
            }),
            // Description
            new ColumnRow({
                name : "Description",
                column_name : "description",
                sql_type : "VARCHAR",
                nullable : true,
                title : "@{Auria.Columns.ModuleMenu.Description.Title}",
                description : "@{Auria.Columns.ModuleMenu.Description.Description}",
                status : "active",
            }),
             // Icon 
             new ColumnRow({
                name : "Icon",
                column_name : "icon",
                sql_type : "VARCHAR",
                nullable : true,
                title : "@{Auria.Columns.ModuleMenu.Icon.Title}",
                description : "@{Auria.Columns.ModuleMenu.Icon.Description}",
                status : "active",
            }),
            // Color
            new ColumnRow({
                name : "Color",
                column_name : "color",
                sql_type : "VARCHAR",
                nullable : true,
                title : "@{Auria.Columns.ModuleMenu.Color.Title}",
                description : "@{Auria.Columns.ModuleMenu.Color.Description}",
                status : "active",
            }),
            // URL
            new ColumnRow({
                name : "URL",
                column_name : "url",
                sql_type : "VARCHAR",
                nullable : true,
                title : "@{Auria.Columns.Module.URL.Title}",
                description : "@{Auria.Columns.Module.URL.Description}",
                status : "active",
            }),
        );

        this.addReferences(

            // Module ID
            new ReferenceRow(this, {
                name : "Module_Menu_Belong_To_Module",

                // Source Info
                resource_id : this.get("_id"),
                resource_table_name : ResourceCatalog.ModuleMenu.table_name,
                resource_column_name : "module_id",

                // Reference info
                reference_table_name : ResourceCatalog.Module.table_name,
                reference_column_name : "_id"
            }),

            // Parent Menu ID
            new ReferenceRow(this, {
                name : "Module_Menu_Is_Child_Of",

                // Source Info
                resource_id : this.get("_id"),
                resource_table_name : ResourceCatalog.ModuleMenu.table_name,
                resource_column_name : "parent_menu_id",

                // Reference info
                reference_table_name : ResourceCatalog.ModuleMenu.table_name,
                reference_column_name : "_id"
            }),
        )
    }
}