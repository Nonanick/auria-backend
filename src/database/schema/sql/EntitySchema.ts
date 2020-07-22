import Knex, { CreateTableBuilder } from "knex";
import { ColumnSchema } from "./ColumnSchema.js";
import { ReferenceSchema } from "./ReferenceSchema.js";
import { IEntitySchema } from "../../schemaInterface/IEntitySchema.js";

export class EntitySchema {
  public table_name: string;
  public connection_id?: string;
  public is_system_entity: boolean;

  protected _primaryField: string = "_id";

  protected _columnKeys: {
    IND: ColumnSchema[];
    PRI: ColumnSchema[];
    UNI: ColumnSchema[];
  } = {
    IND: [],
    PRI: [],
    UNI: [],
  };

  protected columns: {
    [columnName: string]: ColumnSchema;
  } = {};

  protected references: {
    [referenceName: string]: ReferenceSchema;
  } = {};

  constructor(data: IEntitySchema) {
    this.table_name = data.table_name;
    this.connection_id = data.connection;
    this.is_system_entity = data.is_system_entity ?? false;
  }

  public setPrimaryFieldName(field: string) {
    this._primaryField = field;
  }

  public addColumns(...columns: ColumnSchema[]) {
    columns.forEach((column) => {
      const columnName = column.column_name;
      if (this.columns[columnName] != null)
        throw new Error(
          `[EntitySchema] Duplicate column on entity! Column with name ${columnName} already exists in ${this.table_name}`
        );

      column.setEntity(this);

      // Auto update Primary field!
      if (column.column_keys.includes("PRI")) {
        this.setPrimaryFieldName(column.column_name as "_id");
      }

      this.columns[columnName] = column;
    });
  }

  public addReferences(...references: ReferenceSchema[]) {
    references.forEach((reference) => {
      const referenceName = reference.name;
      if (this.references[referenceName] != null)
        throw new Error(
          `[EntitySchema] Duplicate reference on entity! Reference with name ${referenceName} already exists in ${this.table_name}`
        );

      this.references[referenceName] = reference;
    });
  }

  public getColumns(): ColumnSchema[] {
    const allColumns: ColumnSchema[] = [];

    for (let columnName in this.columns) {
      if (this.columns.hasOwnProperty(columnName)) {
        allColumns.push(this.columns[columnName]);
      }
    }

    return allColumns;
  }

  public hasColumn(name: string): boolean {
    return this.getColumnName(name) != null;
  }

  public getColumnName(name: string): string | undefined {
    const allColumnNames = this.getColumns().map((c) => c.column_name);

    if (allColumnNames.includes(name)) {
      return name;
    }

    return undefined;
  }

  public async install(connection: Knex) {
    return (
      this.tableExistsInDatabase(connection)
        .then((tableExists) => {
          if (tableExists) return this;

          return this.createTableInDatabase(connection);
        })
        //Table created for sure!
        .then(() => this.installColumns(connection))
    );
  }

  public async tableExistsInDatabase(connection: Knex): Promise<boolean> {
    return connection.schema.hasTable(this.table_name);
  }

  protected async createTableInDatabase(connection: Knex) {
    let tableCreation = connection.schema
      .createTable(this.table_name, (builder) => {
        // Install columns!
        for (let colName in this.columns) {
          const column = this.columns[colName];
          this.createColumnInDatabase(column, builder, connection);
          // Prevent "ALTER TABLE"
          column.markAsAlreadyInstalled();
        }
      })
      .then((created) => {
        console.log("[EntitySchema] Table creation > ", created);
        return this;
      });

    tableCreation.catch((err) => {
      console.error("[EntitySchema] SQL Error!", err);
      throw new Error("[EntitySchema] Failed to create table! SQL Error");
    });

    return tableCreation.then((_) => this);
  }

  protected createColumnInDatabase(
    column: ColumnSchema,
    builder: CreateTableBuilder,
    connection: Knex
  ) {
    let columnBuilder = column.buildColumnWithBuilder(builder, connection);

    if (column.column_keys.length > 0) {
      let keys: string[] = column.column_keys;
      if (keys.indexOf("IND") >= 0) columnBuilder.index();
      if (keys.indexOf("UNI") >= 0) columnBuilder.unique();
      if (keys.indexOf("PRI") >= 0) columnBuilder.primary();
    }
  }

  protected async installColumns(connection: Knex) {
    let ans = [];
    for (let colName in this.columns) {
      if (this.columns.hasOwnProperty(colName)) {
        // Only install columns previously not marked as installed ones by CREATE TABLE
        if (!this.columns[colName].isMarkedAsInstalled())
          ans.push(await this.columns[colName].install(connection));
      }
    }
    return ans;
  }

}
