import { EventEmitter } from "events";
import Knex, { Transaction, QueryBuilder } from "knex";
import { RowInformationMissing } from "../exception/system/database/RowInformationMissing.js";
import { ISetProxy } from "../entity/standart/setProxies/ISetProxy.js";
import { IGetProxy } from "../entity/standart/getProxies/IGetProxy.js";

export class Row<T = any> extends EventEmitter {

    protected connection!: Knex;

    private rowControlState: RowSyncControlState = "NOT_ON_DATABASE";

    private changedAttributes: (keyof T)[] = [];

    private tableName!: string;

    private primaryKey!: keyof T;

    /**
     * Data
     * -----
     * Holds all the data coming from the database
     */
    private data: Partial<T> = {};

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
    private customGetters: Map<keyof T, (value: any) => any>;

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
    private customSetters: Map<keyof T, (value: any) => any>;

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
    private getProxies: Map<keyof T, IGetProxy[]>;

    /**
     * SET Proxies
     * ------------
     * Captures the "set" value operation of a column/field
     * Raising an error will prevent the value to be changed!
     */
    private setProxies: Map<keyof T, ISetProxy[]>;

    constructor(data?: Partial<T>) {
        super();

        this.customGetters = new Map();
        this.customSetters = new Map();
        this.getProxies = new Map();
        this.setProxies = new Map();

        this.set(data || {});

    }

    /**
     * Copy Into
     * ----------
     * 
     * Will duplicate all of this object data,
     * custom getter and setter, proxies into
     * a new object
     * @param target 
     */
    public copyInto(target: Row<T>): Row<T> {

        target.set({ ...this.data, _id: undefined });

        this.customGetters.forEach((getter, prop) => {
            target.defineGetter(prop, getter);
        });

        this.customSetters.forEach((setter, prop) => {
            target.defineSetter(prop, setter);
        });

        return target;
    }

    public setConnection(connection: Knex) {
        this.connection = connection;
        return this;
    }

    public setRowPrimaryField(field: keyof T) {
        this.primaryKey = field;
    }

    public getRowPrimaryField(): keyof T {
        return this.primaryKey;
    }

    public setRowState(state: RowSyncControlState) {
        this.rowControlState = state;
    }

    public getRowState(): RowSyncControlState {
        return this.rowControlState;
    }

    public get(property: keyof T) {
        if (this.customGetters.has(property)) {
            return this.customGetters.get(property)!(this.data[property]);
        }

        return this.data[property];
    }

    public set(property: keyof T, value: any): Row<T>;
    public set(properties: Partial<T>): Row<T>;
    public set(propertiesOrName: Partial<T> | keyof T, value?: any): Row<T> {

        if (typeof propertiesOrName !== "object") {
            let args: Partial<T> = ({
                [propertiesOrName]: value
            } as Partial<T>);
            return this.set(args);
        }



        for (let propName in propertiesOrName) {
            if (propertiesOrName.hasOwnProperty(propName)) {
                const oldValue = this.data[propName];

                if (this.customSetters.has(propName)) {
                    this.data[propName] = this.customSetters.get(propName)!(value);
                } else {
                    this.data[propName] = propertiesOrName[propName];
                }

                // Each time a set is done and the value is different set the state as unsynced
                if (oldValue != this.data[propName]) {
                    // Push value into changed attributes!
                    if (this.changedAttributes.indexOf(propName) < 0) this.changedAttributes.push(propName);
                    // If previous state of row is "SYNCED" make it "UNSYNCED"!
                    if (this.rowControlState == "SYNCED") this.setRowState("UNSYNCED");
                }
            }
        }
        return this;
    }

    public defineSetter(propName: keyof T, setter: (value: any) => any): Row<T> {
        this.customSetters.set(propName, setter);
        return this;
    }

    public defineGetter(propName: keyof T, getter: (value: any) => any): Row<T> {
        this.customGetters.set(propName, getter);
        return this;
    }

    public addGetProxy(propName: keyof T, getProxy: IGetProxy) {
        if (!this.getProxies.has(propName)) {
            this.getProxies.set(propName, []);
        }
        this.getProxies.get(propName)!.push(getProxy);
    }

    public removeGetProxy(propName: keyof T, getProxy: IGetProxy) {
        if (this.getProxies.has(propName)) {
            const proxies = this.getProxies.get(propName)!;
            const iOProxy = proxies.indexOf(getProxy);
            if (iOProxy >= 0) {
                this.getProxies.set(propName, proxies.splice(iOProxy, 1));
                console.log("[Row] GET Proxy removed!");
                return this;
            }
        }

        console.error("[Row] Failed to remove GET proxy from row! Not found!");
        return this;
    }

