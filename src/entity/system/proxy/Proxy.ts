import { EntityClass } from "../../EntityClass.js";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema.js";
import { IEntityInfo } from "../../standart/info/IEntityInfo.js";
import { ColumnClass, ColumnClassParameters } from "../../ColumnClass.js";
import { SystemEntityCatalog } from "../../../database/schema/SystemEntityCatalog.js";

export class Proxy extends EntityClass {

  constructor() {
    super(SystemEntityCatalog.Proxy.name);
  }
  protected defineColumnSchema(): (ColumnClass | ColumnClassParameters)[] {
    return [
      // ID
      this.buildDefaultIdColumn(),
      // Name
      {
        name: "Name",
        info: {
          title: "@{Auria.Column.Proxy.Name.Title}",
          description: "@{Auria.Column.Proxy.Name.Description}",
        },
        schema: {
          column_name: "name",
          sql_type: "VARCHAR",
          nullable: false,
          required: true,
          column_keys: ["IND"],
        },
      },

      // Title
      {
        name: "Title",
        info: {
          title: "@{Auria.Column.Proxy.Title.Title}",
          description: "@{Auria.Column.Proxy.Title.Description}",
        },
        schema: {
          column_name: "title",
          sql_type: "VARCHAR",
          nullable: false,
          required: true,
        },
      },

      // Description
      {
        name: "Description",
        info: {
          title: "@{Auria.Column.Proxy.Description.Title}",
          description: "@{Auria.Column.Proxy.Description.Description}",
        },
        schema: {
          column_name: "description",
          sql_type: "TEXT",
          nullable: true,
          required: false,
        },
      },

      // Proxy Type
      {
        name: "Proxy Type",
        info: {
          title: "@{Auria.Column.Proxy.ProxyType.Title}",
          description: "@{Auria.Column.Proxy.ProxyType.Description}",
        },
        schema: {
          column_name: "proxy_type",
          sql_type: "VARCHAR",
          nullable: false,
          required: true,
          column_keys: ["IND"],
        },
      },
      // Expects
      {
        name: "Expects",
        info: {
          title: "@{Auria.Column.Proxy.Expects.Title}",
          description: "@{Auria.Column.Proxy.Expects.Description}",
        },
        schema: {
          column_name: "expects",
          sql_type: "VARCHAR",
          nullable: true,
        },
      },
      // Returns
      {
        name: "Returns",
        info: {
          title: "@{Auria.Column.Proxy.Returns.Title}",
          description: "@{Auria.Column.Proxy.Returns.Description}",
        },
        schema: {
          column_name: "returns",
          sql_type: "VARCHAR",
          nullable: true,
        },
      },

      // Status
      this.buildDefaultStatusColumn(),
    ];
  }

  public getBootDependencies(): string[] {
    return [];
  }

  public getBootFunction(): () => boolean | Promise<boolean> {
    return () => true;
  }
  
  protected buildSchema(): EntitySchema {
    return new EntitySchema({
      table_name: SystemEntityCatalog.Proxy.table_name,
      is_system_entity: true,
    });
  }

  protected buildInfo(): IEntityInfo {
    return {
      title: "@{Auria.Entity.Proxy.Title}",
      description: "@{Auria.Entity.Proxy.Description}",
    };
  }
}
