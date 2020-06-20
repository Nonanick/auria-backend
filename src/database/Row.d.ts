/// <reference types="node" />
import { EventEmitter } from "events";
import Knex, { Transaction } from "knex";
export declare class Row<T = any> extends EventEmitter {
    protected connection: Knex;
    private rowControlState;
    private changedAttributes;
    private tableName;
    private primaryKey;
    /**
     * Data
     * -----
     * Holds all the data coming from the database
     */
    private data;
    /**
     * Custom Getter
     * -------------
     * Defines a function that will 'get' the value
     * It will ALWAYS be the last function called in case
     * there are get proxies set for the same property!
     *
     * GET functions cannot be aborted! If an exception is
     * raised/thrown the responsible function is ignored and
     * the value is passed to the next function in the chain!
     */
    private customGetters;
    /**
     * Custom Setter
     * -------------
     * Defines a function that will 'set' the value
     * It will ALWAYS be the last function called in case
     * there are set proxies set for the same property!
     *
     * SET functions can be aborted by calling the 'abort' function
     * passed as a parameter, throwing an error inside a custom setter/proxy
     * WILL STOP THE CHAIN, unlike the getter, but tou should not use
     * exceptions as a control flow, unless you are in a promise!
     *
     * Abborting the operation will set the property to its initial
     * value! All changes made by the chain will be discarded!
     *
     */
    private customSetters;
    /**
     * GET Proxies
     * -----------
     * Act similar to the ES6 Proxy, intercepts, in order, the 'get' function
     * and can manipulate the return value!
     *
     * Returning undefined in the function will make the
     * chain use the previous value! Errors raised will NOT
     * stop the chain
     */
    private getProxies;
    private setProxies;
    constructor(data?: Partial<T>);
    /**
     * Copy Into
     * ----------
     *
     * Will duplicate all of this object data,
     * custom getter and setter, proxies into
     * a new object
     * @param target
     */
    copyInto(target: Row<T>): Row<T>;
    setConnection(connection: Knex): this;
    setRowPrimaryField(field: keyof T): void;
    getRowPrimaryField(): keyof T;
    setRowState(state: RowSyncControlState): void;
    getRowState(): RowSyncControlState;
    get(property: keyof T): any;
    set(property: keyof T, value: any): Row<T>;
    set(properties: Partial<T>): Row<T>;
    defineSetter(propName: keyof T, setter: (value: any) => any): Row<T>;
    defineGetter(propName: keyof T, getter: (value: any) => any): Row<T>;
    addGetProxy(propName: keyof T, getProxy: ResourceGetProxy): void;
    removeGetProxy(propName: keyof T, getProxy: ResourceGetProxy): this;
    addSetProxy(propName: keyof T, setProxy: ResourceSetProxy): void;
    removeSetProxy(propName: keyof T, setProxy: ResourceSetProxy): this;
    save(transaction?: Transaction, forceUpdate?: boolean): Promise<boolean>;
    protected create(transaction?: Transaction): Promise<boolean>;
    protected update(transaction?: Transaction, pushAllValues?: boolean): Promise<Partial<T>>;
    setTableName(name: string): this;
    asJSON(keys?: (keyof T)[]): T;
    destroy(): this;
}
declare type RowSyncControlState = "NOT_ON_DATABASE" | "SYNCED" | "UNSYNCED";
export declare type ResourceGetProxy = (value: any) => Promise<any> | any;
export declare type ResourceSetProxy = (value: any, abort: ResourceAbortSetOperation) => any | Promise<any>;
export declare type ResourceAbortSetOperation = (messageOrException: string | Error) => void;
export {};