    public addSetProxy(propName: keyof T, setProxy: ISetProxy) {
        if (!this.setProxies.has(propName)) {
            this.setProxies.set(propName, []);
        }
        this.setProxies.get(propName)!.push(setProxy);
    }

    public removeSetProxy(propName: keyof T, setProxy: ISetProxy) {
        if (this.setProxies.has(propName)) {
            const proxies = this.setProxies.get(propName)!;
            const iOProxy = proxies.indexOf(setProxy);
            if (iOProxy >= 0) {
                this.setProxies.set(propName, proxies.splice(iOProxy, 1));
                console.log("[Row] SET Proxy removed!");
                return this;
            }
        }

        console.error("[Row] Failed to remove SET proxy from row! Not found!");
        return this;
    }

    public async save(transaction?: Transaction, forceUpdate = false): Promise<boolean> {

        if (this.rowControlState == "NOT_ON_DATABASE") {

            // Create row 
            try {
                let created = await this.create(transaction);

                if (created) this.setRowState("SYNCED");

                return created;
            } catch (err) {
                console.error("[Row] ERROR! Save function raised an exception!", err);
                return false;
            }

        } else if (this.rowControlState == "UNSYNCED" || forceUpdate) {
            try {
                await this.update(transaction);
                this.setRowState("SYNCED");
                return true;
            } catch (err) {
                console.error("[Row] ERROR! Save function raised an exception!", err);
                return false;
            }
        } else {
            console.info("[Row] NOOP! The row is already marked as 'SYNCED' and therefore was not updated!");
            return true;
        }
    }

    protected async create(transaction?: Transaction): Promise<boolean> {
        if (this.tableName == null) {
            throw new RowInformationMissing("To update/create a row please provide its connection + table name!");
        }

        let iD = this.get(this.primaryKey);

        let insertInstruction: QueryBuilder<T, Partial<T>>;

        if (transaction) {
            insertInstruction = transaction.insert(await this.asJSON(), '*').into(this.tableName);
        } else {
            if (this.connection == null) {
                throw new RowInformationMissing("To update/create a row please provide its connection + table name!");
            }
            insertInstruction = this.connection.insert(await this.asJSON(), '*').into(this.tableName);
        }

        return insertInstruction
            .then((insertedIds) => {
                console.info("[Row] INSERT command succesful! Inserted ID's:", insertedIds);
                return true;
            })
            .catch((err) => {
                console.error("[Row] ERROR! INSERT command failed, generated SQL error: ", err);
                return false;
            });

    }

    protected async update(transaction?: Transaction, pushAllValues = false): Promise<Partial<T>> {
        if (this.tableName == null || this.primaryKey == null) {
            throw new RowInformationMissing("To update/create a row please provide its connection + Primary field + Table name!");
        }

        const updateValues = pushAllValues ? this.asJSON() : this.asJSON(this.changedAttributes);

        // Primary key should NEVER be "updated"!
        delete updateValues[this.primaryKey];

        let updateInstruction: QueryBuilder<T, number>;
        if (transaction != null) {
            updateInstruction =
                transaction
                    .table(this.tableName)
                    .update(updateValues)
                    .where(this.primaryKey as string, this.get(this.primaryKey));
        }
        else {
            if (this.connection == null) {
                throw new RowInformationMissing("To update/create a row please provide its Connection + primary field + table name!");
            }
            updateInstruction =
                this.connection
                    .table(this.tableName)
                    .update(updateValues)
                    .where(this.primaryKey as string, this.get(this.primaryKey));
        }

        return updateInstruction
            .then((updated) => {
                console.log("[Row] UPDATE command successful, rows updated ", updated);
                return updateValues!;
            })
            .catch((err) => {
                console.error("[Row] ERROR! UPDATE command failed, generated SQL error: ", err);
                throw new Error("UPDATE SQL ERROR! failed to update row!");
            });
    }


    public setTableName(name: string) {
        this.tableName = name;
        return this;
    }

    public asJSON(keys?: (keyof T)[]): T {

        let ans: Partial<T> = {};
        const returnedKeys = keys || (Object.keys(this.data) as (keyof T)[]);

        for (let index = 0; index < returnedKeys.length; index++) {
            ans[returnedKeys[index]] = this.get(returnedKeys[index]);
        }

        return ans as T;
    }

    public destroy() {

        delete this.setProxies;
        delete this.getProxies;
        delete this.data;
        delete this.customSetters;
        delete this.customGetters;
        delete this.changedAttributes;

        return this.removeAllListeners();
    }

}

type RowSyncControlState = "NOT_ON_DATABASE" | "SYNCED" | "UNSYNCED";

export type EntityAbortSetOperation = (messageOrException: string | Error) => void;