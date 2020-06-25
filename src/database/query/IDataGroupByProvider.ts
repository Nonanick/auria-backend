import { QueryBuilder } from "knex";
import { EntitySchema } from "../schema/sql/EntitySchema.js";

export interface IDataGroupByProvider {

    groupBy(query: QueryBuilder, group: any, entity: EntitySchema): Promise<QueryBuilder>;
}