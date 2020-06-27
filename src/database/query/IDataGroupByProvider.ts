import { QueryBuilder } from "knex";
import { EntityClass } from "../../entity/EntityClass.js";

export interface IDataGroupByProvider {

    groupBy(query: QueryBuilder,  entity: EntityClass, group: any): Promise<QueryBuilder>;
    
}