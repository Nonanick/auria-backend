import { QueryBuilder } from "knex";
import { EntitySchema } from "../schema/sql/EntitySchema.js";

export interface IDataFieldsProvider {

    selectFields(query: QueryBuilder, fields: string[] | "*", entity: EntitySchema): Promise<QueryBuilder>;
    
}