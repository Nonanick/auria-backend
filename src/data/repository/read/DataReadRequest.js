export class DataReadRequest {
    constructor(from) {
        this.pick = "*";
        this.filters = {};
        this.paginationEnabled = false;
        this._limit = DataReadRequest.DEFAULT_PAGE_LIMIT;
        this._page = 0;
        this.from = from;
    }
    get limit() {
        return this._limit;
    }
    set limit(limit) {
        this.paginationEnabled = true;
        this._limit = limit <= 0 ? "unlimited" : limit;
    }
    set order(order) {
        if (typeof order === "string") {
            this._order = {
                by: order,
                direction: "ASC"
            };
            return;
        }
        this._order = order;
    }
    get page() {
        return this._page;
    }
    set page(page) {
        this.paginationEnabled = true;
        this._page = page;
    }
    enablePagination() {
        this.paginationEnabled = true;
        if (this.limit <= 0) {
            this._limit = DataReadRequest.DEFAULT_PAGE_LIMIT;
        }
    }
    addFilter(name, filter) {
        this.filters[name] = filter;
    }
    getFilters() {
        return this.filters;
    }
    disablePagination() {
        this.paginationEnabled = false;
    }
}
DataReadRequest.DEFAULT_PAGE_LIMIT = 20;
//# sourceMappingURL=DataReadRequest.js.map