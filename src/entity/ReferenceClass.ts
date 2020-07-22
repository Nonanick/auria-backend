import { EventEmitter } from "events";
import { nanoid } from "nanoid";
import Knex from "knex";
import { ReferenceSchema } from "../database/schema/sql/ReferenceSchema.js";
import { EntityClass } from "./EntityClass.js";
import { IEntityReference } from "../database/schemaInterface/IEntityReference.js";
import { SystemEntityCatalog } from "../database/schema/SystemEntityCatalog.js";

export class ReferenceClass extends EventEmitter {
  protected _name!: string;
  public get name() {
    return this._name;
  }

  protected _schema!: ReferenceSchema;

  public get schema() {
    return this._schema;
  }

  constructor(entity: EntityClass, params: ReferenceClassParameters) {
    super();

    this._name = params.name;

    this._schema = new ReferenceSchema({
      name: params.name,
      entity: entity.name,
      table: entity.schema.table_name,
      column: params.column,
      referenced_column: params.references.column,
      referenced_entity: params.references.inEntity,
      referenced_schema: params.references.inSchema,
      referenced_table: params.references.inTable,
    });
  }

  public async saveInAuria(conn: Knex) {
    let insertValues: IEntityReference = {
      _id: nanoid(22),
      name: this.schema.name,
      table: this._schema.table,
      column: this.schema.column,
      entity: this.schema.entity,
      referenced_table: this.schema.table,
      referenced_column: this.schema.column,
      referenced_entity: this.schema.referenced_entity,
      status: "active",
    };

    return conn
      .insert(insertValues)
      .into(SystemEntityCatalog.Reference.table_name);
  }

}

export interface ReferenceClassParameters {
  name: string;
  entity : string;
  table : string;
  column: string;
  references: {
    column: string;
    inEntity?: string;
    inTable: string;
    inSchema?: string;
  };
}
