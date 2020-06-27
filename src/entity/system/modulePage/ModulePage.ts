import { EntityClass } from "../../EntityClass";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema";
import { ModulePageSchema } from "../../../database/schema/ModulePage";
import { IEntityInfo } from "../../standart/info/IEntityInfo.js";
import { EntityCatalog } from "../../../database/schema/EntityCatalog.js";

export class ModulePage extends EntityClass {

    public getBootDependencies(): string[] {
        return [];
    }
    public getBootFunction(): () => boolean | Promise<boolean> {
        return () => true;
    }
    protected buildInfo(): IEntityInfo {
        return {
            title: "@{Auria.Entity.ModulePage.Title}",
            description: "@{Auria.Entity.ModulePage.Description}",
        };
    }
    protected buildSchema(): EntitySchema {
        return new ModulePageSchema();
    }

    constructor() {
        super(EntityCatalog.ModulePage.name);

        this.addColumns(
            // _ID
            this.buildDefaultIdColumn(),
            // Module ID
            {
                name: "Module ID",
                info: {
                    title: "@{Auria.Columns.ModulePage.ModuleID.Title}",
                    description: "@{Auria.Columns.ModulePage.ModuleID.Description}",
                },
                schema: {
                    column_name: "module_id",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: false,
                    status: "active",
                    column_keys: ["IND"]
                }
            },
            // Parent Menu ID
            {
                name: "Parent Menu ID",
                info: {
                    title: "@{Auria.Columns.ModulePage.ParentMenuID.Title}",
                    description: "@{Auria.Columns.ModulePage.ParentMenuID.Description}",
                },
                schema: {
                    column_name: "parent_menu_id",
                    sql_type: "CHAR",
                    length: 22,
                    nullable: true,
                    status: "active",
                    column_keys: ["IND"]
                }
            },
            // Name
            {
                name: "Name",
                info: {
                    title: "@{Auria.Columns.ModulePage.Name.Title}",
                    description: "@{Auria.Columns.ModulePage.Name.Description}",
                },
                schema: {
                    column_name: "name",
                    sql_type: "VARCHAR",
                    nullable: false,
                    status: "active",
                }
            },
            // Title
            {
                name: "Title",
                info: {
                    title: "@{Auria.Columns.ModulePage.Title.Title}",
                    description: "@{Auria.Columns.ModulePage.Title.Description}",
                },
                schema: {
                    column_name: "title",
                    sql_type: "VARCHAR",
                    nullable: false,
                    status: "active",
                }
            },
            // Description
            {
                name: "Description",
                info: {
                    title: "@{Auria.Columns.ModulePage.Description.Title}",
                    description: "@{Auria.Columns.ModulePage.Description.Description}",
                },
                schema: {
                    column_name: "description",
                    sql_type: "VARCHAR",
                    nullable: true,
                    status: "active",
                }
            },
            // Engine
            {
                name: "Engine",
                info: {
                    title: "@{Auria.Columns.ModulePage.Engine.Title}",
                    description: "@{Auria.Columns.ModulePage.Engine.Description}",
                },
                schema: {
                    column_name: "engine",
                    sql_type: "VARCHAR",
                    nullable: false,
                    status: "active",
                }
            },
            // Icon
            {
                name: "Icon",
                info: {
                    title: "@{Auria.Columns.ModulePage.Icon.Title}",
                    description: "@{Auria.Columns.ModulePage.Icon.Description}",
                },
                schema: {
                    column_name: "icon",
                    sql_type: "VARCHAR",
                    nullable: true,
                    status: "active",
                }
            },
            // URL
            {
                name: "URL",
                info: {
                    title: "@{Auria.Columns.ModulePage.URL.Title}",
                    description: "@{Auria.Columns.ModulePage.URL.Description}",
                },
                schema: {
                    column_name: "url",
                    sql_type: "VARCHAR",
                    nullable: false,
                    status: "active",
                }
            },
            // Data Requirements
            {
                name: "Data Requirements",
                info: {
                    title: "@{Auria.Columns.ModulePage.DataRequirements.Title}",
                    description: "@{Auria.Columns.ModulePage.DataRequirements.Description}",
                },
                schema: {
                    column_name: "data_requirements",
                    sql_type: "JSON",
                    nullable: true,
                    status: "active",
                }
            },
            // Api Requirements
            {
                name: "API Requirements",
                info: {
                    title: "@{Auria.Columns.ModulePage.APIRequirements.Title}",
                    description: "@{Auria.Columns.ModulePage.APIRequirements.Description}",
                },
                schema: {
                    column_name: "api_requirements",
                    sql_type: "JSON",
                    nullable: true,
                    status: "active",
                }
            },
            // Bind Entity
            {
                name: "Bind Entity",
                info: {
                    title: "@{Auria.Columns.ModulePage.BindEntity.Title}",
                    description: "@{Auria.Columns.ModulePage.BindEntity.Description}",
                },
                schema: {
                    column_name: "bind_entity",
                    sql_type: "VARCHAR",
                    nullable: true,
                    status: "active",
                }
            },
            // Bind Model
            {
                name: "Bind Model",
                info: {
                    title: "@{Auria.Columns.ModulePage.BindModel.Title}",
                    description: "@{Auria.Columns.ModulePage.BindModel.Description}",
                },
                schema: {
                    column_name: "bind_model",
                    sql_type: "VARCHAR",
                    nullable: false,
                    status: "active",
                }
            },

            // Status
            this.buildDefaultStatusColumn(),
        );

        this.addReferences(
            // Module ID
            {
                name: "Page_Belong_To_Module",
                column: "module_id",
                references: {
                    column: "_id",
                    inEntity: EntityCatalog.Module.name,
                    inTable: EntityCatalog.Module.table_name
                }
            },
            // Parent Menu ID
            {
                name: "Page_Might_Have_Parent_Menu",
                column: "parent_menu_id",
                references: {
                    column: "_id",
                    inEntity: EntityCatalog.ModuleMenu.name,
                    inTable: EntityCatalog.ModuleMenu.table_name
                }
            }
        );
    }

}