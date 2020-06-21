import { IReadRequest, IDataFilter } from 'auria-lib';
export declare class DataReadRequest<T = any> implements IReadRequest {
    static DEFAULT_PAGE_LIMIT: number;
    from: string;
    pick: (keyof T)[] | "*";
    filters: {
        [filterName: string]: IDataFilter<T>;
    };
    protected paginationEnabled: boolean;
    protected _limit: number | "unlimited";
    protected _page: number;
    protected _order: {
        by: string;
        direction: "ASC" | "DESC";
    };
    get limit(): number | "unlimited";
    set limit(limit: number | "unlimited");
    set order(order: string | {
        by: string;
        direction: "ASC" | "DESC";
    });
    get page(): number;
    set page(page: number);
    enablePagination(): void;
    addFilter(name: string, filter: IDataFilter<T>): void;
    getFilters(): {
        [name: string]: IDataFilter<T>;
    };
    disablePagination(): void;
    startFrom?: string | undefined;
    constructor(from: string);
}
