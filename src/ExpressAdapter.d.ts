import { Application } from 'express';
import { System } from './System.js';
export declare class ExpressAdapter {
    protected app: Application;
    protected systems: System[];
    constructor(app: Application);
    private registerSystemInExpress;
    private sendSystemResponse;
    private generateSystemRequest;
    start(): Promise<boolean[]>;
}
