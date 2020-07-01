import { ReadFetchParameters } from "./ReadFetchParameters.js";
import { ReadSelectColumnsProvider } from "../providers/ReadSelectColumnsProvider.js";
import { ReadLimitResultsProvider } from "../providers/ReadLimitResultsProvider.js";
import { ReadOrderResultsProvider } from "../providers/ReadOrderResultsProvider.js";
import { ReadGroupResultsProvider } from "../providers/ReadGroupResultsProvider.js";
import { IDataFilterContext } from "../../../../database/query/IDataFilterContext.js";
import { ReadFilterResultsProvider } from "../providers/ReadFilterResultsProvider.js";
import { IEntityProcedureParams, IEntityProcedure } from "../entity/IEntityProcedure.js";

export const DEFAULT_MAX_RESULTS_PER_FETCH = 100;

// Need to export so "Catalog" won't complain...
export class ReadFetchProcedureClass implements IEntityProcedure {

    protected _name: string = "READ_FETCH";

    public get name(): string {
        return this._name;
    }

    public async run({ user , entity, using, useTransaction }: IEntityProcedureParams) {

        const query = entity.connection.table(entity.schema.get("table_name"));

        const params : ReadFetchParameters = using;

        // - Columns
        ReadSelectColumnsProvider.selectFields(query, entity, params.columns || "*");

        // - Limit + Pagination (offset)
        ReadLimitResultsProvider.applyLimit(query, params.limitAndPagination || {
            resultsPerPage: DEFAULT_MAX_RESULTS_PER_FETCH,
            paginateResult: false,
            page: 0
        });

        // - Order by
        if (params.order)
            ReadOrderResultsProvider.applyOrdering(query, entity, params.order);

        // - Group By
        if (params.groupBy)
            ReadGroupResultsProvider.groupBy(query, entity, params.groupBy);

        // - Filters
        const context: IDataFilterContext = {
            entity,
            user,
            procedure: this.name,
            roles: await (await user.roles()).getRolesId(),
        };

        // 1 - Apply Entity "pre-defined" filters
        entity.getFilterProviderForProcedure(this.name).applyFilter(query, context);

        // 2 - Apply User "requested" filters
        if (params.filters)
            ReadFilterResultsProvider(params.filters).applyFilter(query, context);

    }
}

export const ReadFetchProcedure = new ReadFetchProcedureClass();