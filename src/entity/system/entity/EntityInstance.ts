import { EntityClass } from "../../EntityClass.js";
import { SystemEntityCatalog } from "../../../database/schema/SystemEntityCatalog.js";
import { IEntityInfo } from "../../standart/info/IEntityInfo.js";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema.js";
import Knex from "knex";
import { ColumnClass, ColumnClassParameters } from '../../ColumnClass.js';

export class EntityInstance extends EntityClass {
  protected defineColumnSchema(): (ColumnClass | ColumnClassParameters)[] {
    return [
      // Name
      {
        name: "Name",
        info: {
          title: "@{Auria.Column.Entity.Name.Title}",
          description: "@{Auria.Column.Entity.Name.Description}",
        },
        schema: {
          column_name: "name",
          sql_type: "VARCHAR",
          nullable: false,
          column_keys: ["PRI"],
        },
      },

      // Table Name
      {
        name: "Table Name",
        info: {
          title: "@{Auria.Column.Entity.TableName.Title}",
          description: "@{Auria.Column.Entity.TableName.Description}",
        },
        schema: {
          column_name: "table_name",
          sql_type: "VARCHAR",
          nullable: false,
        },
      },

      // Connection ID
      {
        name: "Connection ID",
        info: {
          title: "@{Auria.Column.Entity.ConnectionId.Title}",
          description: "@{Auria.Column.Entity.ConnectionId.Description}",
        },
        schema: {
          column_name: "connection_id",
          sql_type: "CHAR",
          length: 22,
          nullable: true,
        },
      },

      // Title
      {
        name: "Title",
        info: {
          title: "@{Auria.Column.Entity.Title.Title}",
          description: "@{Auria.Column.Entity.Title.Description}",
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
          title: "@{Auria.Column.Entity.Description.Title}",
          description: "@{Auria.Column.Entity.Description.Description}",
        },
        schema: {
          column_name: "description",
          sql_type: "TEXT",
          nullable: true,
        },
      },

      // Is System Entity
      {
        name: "Is System Entity",
        info: {
          title: "@{Auria.Column.Entity.IsSystemEntity.Title}",
          description: "@{Auria.Column.Entity.IsSystemEntity.Title}",
        },
        schema: {
          column_name: "is_system_entity",
          sql_type: "BOOLEAN",
          default_value: false,
          nullable: false,
          readable: false,
        },
      },

      //Status
      this.buildDefaultStatusColumn(),
    ];
  }

  public get connection(): Knex {
    return this._connection;
  }

  constructor() {
    super(SystemEntityCatalog.Entity.name);

    this.addColumns();

    this.addReferences({
      name: "Entity_Exists_In_Connection",
      table: SystemEntityCatalog.Connection.table_name,
      entity: SystemEntityCatalog.Connection.name,
      column: "connection_id",
      references: {
        column: "_id",
        inEntity: SystemEntityCatalog.Connection.name,
        inTable: SystemEntityCatalog.Connection.table_name,
      },
    });
  }

  public getBootDependencies(): string[] {
    return [];
  }

  public getBootFunction(): () => boolean | Promise<boolean> {
    return () => true;
  }

  protected buildSchema() {
    return new EntitySchema({
      table_name: SystemEntityCatalog.Entity.table_name,
      is_system_entity: true,
    });
  }

  protected buildInfo(): IEntityInfo {
    return {
      title: "@{Auria.Entity.Entity.Title}",
      description: "@{Auria.Entity.Description}",
    };
  }
}
