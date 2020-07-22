import { EntityClass } from "../../EntityClass.js";
import { IEntityInfo } from "../../standart/info/IEntityInfo.js";
import { EntitySchema } from "../../../database/schema/sql/EntitySchema.js";
import { SystemEntityCatalog } from "../../../database/schema/SystemEntityCatalog.js";
import { ColumnClass, ColumnClassParameters } from "../../ColumnClass.js";

export class ReferenceInstance extends EntityClass {
  protected defineColumnSchema(): (ColumnClass | ColumnClassParameters)[] {
    return [
      // _ID
      this.buildDefaultIdColumn(),

      {
        name: "Name",
        info: {
          title: "@{Auria.Column.Reference.Name.Title}",
          description: "@{Auria.Column.Reference.Name.Description}",
        },
        schema: {
          column_name: "name",
          column_keys: ["IND"],
          sql_type: "VARCHAR",
          nullable: true,
          required: true,
        },
      },
      // Entity
      {
        name: "Entity",
        info: {
          title: "@{Auria.Columns.Reference.Entity.Title}",
          description: "@{Auria.Columns.Reference.Entity.Description}",
        },
        schema: {
          column_name: "entity",
          column_keys: ["IND"],
          sql_type: "VARCHAR",
          nullable: false,
          required: true,
        },
      },

      // Table
      {
        name: "Table",
        info: {
          title: "@{Auria.Columns.Reference.Table.Title}",
          description: "@{Auria.Columns.Reference.Table.Description}",
        },
        schema: {
          column_name: "table",
          column_keys: ["IND"],
          sql_type: "VARCHAR",
          nullable: false,
          required: true,
        },
      },

      // Column
      {
        name: "Column",
        info: {
          title: "@{Auria.Columns.Reference.Column.Title}",
          description: "@{Auria.Columns.Reference.Column.Description}",
        },
        schema: {
          column_name: "column",
          column_keys: ["IND"],
          sql_type: "VARCHAR",
          nullable: false,
          required: true,
        },
      },
      // Referenced Entity?
      {
        name: "Referenced Entity",
        info: {
          title: "@{Auria.Columns.Reference.ReferencedEntity.Title}",
          description:
            "@{Auria.Columns.Reference.ReferencedEntity.Description}",
        },
        schema: {
          column_name: "referenced_entity",
          sql_type: "VARCHAR",
          nullable: true,
        },
      },
      // Referenced Table?
      {
        name: "Referenced Table",
        info: {
          title: "@{Auria.Columns.Reference.ReferencedTable.Title}",
          description: "@{Auria.Columns.Reference.ReferencedTable.Description}",
        },
        schema: {
          column_name: "referenced_table",
          column_keys: ["IND"],
          sql_type: "VARCHAR",
          nullable: false,
          required: true,
        },
      },
      // Referenced Column
      {
        name: "Referenced Column",
        info: {
          title: "@{Auria.Columns.Reference.ReferencedColumn.Title}",
          description:
            "@{Auria.Columns.Reference.ReferencedColumn.Description}",
        },
        schema: {
          column_name: "referenced_Column",
          column_keys: ["IND"],
          sql_type: "VARCHAR",
          nullable: false,
          required: true,
        },
      },

      // Status
      this.buildDefaultStatusColumn(),
    ];
  }

  constructor() {
    super(SystemEntityCatalog.Reference.name);

    this.addColumns();
  }
  public getBootDependencies(): string[] {
    return [];
  }

  public getBootFunction(): () => boolean | Promise<boolean> {
    return () => true;
  }

  protected buildInfo(): IEntityInfo {
    return {
      title: "@{Auria.Entity.Reference.Title}",
      description: "@{Auria.Entity.Reference.Description}",
    };
  }

  protected buildSchema() {
    return new EntitySchema({
      table_name: SystemEntityCatalog.Reference.table_name,
      is_system_entity: true,
    });
  }
}
