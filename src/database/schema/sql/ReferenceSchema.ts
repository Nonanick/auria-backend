import Knex from "knex";
import { IEntityReference } from "../../schemaInterface/IEntityReference.js";

export class ReferenceSchema {
  public name: string;
  public entity: string;
  public table: string;
  public column: string;
  public referenced_column: string;
  public referenced_entity?: string;
  public referenced_table: string;
  public referenced_schema?: string;

  constructor(data: Omit<IEntityReference, "_id" | "status">) {
    this.name = data.name;
    // Source
    this.table = data.table;
    this.column = data.column;
    this.entity = data.entity;
    // Reference
    this.referenced_column = data.referenced_column;
    this.referenced_entity = data.referenced_entity;
    this.referenced_table = data.referenced_table;
    this.referenced_schema = data.referenced_schema;
  }

  public install(connection: Knex) {
    return this.keyExistsOnInformationSchema(connection).then(
      async (exists) => {
        if (!exists) {
          await this.createForeignKeyConstraint(connection);
        }
        return this;
      }
    );
  }

  protected keyExistsOnInformationSchema(connection: Knex): Promise<boolean> {
    console.log(
      "Reference Source:",
      this.table,
      this.column,
      connection.client.database(),
      this.referenced_table,
      this.referenced_column
    );

    return (
      connection
        .withSchema("information_schema")
        // Check for key in Information  Schema
        .select("*")
        .from("key_column_usage")
        .where("table_name", this.table)
        .where("column_name", this.column)
        .where("referenced_table_schema", connection.client.database())
        .where("referenced_table_name", this.referenced_table)
        .where("referenced_column_name", this.referenced_column)
        .then(async (sqlReference) => {
          return sqlReference.length > 0;
        })
    );
  }

  protected async createForeignKeyConstraint(
    connection: Knex
  ): Promise<ReferenceSchema> {
    try {
      await connection.schema.raw(`ALTER TABLE \`${this.table}\` 
                    ADD CONSTRAINT \`${this.name}\`
                    FOREIGN KEY (\`${this.column}\`)
                    REFERENCES \`${this.referenced_table}\`(\`${this.referenced_column}\`)`);
    } catch (err) {
      console.error(
        "[ReferenceSchema] Failed to generate key constraint on database!",
        err
      );
    }

    return this;
  }
}
