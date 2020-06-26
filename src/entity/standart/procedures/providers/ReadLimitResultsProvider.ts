import { IDataLimitProvider } from "../../../../database/query/IDataLimitProvider.js";
import { IDataLimit } from "auria-lib";
import { QueryBuilder } from "knex";

class ReadLimitResultsProviderClass implements IDataLimitProvider {

    public async applyLimit(query : QueryBuilder, limit : IDataLimit) : Promise<QueryBuilder> {
        
        if(limit.resultsPerPage <= 0 || limit.resultsPerPage === "unlimited") {
            return query;
        }

        query.limit(limit.resultsPerPage);

        if(limit.paginateResult) {
            if(limit.page >= 0) {
                query.offset(limit.page * limit.resultsPerPage);
            }
        }

        return query;
    }

}

export const ReadLimitResultsProvider = new ReadLimitResultsProviderClass();