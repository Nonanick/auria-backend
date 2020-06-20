export class DataReadRequest {
    constructor(from) {
        this.pick = "*";
        this.filter = {};
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
    get page() {
        return this.page;
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
    disablePagination() {
        this.paginationEnabled = false;
    }
}
DataReadRequest.DEFAULT_PAGE_LIMIT = 20;
//# sourceMappingURL=DataReadRequest.js.map