import { IDataFilterProvider } from "../../../database/query/IDataFilterProvider.js";
import { QueryBuilder } from "knex";
import { IDataFilterContext } from "../../../database/query/IDataFilterContext.js";
import { IDataFilter } from "auria-lib";

export class DataFilterAdapter implements IDataFilterProvider {

    protected filters: {
        [name: string]: IDataFilter
    } = {};

    constructor(dataFilters: { [name: string]: IDataFilter }) {
        this.filters = dataFilters;
    }

    public async applyFilter(query: QueryBuilder, context: IDataFilterContext) {
        for (let name in this.filters) {
            const filter = this.filters[name];
            if (context.resource.hasColumn(String(filter.column))) {
                this.handleComparison(query, filter);
            } else {
                console.error("[FilterAdapter] WARN! Failed to apply filter '", name, "' column does not exists in Auria!");
            }
        }
        return query;
    }

    protected handleComparison(query: QueryBuilder, filter: IDataFilter) {
        const negation = filter.negation ?? false;

        switch (filter.op) {
            case "!=":
            case "<>":
            case "not equal":
                negation ?
                    query.whereNot(filter.column, "<>", filter.value) :
                    query.where(filter.column, "<>", filter.value);
                break;
            case "=":
            case "equal":
                negation ?
                    query.whereNot(filter.column, filter.value) :
                    query.where(filter.column, filter.value);
                    break;
            case ">":
            case "gt":
            case "greater than":
                negation ?
                    query.whereNot(filter.column, ">", filter.value) :
                    query.where(filter.column, ">", filter.value);
                break;
            case "<":
            case "lt":
            case "lesser then":
                negation ?
                    query.whereNot(filter.column, "<", filter.value) :
                    query.where(filter.column, "<", filter.value);
                break;
            case "get":
            case ">=":
            case "greater than or equal to":
                negation ?
                    query.whereNot(filter.column, ">=", filter.value) :
                    query.where(filter.column, ">=", filter.value);
                break;
            case "let":
            case "<=":
            case "lesser than or equal to":
                negation ?
                    query.whereNot(filter.column, "<=", filter.value) :
                    query.where(filter.column, "<=", filter.value);
                break;
            case "LIKE":
            case "like":
            case "~=":
                negation ?
                    query.whereNot(String(filter.column), "like", "%" + filter.value + "%") :
                    query.where(String(filter.column), "like", "%" + filter.value + "%");
                break;
            //Include and Contains can be used as 'LIKE' in string values or as includes in Array types!
            case "includes":
            case "contains":
                if (typeof filter.value === "string") {
                    negation ?
                        query.whereNot( String(filter.column), "like", "%" + filter.value + "%") :
                        query.where(String(filter.column), "like", "%" + filter.value + "%");
                } else if (Array.isArray(filter.value)) {
                    negation ?
                        query.whereNotIn(filter.column, filter.value) :
                        query.whereIn(filter.column, filter.value);
                } else {
                    console.error("[FilterAdapter] WARN! Includes/Contains expects a string OR an Array like structure as a value!");
                }
                break;
            // In is used only for Arrays!
            case "in":
                if (Array.isArray(filter.value)) {
                    negation ?
                        query.whereNotIn(filter.column, filter.value) :
                        query.whereIn(filter.column, filter.value);
                } else {
                    console.error("[FilterAdapter] WARN! \"In\" expects an Array-like structure as a value!");
                }
                break;
            case "between":
                if (Array.isArray(filter.value)) {
                    if (filter.value.length == 2) {
                        const [min, max] = filter.value;
                        negation ?
                            query.whereNotBetween(filter.column, [min, max]) :
                            query.whereBetween(filter.column, [min, max]);
                    } else {
                        console.error("[FilterAdapter] WARN! \"Between\" expects an Array-like structure as a value with 2 elements, [Minimum , Maximum Values!");
                    }
                } else {
                    console.error("[FilterAdapter] WARN! \"Between\" expects an Array-like structure as a value with 2 elements, [Minimum , Maximum Values!");
                }
                break;

            default:
                negation ?
                    query.whereNot(filter.column, filter.value) :
                    query.where(filter.column, filter.value);
        }
    }
}
