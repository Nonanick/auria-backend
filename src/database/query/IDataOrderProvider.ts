import { QueryBuilder } from "knex";
import { EntitySchema } from "../schema/sql/EntitySchema.js";
import { IDataOrder } from 'auria-lib';

export interface IDataOrderProvider {

    applyOrdering(query: QueryBuilder, ordering: string | IDataOrder | IDataOrder[], entity: EntitySchema): Promise<QueryBuilder>;

}