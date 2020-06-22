import { IDataGroupByProvider } from "../../../../database/query/IDataGroupByProvider.js";
import { QueryBuilder } from "knex";
import { ResourceSchema } from "../../../../database/schema/sql/ResourceSchema.js";

class KnexGroupByAdapterClass implements IDataGroupByProvider {


    public async groupBy(query: QueryBuilder, group: any, resource: ResourceSchema): Promise<QueryBuilder> {
        return query;
    }
}

export const KnexGroupByAdapter = new KnexGroupByAdapterClass();