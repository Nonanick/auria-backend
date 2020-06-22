import { QueryBuilder } from "knex";
import { ResourceSchema } from "../schema/sql/ResourceSchema.js";

export interface IDataFieldsProvider {

    selectFields(query: QueryBuilder, fields: string[] | "*", resource: ResourceSchema): Promise<QueryBuilder>;
    
}