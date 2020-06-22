import { QueryBuilder } from "knex";
import { ResourceSchema } from "../schema/sql/ResourceSchema.js";
import { IDataOrder } from 'auria-lib';

export interface IDataOrderProvider {

    applyOrdering(query: QueryBuilder, ordering: string | IDataOrder | IDataOrder[], resource: ResourceSchema): Promise<QueryBuilder>;

}