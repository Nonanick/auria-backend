import { IDataFilterProvider } from "../../../../database/query/IDataFilterProvider.js";
import { IDataFilter } from "auria-lib";


function getFilterProvider(filters: IDataFilter | IDataFilter[] | { [name: string]: IDataFilter }): IDataFilterProvider {
    const provider: IDataFilterProvider = {
        applyFilter: (query, context) => {

            return query;
        }
    };

    return provider;
}


export const ReadFilterResultsProvider = (filters: IDataFilter | IDataFilter[] | { [name: string]: IDataFilter }) => {
    return getFilterProvider(filters);
}