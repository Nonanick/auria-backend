import { ResourceClass } from "../../ResourceClass";
import { ResourceSchema } from "../../../database/schema/sql/ResourceSchema";
import { ModulePageSchema } from "../../../database/schema/ModulePage";

export class ModulePage extends ResourceClass {

    public getBootDependencies(): string[] {
        return [];
    }
    public getBootFunction(): () => boolean | Promise<boolean> {
        return () => true;
    }
    protected buildSchema(): ResourceSchema {
        return new ModulePageSchema();
    }

    constructor() {
        super();

        this.addColumns(
            // _ID
            this.buildDefaultIdColumn(),
            // Module ID
            {
                schema: {
                    name: "Module ID",
                    column_name: "module_id",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: false,
                    title: "@{Auria.Columns.ModulePage.ModuleID.Title}",
                    description: "@{Auria.Columns.ModulePage.ModuleID.Description}",
                    status: "active",
                    column_keys: ["IND"]
                }
            },
            // Parent Menu ID
            {
                schema: {
                    name: "Parent Menu ID",
                    column_name: "parent_menu_id",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: true,
                    title: "@{Auria.Columns.ModulePage.ParentMenuID.Title}",
                    description: "@{Auria.Columns.ModulePage.ParentMenuID.Description}",
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
                    title: "@{Auria.Columns.ModulePage.Name.Title}",
                    description: "@{Auria.Columns.ModulePage.Name.Description}",
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
                    title: "@{Auria.Columns.ModulePage.Title.Title}",
                    description: "@{Auria.Columns.ModulePage.Title.Description}",
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
                    title: "@{Auria.Columns.ModulePage.Description.Title}",
                    description: "@{Auria.Columns.ModulePage.Description.Description}",
                    status: "active",
                }
            },
            // Engine
            {
                schema: {
                    name: "Engine",
                    column_name: "engine",
                    sql_type: "VARCHAR",
                    nullable: false,
                    title: "@{Auria.Columns.ModulePage.Engine.Title}",
                    description: "@{Auria.Columns.ModulePage.Engine.Description}",
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
                    title: "@{Auria.Columns.ModulePage.Icon.Title}",
                    description: "@{Auria.Columns.ModulePage.Icon.Description}",
                    status: "active",
                }
            },
            // URL
            {
                schema: {
                    name: "URL",
                    column_name: "url",
                    sql_type: "VARCHAR",
                    nullable: false,
                    title: "@{Auria.Columns.ModulePage.URL.Title}",
                    description: "@{Auria.Columns.ModulePage.URL.Description}",
                    status: "active",
                }
            },
            // Data Requirements
            {
                schema: {
                    name: "Data Requirements",
                    column_name: "data_requirements",
                    sql_type: "JSON",
                    nullable: true,
                    title: "@{Auria.Columns.ModulePage.DataRequirements.Title}",
                    description: "@{Auria.Columns.ModulePage.DataRequirements.Description}",
                    status: "active",
                }
            },
            // Api Requirements
            {
                schema: {
                    name: "API Requirements",
                    column_name: "api_requirements",
                    sql_type: "JSON",
                    nullable: true,
                    title: "@{Auria.Columns.ModulePage.APIRequirements.Title}",
                    description: "@{Auria.Columns.ModulePage.APIRequirements.Description}",
                    status: "active",
                }
            },
            // Bind Resource
            {
                schema: {
                    name: "Bind Resource",
                    column_name: "bind_resource",
                    sql_type: "VARCHAR",
                    nullable: true,
                    title: "@{Auria.Columns.ModulePage.BindResource.Title}",
                    description: "@{Auria.Columns.ModulePage.BindResource.Description}",
                    status: "active",
                }
            },
            // Bind Model
            {
                schema: {
                    name: "Bind Model",
                    column_name: "bind_model",
                    sql_type: "VARCHAR",
                    nullable: false,
                    title: "@{Auria.Columns.ModulePage.BindModel.Title}",
                    description: "@{Auria.Columns.ModulePage.BindModel.Description}",
                    status: "active",
                }
            },

            // Status
            this.buildDefaultStatusColumn(),
        );
    }

}