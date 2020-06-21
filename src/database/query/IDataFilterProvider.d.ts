import { QueryBuilder } from "knex";
import { IDataFilterContext } from "./IDataFilterContext.js";
export interface IDataFilterProvider {
    applyFilter(query: QueryBuilder, context: IDataFilterContext): QueryBuilder | Promise<QueryBuilder>;
}
