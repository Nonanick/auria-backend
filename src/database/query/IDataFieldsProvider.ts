import { QueryBuilder } from "knex";
import { EntityClass } from "../../entity/EntityClass.js";

export interface IDataFieldsProvider {

    selectFields(query: QueryBuilder, entity: EntityClass, fields: string | string[]): Promise<QueryBuilder>;
    
}