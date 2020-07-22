import { EntitySchema } from "../../../database/schema/sql/EntitySchema.js";
import { EntityClass } from "../../EntityClass.js";
import { SystemEntityCatalog } from "../../../database/schema/SystemEntityCatalog.js";
import { IEntityInfo } from "../../standart/info/IEntityInfo.js";
import { ColumnClass, ColumnClassParameters } from "../../ColumnClass.js";

export class ColumnEntityInstance extends EntityClass {
  
  protected defineColumnSchema(): (ColumnClass | ColumnClassParameters)[] {
    return [
      // _ID
      this.buildDefaultIdColumn(),

      // Entity ID
      {
        name: "Entity Name",
        info: {
          title: "@{Auria.Columns.Column.EntityName.Title}",
          description: "@{Auria.Column.Column.EntityName.Description}",
        },
        schema: {
          column_name: "entity_name",
          sql_type: "VARCHAR",
          column_keys: ["IND"],
          nullable: false,
        },
      },
      // Name
      {
        name: "Name",
        info: {
          title: "@{Auria.Columns.Column.Name.Title}",
          description: "@{Auria.Columns.Column.Name.Description}",
        },
        schema: {
          column_name: "name",
          sql_type: "VARCHAR",
          nullable: false,
        },
      },
      // Column Name
      {
        name: "Column Name",
        info: {
          title: "@{Auria.Columns.Column.ColumnName.Title}",
          description: "@{Auria.Columns.Column.ColumnName.Description}",
        },
        schema: {
          column_name: "column_name",
          sql_type: "VARCHAR",
          nullable: false,
        },
      },
      // Title
      {
        name: "Title",
        info: {
          title: "@{Auria.Columns.Column.Title.Title}",
          description: "@{Auria.Columns.Column.Title.Description}",
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
          title: "@{Auria.Columns.Column.Description.Title}",
          description: "@{Auria.Columns.Column.Description.Description}",
        },
        schema: {
          column_name: "description",
          sql_type: "TEXT",
          nullable: true,
        },
      },
      // SQL Type
      {
        name: "SQL Type",
        info: {
          title: "@{Auria.Columns.Column.SQLType.Title}",
          description: "@{Auria.Columns.Column.SQLType.Description}",
        },
        schema: {
          column_name: "sql_type",
          sql_type: "VARCHAR",
          nullable: false,
        },
      },
      // Length
      {
        name: "Length",
        info: {
          title: "@{Auria.Columns.Column.Length.Title}",
          description: "@{Auria.Columns.Column.Length.Description}",
        },
        schema: {
          column_name: "length",
          sql_type: "INTEGER",
          nullable: true,
        },
      },
      // Data Type
      {
        name: "Data Type",
        info: {
          title: "@{Auria.Columns.Column.DataType.Title}",
          description: "@{Auria.Columns.Column.DataType.Description}",
        },
        schema: {
          column_name: "data_type",
          sql_type: "VARCHAR",
          nullable: false,
        },
      },
      // Default Value
      {
        name: "Default Value",
        info: {
          title: "@{Auria.Columns.Column.DefaultValue.Title}",
          description: "@{Auria.Columns.Column.DefaultValue.Description}",
        },
        schema: {
          column_name: "default_value",
          sql_type: "VARCHAR",
          nullable: true,
        },
      },
      // Nullable
      {
        name: "Nullable",
        info: {
          title: "@{Auria.Columns.Column.Nullable.Title}",
          description: "@{Auria.Columns.Column.Nullable.Description}",
        },
        schema: {
          column_name: "nullable",
          sql_type: "BOOLEAN",
          nullable: false,
          default_value: true,
        },
      },
      // Column Keys
      {
        name: "Column Keys",
        info: {
          title: "@{Auria.Columns.Column.ColumnKeys.Title}",
          description: "@{Auria.Columns.Column.ColumnKeys.Description}",
        },
        schema: {
          column_name: "column_keys",
          sql_type: "VARCHAR",
          nullable: true,
          default_value: "",
        },
        /*    hooks : {
                  [ProcedureCatalog.CREATE] : (context) => context.procedureData['column_keys'].join(","),
                  [ProcedureCatalog.UPDATE] : (v:string[]) => v.join(","),
                  [ProcedureCatalog.READ_FETCH.name] : (v:string) => v.split(","),
              }*/
      },
      // Readable
      {
        name: "Readable",
        info: {
          title: "@{Auria.Columns.Column.Readable.Title}",
          description: "@{Auria.Columns.Column.Readable.Description}",
        },
        schema: {
          column_name: "readable",
          sql_type: "BOOLEAN",
          nullable: false,
          default_value: true,
        },
      },
      // Required
      {
        name: "Required",
        info: {
          title: "@{Auria.Columns.Column.Readable.Title}",
          description: "@{Auria.Columns.Column.Readable.Description}",
        },
        schema: {
          column_name: "required",
          sql_type: "BOOLEAN",
          nullable: false,
          default_value: false,
        },
      },

      // Status
      this.buildDefaultStatusColumn(),
    ];
  }

  constructor() {
    super(SystemEntityCatalog.Column.name);

    this.addReferences(
      // Entity Name
      {
        name: "Column_Belongs_To_Entity",
        table: SystemEntityCatalog.Column.table_name,
        entity: SystemEntityCatalog.Column.name,
        column: "entity_name",
        references: {
          column: "name",
          inEntity: SystemEntityCatalog.Entity.name,
          inTable: SystemEntityCatalog.Entity.table_name,
        },
      }
    );
  }

  public getBootDependencies(): string[] {
    return [`BootOfEntity(${SystemEntityCatalog.Entity.name})`];
  }

  public getBootFunction(): () => boolean | Promise<boolean> {
    return () => true;
  }

  protected buildInfo(): IEntityInfo {
    return {
      title: "@{Auria.Entity.Column.Title}",
      description: "@{Auria.Entity.Column.Description}",
    };
  }

  protected buildSchema(): EntitySchema {
    return new EntitySchema({
      table_name: SystemEntityCatalog.Column.table_name,
      is_system_entity: true,
    });
  }
}
