import { IDataGroupByProvider } from "../../../../database/query/IDataGroupByProvider.js";
import { QueryBuilder } from "knex";
import { EntityClass } from "../../../EntityClass.js";

class ReadGroupResultsProviderClass implements IDataGroupByProvider {

    public async groupBy(query: QueryBuilder, entity: EntityClass, group: any): Promise<QueryBuilder> {

        // @todo implement group by
        return query;
    }

}

export const ReadGroupResultsProvider = new ReadGroupResultsProviderClass();