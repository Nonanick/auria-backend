import { IDataFilterProvider } from "../IDataFilterProvider.js";
import { QueryBuilder } from "knex";
import { IDataFilterContext } from "../IDataFilterContext.js";
declare class ActiveStatusFilterProviderClass implements IDataFilterProvider {
    applyFilter(query: QueryBuilder, context: IDataFilterContext): QueryBuilder<any, any>;
}
export declare const ActiveStatusFilterProvider: ActiveStatusFilterProviderClass;
export declare const ActiveStatusFilterName = "ActiveStatusDataFilter";
export {};
