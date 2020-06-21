import { IDataAccessPolicy } from "../IDataAccessPolicy.js";
import { QueryBuilder } from "knex";
import { IDataFilterContext } from "../../../../database/query/IDataFilterContext.js";
export declare class RoleBasedDataAccessPolicy implements IDataAccessPolicy {
    get name(): string;
    get title(): string;
    get description(): string;
    get flags(): {
        name: string;
        title: string;
        description: string;
    }[];
    applyFilter(query: QueryBuilder, context: IDataFilterContext): Promise<any>;
}
