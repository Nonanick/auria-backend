import { EntityClass } from "../../EntityClass.js";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema.js";
import { IEntityInfo } from "../../standart/info/IEntityInfo.js";
import { SystemEntityCatalog } from "../../../database/schema/SystemEntityCatalog.js";
import { ColumnClass, ColumnClassParameters } from "../../ColumnClass.js";

export class ColumnProxy extends EntityClass {
  constructor() {
    super(SystemEntityCatalog.ColumnProxy.name);

    this.addReferences(
      // Proxy ID
      {
        name: "Proxy_Applies_To_Column",
        column: "proxy_id",
        entity: SystemEntityCatalog.ColumnProxy.name,
        table: SystemEntityCatalog.ColumnProxy.table_name,
        references: {
          column: "_id",
          inEntity: SystemEntityCatalog.Proxy.name,
          inTable: SystemEntityCatalog.Proxy.table_name,
        },
      },

      // Column ID
      {
        name: "Column_Goes_Though_Proxy",
        column: "column_id",
        entity: SystemEntityCatalog.ColumnProxy.name,
        table: SystemEntityCatalog.ColumnProxy.table_name,
        references: {
          column: "_id",
          inEntity: SystemEntityCatalog.Column.name,
          inTable: SystemEntityCatalog.Column.table_name,
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

  protected defineColumnSchema(): (ColumnClass | ColumnClassParameters)[] {
    return [
      // ID
      this.buildDefaultIdColumn(),

      // Column ID
      {
        name: "Column ID",
        info: {
          title: "@{Auria.Column.ColumnProxy.ColumnId.Title}",
          description: "@{Auria.Column.ColumnProxy.ColumnId.Description}",
        },
        schema: {
          column_name: "column_id",
          column_keys: ["IND"],
          sql_type: "CHAR",
          length: 22,
          nullable: false,
          required: true,
        },
      },

      // Proxy ID
      {
        name: "Proxy ID",
        info: {
          title: "@{Auria.Column.ColumnProxy.ProxyId.Title}",
          description: "@{Auria.Column.ColumnProxy.ProxyId.Description}",
        },
        schema: {
          column_name: "proxy_id",
          column_keys: ["IND"],
          sql_type: "CHAR",
          length: 22,
          nullable: false,
          required: true,
        },
      },

      // Status
      this.buildDefaultStatusColumn(),
    ];
  }
  
  protected buildSchema(): EntitySchema {
    return new EntitySchema({
      table_name: SystemEntityCatalog.ColumnProxy.table_name,
      is_system_entity: true,
    });
  }
  protected buildInfo(): IEntityInfo {
    return {
      title: "@{Auria.Entity.ColumnProxy.Title}",
      description: "@{Auria.Entity.ColumnProxy.Description}",
    };
  }
}
