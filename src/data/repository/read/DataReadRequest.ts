import { IReadRequest, IDataFilter } from 'auria-lib';

export class DataReadRequest<T = any> implements IReadRequest {

    public static DEFAULT_PAGE_LIMIT = 20;

    public from!: string;
    public pick: (keyof T)[] | "*" = "*";
    public filters: { [filterName: string]: IDataFilter<T>; } = {};

    protected paginationEnabled = false;
    protected _limit: number | "unlimited" = DataReadRequest.DEFAULT_PAGE_LIMIT;
    protected _page: number = 0;
    protected _order!: {
        by: string;
        direction: "ASC" | "DESC"
    };
    public get limit(): number | "unlimited" {
        return this._limit;
    }

    public set limit(limit: number | "unlimited") {
        this.paginationEnabled = true;
        this._limit = limit <= 0 ? "unlimited" : limit;
    }

    public set order(order: string | { by: string; direction: "ASC" | "DESC" }) {

        if (typeof order === "string") {
            this._order = {
                by: order,
                direction: "ASC"
            };
            return;
        }

        this._order = order;
    }

    public get page(): number {
        return this._page;
    }

    public set page(page: number) {
        this.paginationEnabled = true;
        this._page = page;
    }

    public enablePagination() {
        this.paginationEnabled = true;
        if (this.limit <= 0) {
            this._limit = DataReadRequest.DEFAULT_PAGE_LIMIT;
        }
    }

    public addFilter(name: string, filter: IDataFilter<T>) {
        this.filters[name] = filter;
    }

    public getFilters(): { [name: string]: IDataFilter<T> } {
        return this.filters;
    }

    public disablePagination() {
        this.paginationEnabled = false;
    }

    public startFrom?: string | undefined;

    constructor(from: string) {
        this.from = from;
    }

}