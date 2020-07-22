import Knex, {
  AlterTableBuilder,
  ColumnBuilder,
  Transaction,
  CreateTableBuilder,
} from "knex";
import { SQLTypes } from "./SQLTypes.js";
import { EntitySchema } from "./EntitySchema.js";

export class ColumnSchema {
  
  public column_name: string;
  public sql_type: SQLTypes;
  public length?: number;
  public data_type?: string;
  public default_value?: any;
  public nullable: boolean;
  public column_keys: ("UNI" | "IND" | "PRI")[];
  public readable?: boolean;
  public required?: boolean;
  public comment?: string;

  protected __alreadyInstalled: boolean = false;

  public markAsAlreadyInstalled(): void {
    this.__alreadyInstalled = true;
  }

  public isMarkedAsInstalled(): boolean {
    return this.__alreadyInstalled;
  }
  protected entity!: EntitySchema;

  constructor(
    data: ColumnSchemaParameters
  ) {
    this.default_value = data.default_value;
    this.length = data.length;
    this.nullable = data.nullable ?? true;
    this.column_keys = data.column_keys ?? [];
    this.readable = data.readable ?? true;
    this.required = data.required ?? !this.nullable;

    this.column_name = data.column_name;
    this.sql_type = data.sql_type;
    this.data_type = data.data_type;
   
  }

  public setEntity(entity: EntitySchema) {
    this.entity = entity;
  }

  public async install(connection: Knex) {
    if (this.entity == null) {
      throw new Error(
        "[ColumnSchema] This column was not associated with any Entity!"
      );
    }
   
    return connection.schema
      .hasColumn(this.entity.table_name, this.column_name)
      .then(async (columnExists) => {
        console.log(
          "[ColumnSchema] Will now install column: ",
          this.column_name,
          " does it exist?",
          columnExists
        );
        if (columnExists) {
          await this.installAlterInTable(connection);
        } else {
          await this.installAddToTable(connection);
        }
        return this;
      });
  }

  protected async installAlterInTable(connection : Knex) {
    return connection.schema.alterTable(
      this.entity.table_name,
      (builder) => {
        return this.buildColumnWithBuilder(builder, connection).alter();
      }
    );
  }

  protected async installAddToTable(connection : Knex) {
    return connection.schema.alterTable(
      this.entity.table_name,
      (builder) => {
        let column = this.buildColumnWithBuilder(builder, connection);

        //Can only define keys in ADD, when altering table it throws an error!
        if (this.column_keys.length > 0) {
          let keys: string[] = this.column_keys;
          if (keys.indexOf("IND") >= 0) column.index();
          if (keys.indexOf("UNI") >= 0) column.unique();
          if (keys.indexOf("PRI") >= 0) column.primary();
        }

        // TODO: check for key constraint when altering column!

        return column;
      }
    );
  }

  public buildColumnWithBuilder(
    builder: AlterTableBuilder | CreateTableBuilder,
    connection : Knex
  ): ColumnBuilder {
    let column: ColumnBuilder;
    const columnName = this.column_name;

    switch (this.sql_type) {
      case "VARCHAR":
        column = builder.string(columnName, this.length || 255);
        break;
      case "CHAR":
        column = builder.specificType(
          columnName,
          `CHAR(${this.length || 30})`
        );
        break;
      case "TEXT":
        column = builder.text(columnName);
        break;
      case "LONGTEXT":
        column = builder.text(columnName, "longtext");
        break;
      case "TIMESTAMP":
        column = builder.timestamp(columnName);
        break;
      case "DATETIME":
        column = builder.dateTime(columnName);
        break;
      case "BOOLEAN":
        column = builder.boolean(columnName);
        break;
      case "INT":
      case "INTEGER":
        column = builder.integer(columnName, this.length || 11);
        break;
      case "BIGINT":
        column = builder.bigInteger(columnName);
        break;
      case "JSON":
        column = builder.json(columnName);
        break;
      default:
        console.log(
          "[ColumnSchema] Type ",
          this.sql_type,
          " was not found in WITCH! using default varchar!"
        );
        column = builder.string(columnName, this.length || 255);
    }

    if (this.nullable === true) column.nullable();
    else column.notNullable();
    if (this.default_value != null) {
      if (String(this.default_value).indexOf("CURRENT_TIMESTAMP") === 0)
        column.defaultTo(connection.raw("CURRENT_TIMESTAMP"));
      else column.defaultTo(this.default_value);
    }

    if (this.comment != null) column.comment(this.comment);

    return column;
  }
}

export type RequiredColumnParameters = "column_name" | "sql_type";

export interface ColumnSchemaParameters {
  column_name: string;
  sql_type: SQLTypes;
  length?: number;
  data_type?: string;
  default_value?: any;
  nullable?: boolean;
  column_keys?: ("UNI" | "IND" | "PRI")[];
  readable?: boolean;
  required?: boolean;
  comment?: string;
}
