import { ResourceRow } from "./sql/ResourceRow.js";
import { ResourceCatalog } from "./ResourceCatalog.js";
import { ColumnRow } from "./sql/ColumnRow.js";
import { ReferenceRow } from "./sql/ReferenceRow.js";
export class ModulePage extends ResourceRow {
    constructor() {
        super({
            name: ResourceCatalog.ModulePage.name,
            table_name: ResourceCatalog.ModulePage.table_name,
            title: "@{Auria.Resource.ModulePage.Title}",
            description: "@{Auria.Resource.ModulePage.Description}",
            is_system_resource: true,
            status: 'active'
        });
        this.addColumns(
        // Module ID
        new ColumnRow({
            name: "Module ID",
            column_name: "module_id",
            sql_type: "CHAR",
            length: 22,
            nullable: false,
            title: "@{Auria.Columns.ModulePage.ModuleID.Title}",
            description: "@{Auria.Columns.ModulePage.ModuleID.Description}",
            status: "active",
            column_keys: ["IND"]
        }), 
        // Parent Menu ID
        new ColumnRow({
            name: "Parent Menu ID",
            column_name: "parent_menu_id",
            sql_type: "CHAR",
            length: 22,
            nullable: true,
            title: "@{Auria.Columns.ModulePage.ParentMenuID.Title}",
            description: "@{Auria.Columns.ModulePage.ParentMenuID.Description}",
            status: "active",
            column_keys: ["IND"]
        }), 
        // Name
        new ColumnRow({
            name: "Name",
            column_name: "name",
            sql_type: "VARCHAR",
            nullable: false,
            title: "@{Auria.Columns.ModulePage.Name.Title}",
            description: "@{Auria.Columns.ModulePage.Name.Description}",
            status: "active",
        }), 
        // Title
        new ColumnRow({
            name: "Title",
            column_name: "title",
            sql_type: "VARCHAR",
            nullable: false,
            title: "@{Auria.Columns.ModulePage.Title.Title}",
            description: "@{Auria.Columns.ModulePage.Title.Description}",
            status: "active",
        }), 
        // Description
        new ColumnRow({
            name: "Description",
            column_name: "description",
            sql_type: "VARCHAR",
            nullable: true,
            title: "@{Auria.Columns.ModulePage.Description.Title}",
            description: "@{Auria.Columns.ModulePage.Description.Description}",
            status: "active",
        }), 
        // Engine
        new ColumnRow({
            name: "Engine",
            column_name: "engine",
            sql_type: "VARCHAR",
            nullable: false,
            title: "@{Auria.Columns.ModulePage.Engine.Title}",
            description: "@{Auria.Columns.ModulePage.Engine.Description}",
            status: "active",
        }), 
        // Icon
        new ColumnRow({
            name: "Icon",
            column_name: "icon",
            sql_type: "VARCHAR",
            nullable: true,
            title: "@{Auria.Columns.ModulePage.Icon.Title}",
            description: "@{Auria.Columns.ModulePage.Icon.Description}",
            status: "active",
        }), 
        // URL
        new ColumnRow({
            name: "URL",
            column_name: "url",
            sql_type: "VARCHAR",
            nullable: false,
            title: "@{Auria.Columns.ModulePage.URL.Title}",
            description: "@{Auria.Columns.ModulePage.URL.Description}",
            status: "active",
        }), 
        // Data Requirements
        new ColumnRow({
            name: "Data Requirements",
            column_name: "data_requirements",
            sql_type: "JSON",
            nullable: true,
            title: "@{Auria.Columns.ModulePage.DataRequirements.Title}",
            description: "@{Auria.Columns.ModulePage.DataRequirements.Description}",
            status: "active",
        }), 
        // Api Requirements
        new ColumnRow({
            name: "API Requirements",
            column_name: "api_requirements",
            sql_type: "JSON",
            nullable: true,
            title: "@{Auria.Columns.ModulePage.APIRequirements.Title}",
            description: "@{Auria.Columns.ModulePage.APIRequirements.Description}",
            status: "active",
        }), 
        // Bind Resource
        new ColumnRow({
            name: "Bind Resource",
            column_name: "bind_resource",
            sql_type: "VARCHAR",
            nullable: true,
            title: "@{Auria.Columns.ModulePage.BindResource.Title}",
            description: "@{Auria.Columns.ModulePage.BindResource.Description}",
            status: "active",
        }), 
        // Bind Model
        new ColumnRow({
            name: "Bind Model",
            column_name: "bind_model",
            sql_type: "VARCHAR",
            nullable: false,
            title: "@{Auria.Columns.ModulePage.BindModel.Title}",
            description: "@{Auria.Columns.ModulePage.BindModel.Description}",
            status: "active",
        }));
        this.addReferences(
        // Module ID
        new ReferenceRow(this, {
            name: "Page_Belong_To_Module",
            // Source Info
            resource_id: this.get("_id"),
            resource_table_name: this.get("table_name"),
            resource_column_name: "module_id",
            // Reference Info
            reference_table_name: ResourceCatalog.Reference.table_name,
            reference_column_name: "_id"
        }), 
        // Parent Menu ID
        new ReferenceRow(this, {
            name: "Page_Has_Parent_Menu",
            // Source Info
            resource_id: this.get("_id"),
            resource_table_name: this.get("table_name"),
            resource_column_name: "parent_menu_id",
            // Reference Info
            reference_table_name: ResourceCatalog.ModuleMenu.table_name,
            reference_column_name: "_id"
        }));
    }
}
//# sourceMappingURL=ModulePage.js.map