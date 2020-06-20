export class SystemStatusListener {
    constructor(system) {
        this.environment = (req) => {
        };
        this.status = (req) => {
        };
        this.system = system;
    }
    get name() { return "SystemStatus"; }
    ;
    exposedApiRoutes() {
        return {
            "env": {
                functionName: "environment"
            },
            "status": {
                functionName: "status"
            }
        };
    }
    baseUrl() {
        return "status";
    }
    answerRequest(request) {
        return "ok";
    }
}
//# sourceMappingURL=SystemStatusListener.js.map