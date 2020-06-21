/// <reference types="node" />
import { EventEmitter } from "events";
import { Bootable } from "./Bootable.js";
export declare type BootOptions = {
    item: Bootable;
    dependencies: string[];
    triggerEvent: string | string[];
};
export declare type BootableOptions = {
    dependencies?: string[];
    triggerEvent?: string | string[];
};
export declare class BootSequence extends EventEmitter {
    private static defaultBootableOptions;
    private __actionBootableResolved;
    protected initializePromise: Promise<any>;
    private __bootItens;
    private __bootItensPromise;
    private __resolvedBootables;
    constructor();
    addBootable(name: string, item: Bootable, options?: BootableOptions): void;
    /**
     * [Create] Initialize Promise
     * ----------------------------
     *
     * Creates a Promise that will resolve after 'initialize'
     * event is emitted, rejects if ANY of its itens throw an
     * Error/Exception
     *
     */
    private createInitializePromise;
    protected bootItem(name: string, item: Bootable): void;
    protected bootAfterDependencies(name: string, item: Bootable, dependencies: string[]): void;
    protected checkDependencies(dependencies: string[]): boolean;
    onInitialize(): Promise<boolean>;
    initialize(): Promise<boolean>;
}
export declare const BootSequenceItemResolved = "bootableResolved";
export declare const BootSequenceBootFinished = "allResolved";
