import { IDataLimitProvider } from "../../../../database/query/IDataLimitProvider.js";
import { QueryBuilder } from "knex";
import { IDataLimit } from 'auria-lib';

export class KnexLimitAdapterClass implements IDataLimitProvider {

    public async applyLimit(query: QueryBuilder, limit: IDataLimit): Promise<QueryBuilder> {

        if (limit.resultsPerPage != "unlimited" ) {
            query.limit(limit.resultsPerPage);

            if (limit.page && limit.paginateResult === true) {
                query.offset(limit.page! * limit.resultsPerPage);
            }
        }
        return query;
    }

}

export const KnexLimitAdapter = new KnexLimitAdapterClass();