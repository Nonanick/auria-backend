import { EntityClass } from "../../EntityClass.js";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema.js";
import { ModuleMenuSchema } from "../../../database/schema/ModuleMenuSchema.js";

export class ModuleMenu extends EntityClass {


    constructor() {
        super();

        this.addColumns(
            // Module ID
            {
                schema: {
                    name: "Module ID",
                    column_name: "module_id",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: false,
                    title: "@{Auria.Columns.ModuleMenu.ModuleId.Title}",
                    description: "@{Auria.Columns.ModuleMenu.ModuleId.Description}",
                    status: "active",
                    column_keys: ["IND"]
                }
            },
            // Parent Menu
            {
                schema: {
                    name: "Parent Menu ID",
                    column_name: "parent_menu_id",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: true,
                    title: "@{Auria.Columns.ModuleMenu.ParentMenuId.Title}",
                    description: "@{Auria.Columns.ModuleMenu.ParentMenuId.Description}",
                    status: "active",
                    column_keys: ["IND"]
                }
            },
            // Name
            {
                schema: {
                    name: "Name",
                    column_name: "name",
                    sql_type: "VARCHAR",
                    nullable: false,
                    title: "@{Auria.Columns.ModuleMenu.Name.Title}",
                    description: "@{Auria.Columns.ModuleMenu.Name.Description}",
                    status: "active",
                }
            },
            // Title
            {
                schema: {
                    name: "Title",
                    column_name: "title",
                    sql_type: "VARCHAR",
                    nullable: false,
                    title: "@{Auria.Columns.ModuleMenu.Title.Title}",
                    description: "@{Auria.Columns.ModuleMenu.Title.Description}",
                    status: "active",
                }
            },
            // Description
            {
                schema: {
                    name: "Description",
                    column_name: "description",
                    sql_type: "VARCHAR",
                    nullable: true,
                    title: "@{Auria.Columns.ModuleMenu.Description.Title}",
                    description: "@{Auria.Columns.ModuleMenu.Description.Description}",
                    status: "active",
                }
            },
            // Icon 
            {
                schema: {
                    name: "Icon",
                    column_name: "icon",
                    sql_type: "VARCHAR",
                    nullable: true,
                    title: "@{Auria.Columns.ModuleMenu.Icon.Title}",
                    description: "@{Auria.Columns.ModuleMenu.Icon.Description}",
                    status: "active",
                }
            },
            // Color
            {
                schema: {
                    name: "Color",
                    column_name: "color",
                    sql_type: "VARCHAR",
                    nullable: true,
                    title: "@{Auria.Columns.ModuleMenu.Color.Title}",
                    description: "@{Auria.Columns.ModuleMenu.Color.Description}",
                    status: "active",
                }
            },
            // URL
            {
                schema: {
                    name: "URL",
                    column_name: "url",
                    sql_type: "VARCHAR",
                    nullable: true,
                    title: "@{Auria.Columns.Module.URL.Title}",
                    description: "@{Auria.Columns.Module.URL.Description}",
                    status: "active",
                }
            },
        );
    }

    public getBootDependencies(): string[] {
        return [];
    }
    public getBootFunction(): () => boolean | Promise<boolean> {
        return () => true;
    }

    protected buildSchema(): EntitySchema {
        return new ModuleMenuSchema();
    }
}