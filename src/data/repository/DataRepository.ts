import { System } from "../../System.js";
import { User } from "../../user/User.js";
import { IReadRequest, IReadResponse } from "auria-lib";
import { DataReadResponse } from "./read/DataReadResponse.js";
import { ResourceRow } from "../../database/resources/sql/ResourceRow.js";
import { IDataFilterContext } from "../../database/query/IDataFilterContext.js";
import { DataFilterAdapter } from "./read/DataFilterAdapter.js";

export class DataRepository {

    constructor(private system: System) {

    }

    public async read(user: User, request: IReadRequest): Promise<IReadResponse> {
        const r = this.system.resourceManager().getResource(request.from);

        const pickColumns = this.getValidColumns(r, request.pick as string[]);

        const q = this.system.getConnection()
            .table(r.get("table_name"))
            .select(pickColumns);

        if (request.limit != "unlimited" && request.limit! > 0) {
            q.limit(request.limit!);

            if (request.page) {
                q.offset(request.limit! * request.page);
            }
        }

        if (request.order) {
            if (typeof request.order === "string") {
                q.orderBy(request.order);
            } else {
                q.orderBy(request.order.by, request.order.direction);
            }
        }

        const filterContext: IDataFilterContext = {
            avaliableColumns: r.getColumns().map(c => c.get("column_name")),
            procedure: "READ",
            roles: await (await user.roles()).getRolesId(),
            user: user,
            resource: r
        };

        if (request.filters) {
            let filterAdapter = new DataFilterAdapter(request.filters);
            filterAdapter.applyFilter(q, filterContext);
        }

        // Resource defined filters!
        const filters = r.getFilters();

        filters.forEach((f) => {
            f.applyFilter(q, filterContext);
        });
        
        //console.info("Data Read SQL", q.toSQL());

        const res = await q;

        const response: IReadResponse = new DataReadResponse(request);
        response.all = () => res;
        response.length = res.length;
        response.success = true;

        return response;
    }

    protected getValidColumns(resource: ResourceRow, columns: string[] | "*"): string[] {
        const allColumns = resource.getColumns().map(c => c.get("column_name"));
        const allNames = resource.getColumns().map(c => c.get("name"));

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