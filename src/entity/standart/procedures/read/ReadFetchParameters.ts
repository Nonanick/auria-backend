import { IDataLimit, IDataOrder, IDataGroupBy, IDataFilter } from "auria-lib";

export interface ReadFetchParameters {
    /**
     * @todo Allow SQL functions and column aliases
     */
    columns?: string | string[] | "*";
    limitAndPagination?: IDataLimit;
    order?: IDataOrder;
    /**
     * @todo implement group by 
     */
    groupBy?: IDataGroupBy;
    filters?: IDataFilter | IDataFilter[] | {
        [name: string]: IDataFilter
    };
}