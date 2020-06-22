import { QueryBuilder } from "knex";
import { ResourceSchema } from "../schema/sql/ResourceSchema.js";

export interface IDataGroupByProvider {

    groupBy(query: QueryBuilder, group: any, resource: ResourceSchema): Promise<QueryBuilder>;
}