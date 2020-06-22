import { IReadProcedure } from "../IReadProcedure.js";
import { IReadRequest, IReadResponse } from "auria-lib";
import { ResourceSchema } from "../../../../database/schema/sql/ResourceSchema.js";
import { User } from "../../../../user/User.js";
import { DataReadResponse } from "../DataReadResponse.js";
import { IDataFilterContext } from "../../../../database/query/IDataFilterContext.js";
import { KnexColumnAdapter } from "../knex/KnexColumnAdapter.js";
import { KnexLimitAdapter } from "../knex/KnexLimitAdapter.js";
import { KnexOrderAdapter } from "../knex/KnexOrderAdapter.js";
import { KnexFilterAdapter } from "../knex/KnexFilterAdapter.js";
import { KnexGroupByAdapter } from "../knex/KnexGroupByAdapter.js";

export class ReadFetchProcedure implements IReadProcedure {

    public async processRequest(request: IReadRequest<any>, resource: ResourceSchema, user: User): Promise<IReadResponse> {

        const query = resource.getConnection()
            .table(resource.get("table_name"));

        KnexColumnAdapter.selectFields(query, request.pick! as any, resource);

        KnexLimitAdapter.applyLimit(query, {
            paginateResult: request.limit != "unlimited" && request.limit! > 0,
            page: request.page!,
            resultsPerPage: request.limit ?? 20
        });

        KnexOrderAdapter.applyOrdering(query, request.order!, resource);

        KnexGroupByAdapter.groupBy(query, request.groupBy, resource);
        
        const filterContext: IDataFilterContext = {
            avaliableColumns: resource.getColumns().map(c => c.get("column_name")),
            procedure: "READ",
            roles: await (await user.roles()).getRolesId(),
            user: user,
            resource: resource
        };

        if (request.filters) {
            KnexFilterAdapter.applyFilter(query, request.filters!, filterContext);
        }

        // Resource defined filters!
        const filters = resource.getFilters();

        filters.forEach((f) => {
            f.applyFilter(query, {}, filterContext);
        });

        console.info("Data Read SQL", query.toSQL());

        const res = await query;

        const response: IReadResponse = new DataReadResponse(request);
        response.all = () => res;
        response.length = res.length;
        response.success = true;

        return response;
    }


    protected getValidColumns(resource: ResourceSchema, columns: string[] | "*"): string[] {
        // Only allow "readable" columns! (Should I just return them empty?)
        const cols = resource.getColumns().filter(c => c.get("readable") !== false);

        const allColumns = cols.map(c => c.get("column_name"));
        const allNames = cols.map(c => c.get("name"));

        if (columns === "*") {
            return allColumns
        }

        const validColumns: string[] = [];
        columns.forEach((c, i) => {
            if (allColumns.includes(c)) {
                validColumns.push(c);
                return;
            }
            const ioName = allNames.indexOf(c);
            if (ioName >= 0) {
                validColumns.push(allColumns[i]);
                return;
            }
        });

        return validColumns;
    }

}