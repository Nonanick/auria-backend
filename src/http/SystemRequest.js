export class SystemRequest {
    constructor(data) {
        this.resolvedQueryString = {};
        this.headers = {};
        this.cookies = {};
        this.url = (data === null || data === void 0 ? void 0 : data.url) || "";
        this.fullUrl = (data === null || data === void 0 ? void 0 : data.fullUrl) || "";
        this.queryString = (data === null || data === void 0 ? void 0 : data.queryString) || "";
        this.headers = (data === null || data === void 0 ? void 0 : data.headers) || {};
        this.cookies = (data === null || data === void 0 ? void 0 : data.cookies) || {};
        this.system = (data === null || data === void 0 ? void 0 : data.system) || "";
        this.redirected = (data === null || data === void 0 ? void 0 : data.redirected) || false;
        this.resolvedQueryString = (data === null || data === void 0 ? void 0 : data.resolvedQueryString) || {};
        this.parameters = (data === null || data === void 0 ? void 0 : data.parameters) || {};
        this.referer = (data === null || data === void 0 ? void 0 : data.referer) || "REFERER_INFO_NOT_PROVIDED";
    }
    getUser() {
        return this.user;
    }
    setUser(user) {
        this.user = user;
    }
}
//# sourceMappingURL=SystemRequest.js.map