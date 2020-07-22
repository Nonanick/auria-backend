import { EntityClass } from "../../EntityClass.js";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema.js";
import { SystemEntityCatalog } from "../../../database/schema/SystemEntityCatalog.js";
import { IEntityInfo } from "../../standart/info/IEntityInfo.js";
import { ColumnClass, ColumnClassParameters } from "../../ColumnClass.js";

export class Module extends EntityClass {
  protected defineColumnSchema(): (ColumnClass | ColumnClassParameters)[] {
    return [
      // _ID
      this.buildDefaultIdColumn(),
      // Name
      {
        name: "Name",
        info: {
          title: "@{Auria.Columns.Module.Name.Title}",
          description: "@{Auria.Columns.Module.Name.Description}",
        },
        schema: {
          column_name: "name",
          sql_type: "VARCHAR",
          nullable: false,
          column_keys: ["IND"],
        },
      },
      // Title
      {
        name: "Title",
        info: {
          title: "@{Auria.Columns.Module.Title.Title}",
          description: "@{Auria.Columns.Module.Title.Description}",
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
          title: "@{Auria.Columns.Module.Description.Title}",
          description: "@{Auria.Columns.Module.Description.Description}",
        },
        schema: {
          column_name: "description",
          sql_type: "TEXT",
          nullable: true,
        },
      },
      // Icon
      {
        name: "Icon",
        info: {
          title: "@{Auria.Columns.Module.Icon.Title}",
          description: "@{Auria.Columns.Module.Icon.Description}",
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
          title: "@{Auria.Columns.Module.Color.Title}",
          description: "@{Auria.Columns.Module.Color.Description}",
        },
        schema: {
          column_name: "color",
          sql_type: "VARCHAR",
          nullable: true,
        },
      },
      // Behaviour
      {
        name: "Behaviour",
        info: {
          title: "@{Auria.Columns.Module.Behaviour.Title}",
          description: "@{Auria.Columns.Module.Behaviour.Description}",
        },
        schema: {
          column_name: "behaviour",
          sql_type: "VARCHAR",
          nullable: false,
          default_value: "Hybrid",
        },
      },

      // Status
      this.buildDefaultStatusColumn(),
    ];
  }

  constructor() {
    super(SystemEntityCatalog.Module.name);
  }

  public getBootDependencies(): string[] {
    return [];
  }

  public getBootFunction(): () => boolean | Promise<boolean> {
    return () => true;
  }

  protected buildInfo(): IEntityInfo {
    return {
      title: "@{Auria.Entity.Module.Title}",
      description: "@{Auria.Entity.Module.Description}",
    };
  }

  protected buildSchema(): EntitySchema {
    return new EntitySchema({
      table_name: SystemEntityCatalog.Module.table_name,
      is_system_entity: true,
    });
  }
}
