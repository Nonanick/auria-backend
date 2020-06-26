import { QueryBuilder } from "knex";
import { IDataOrder } from 'auria-lib';
import { EntityClass } from "../../entity/EntityClass.js";

export interface IDataOrderProvider {

    applyOrdering(query: QueryBuilder, entity: EntityClass, ordering: string | IDataOrder | IDataOrder[] ): Promise<QueryBuilder>;

}