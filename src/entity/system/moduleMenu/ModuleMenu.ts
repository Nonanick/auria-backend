import { EntityClass } from "../../EntityClass.js";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema.js";
import { SystemEntityCatalog } from "../../../database/schema/SystemEntityCatalog.js";
import { IEntityInfo } from "../../standart/info/IEntityInfo.js";
import { ColumnClass, ColumnClassParameters } from "../../ColumnClass.js";

export class ModuleMenu extends EntityClass {

  protected defineColumnSchema(): (ColumnClass | ColumnClassParameters)[] {
    return [
      // _ID
      this.buildDefaultIdColumn(),

      // Module ID
      {
        name: "Module ID",
        info: {
          title: "@{Auria.Columns.ModuleMenu.ModuleId.Title}",
          description: "@{Auria.Columns.ModuleMenu.ModuleId.Description}",
        },
        schema: {
          column_name: "module_id",
          sql_type: "CHAR",
          length: 22,
          nullable: false,
          column_keys: ["IND"],
        },
      },
      // Parent Menu
      {
        name: "Parent Menu ID",
        info: {
          title: "@{Auria.Columns.ModuleMenu.ParentMenuId.Title}",
          description: "@{Auria.Columns.ModuleMenu.ParentMenuId.Description}",
        },
        schema: {
          column_name: "parent_menu_id",
          sql_type: "CHAR",
          length: 22,
          nullable: true,
          column_keys: ["IND"],
        },
      },
      // Name
      {
        name: "Name",
        info: {
          title: "@{Auria.Columns.ModuleMenu.Name.Title}",
          description: "@{Auria.Columns.ModuleMenu.Name.Description}",
        },
        schema: {
          column_name: "name",
          sql_type: "VARCHAR",
          nullable: false,
        },
      },
      // Title
      {
        name: "Title",
        info: {
          title: "@{Auria.Columns.ModuleMenu.Title.Title}",
          description: "@{Auria.Columns.ModuleMenu.Title.Description}",
        },
        schema: {
          column_name: "title",
          sql_type: "VARCHAR",
          nullable: false,
        },
      },
      // Description
      {
        name: "Description",
        info: {
          title: "@{Auria.Columns.ModuleMenu.Description.Title}",
          description: "@{Auria.Columns.ModuleMenu.Description.Description}",
        },
        schema: {
          column_name: "description",
          sql_type: "VARCHAR",
          nullable: true,
        },
      },
      // Icon
      {
        name: "Icon",
        info: {
          title: "@{Auria.Columns.ModuleMenu.Icon.Title}",
          description: "@{Auria.Columns.ModuleMenu.Icon.Description}",
        },
        schema: {
          column_name: "icon",
          sql_type: "VARCHAR",
          nullable: true,
        },
      },
      // Color
      {
        name: "Color",
        info: {
          title: "@{Auria.Columns.ModuleMenu.Color.Title}",
          description: "@{Auria.Columns.ModuleMenu.Color.Description}",
        },
        schema: {
          column_name: "color",
          sql_type: "VARCHAR",
          nullable: true,
        },
      },
      // URL
      {
        name: "URL",
        info: {
          title: "@{Auria.Columns.Module.URL.Title}",
          description: "@{Auria.Columns.Module.URL.Description}",
        },
        schema: {
          column_name: "url",
          sql_type: "VARCHAR",
          nullable: true,
        },
      },

      // Status
      this.buildDefaultStatusColumn(),
    ];
  }

  constructor() {
    super(SystemEntityCatalog.ModuleMenu.name);

    this.addReferences(
      // Module ID
      {
        name: "Menu_Belongs_To_Module",
        table: SystemEntityCatalog.ModuleMenu.table_name,
        entity: SystemEntityCatalog.ModuleMenu.name,
        column: "module_id",
        references: {
          column: "_id",
          inEntity: SystemEntityCatalog.Module.name,
          inTable: SystemEntityCatalog.Module.table_name,
        },
      },
      // Parent Menu ID
      {
        name: "Menu_Might_Have_Parent_Menu",
        table: SystemEntityCatalog.ModuleMenu.table_name,
        entity: SystemEntityCatalog.ModuleMenu.name,
        column: "parent_menu_id",
        references: {
          column: "_id",
          inEntity: SystemEntityCatalog.ModuleMenu.name,
          inTable: SystemEntityCatalog.ModuleMenu.table_name,
        },
      }
    );
  }

  public getBootDependencies(): string[] {
    return [];
  }
  public getBootFunction(): () => boolean | Promise<boolean> {
    return () => true;
  }

  protected buildInfo(): IEntityInfo {
    return {
      title: "@{Auria.Entity.ModuleMenu.Title}",
      description: "@{Auria.Entity.ModuleMenu.Description}",
    };
  }

  protected buildSchema(): EntitySchema {
    return new EntitySchema({
      table_name: SystemEntityCatalog.ModuleMenu.table_name,
      is_system_entity: true,
    });
  }
}
