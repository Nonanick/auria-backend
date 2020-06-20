import { ApiListener } from "../ApiListener.js";
export class SystemApiListener extends ApiListener {
    constructor(system) {
        super();
        this.system = system;
    }
    /**
     * Execute
     * -------
     *
     * System execute will pass the request as first parameter and the system as the second!
     *
     * @param fn Function name that shall be called
     * @param request The request that originated the call
     */
    execute(fn, request) {
        return this[fn](request, this.system);
    }
}
//# sourceMappingURL=SystemApiListener.js.map