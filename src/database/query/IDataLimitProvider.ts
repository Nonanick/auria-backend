import { QueryBuilder } from "knex";
import { IDataLimit } from 'auria-lib';

export interface IDataLimitProvider {

    applyLimit(query : QueryBuilder, limit : IDataLimit) : Promise<QueryBuilder>;

}