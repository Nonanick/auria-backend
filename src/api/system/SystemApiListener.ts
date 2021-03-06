import { ApiListener } from "../ApiListener.js";
import { ISystemRequest } from "../../http/ISystemRequest.js";
import { System } from "../../System.js";

export abstract class SystemApiListener extends ApiListener {

    protected system: System;

    constructor(system: System) {
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
    protected execute(fn: string, request: ISystemRequest) {
        return (this as any)[fn](request, this.system);
    }
}