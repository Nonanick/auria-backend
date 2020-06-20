import { IReadRequest, IDataFilter } from 'auria-lib';
export declare class DataReadRequest<T = any> implements IReadRequest {
    static DEFAULT_PAGE_LIMIT: number;
    from: string;
    pick: (keyof T)[] | "*";
    filter: {
        [filterName: string]: IDataFilter<T>;
    };
    protected paginationEnabled: boolean;
    protected _limit: number | "unlimited";
    protected _page: number;
    get limit(): number | "unlimited";
    set limit(limit: number | "unlimited");
    get page(): number;
    set page(page: number);
    enablePagination(): void;
    disablePagination(): void;
    startFrom?: string | undefined;
    constructor(from: string);
}
