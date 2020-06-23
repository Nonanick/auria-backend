import { IDataFilterProvider } from "../IDataFilterProvider.js";
import { QueryBuilder } from "knex";
import { IDataFilterContext } from "../IDataFilterContext.js";

class ActiveStatusFilterProviderClass implements IDataFilterProvider {

    public applyFilter(query: QueryBuilder,  context: IDataFilterContext) {

        if (context.avaliableColumns.includes("status")) {
            query.where("status", "active");
        }

        return query;
    }
}

export const ActiveStatusFilterProvider = new ActiveStatusFilterProviderClass();

export const ActiveStatusFilterName = "ActiveStatusDataFilter";