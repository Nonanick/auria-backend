import { IReadRequest, IDataFilter } from 'auria-lib';

export class DataReadRequest<T = any> implements IReadRequest {

    public static DEFAULT_PAGE_LIMIT = 20;

    public from!: string;
    public pick: (keyof T)[] | "*" = "*";
    public filter: { [filterName: string]: IDataFilter<T>; } = {};

    protected paginationEnabled = false;
    protected _limit: number | "unlimited" = DataReadRequest.DEFAULT_PAGE_LIMIT;
    protected _page: number = 0;

    public get limit(): number | "unlimited" {
        return this._limit;
    }

    public set limit(limit: number | "unlimited") {
        this.paginationEnabled = true;
        this._limit = limit <= 0 ? "unlimited" : limit;
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

    public disablePagination() {
        this.paginationEnabled = false;
    }

    public startFrom?: string | undefined;

    constructor(from: string) {
        this.from = from;
    }

}