var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { EventEmitter } from "events";
import { RowInformationMissing } from "../exception/system/database/RowInformationMissing.js";
export class Row extends EventEmitter {
    constructor(data) {
        super();
        this.rowControlState = "NOT_ON_DATABASE";
        this.changedAttributes = [];
        /**
         * Data
         * -----
         * Holds all the data coming from the database
         */
        this.data = {};
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
    copyInto(target) {
        target.set(Object.assign(Object.assign({}, this.data), { _id: undefined }));
        this.customGetters.forEach((getter, prop) => {
            target.defineGetter(prop, getter);
        });
        this.customSetters.forEach((setter, prop) => {
            target.defineSetter(prop, setter);
        });
        return target;
    }
    setConnection(connection) {
        this.connection = connection;
        return this;
    }
    setRowPrimaryField(field) {
        this.primaryKey = field;
    }
    getRowPrimaryField() {
        return this.primaryKey;
    }
    setRowState(state) {
        this.rowControlState = state;
    }
    getRowState() {
        return this.rowControlState;
    }
    get(property) {
        if (this.customGetters.has(property)) {
            return this.customGetters.get(property)(this.data[property]);
        }
        return this.data[property];
    }
    set(propertiesOrName, value) {
        if (typeof propertiesOrName !== "object") {
            let args = {
                [propertiesOrName]: value
            };
            return this.set(args);
        }
        for (let propName in propertiesOrName) {
            if (propertiesOrName.hasOwnProperty(propName)) {
                const oldValue = this.data[propName];
                if (this.customSetters.has(propName)) {
                    this.data[propName] = this.customSetters.get(propName)(value);
                }
                else {
                    this.data[propName] = propertiesOrName[propName];
                }
                // Each time a set is done and the value is different set the state as unsynced
                if (oldValue != this.data[propName]) {
                    // Push value into changed attributes!
                    if (this.changedAttributes.indexOf(propName) < 0)
                        this.changedAttributes.push(propName);
                    // If previous state of row is "SYNCED" make it "UNSYNCED"!
                    if (this.rowControlState == "SYNCED")
                        this.setRowState("UNSYNCED");
                }
            }
        }
        return this;
    }
    defineSetter(propName, setter) {
        this.customSetters.set(propName, setter);
        return this;
    }
    defineGetter(propName, getter) {
        this.customGetters.set(propName, getter);
        return this;
    }
    addGetProxy(propName, getProxy) {
        if (!this.getProxies.has(propName)) {
            this.getProxies.set(propName, []);
        }
        this.getProxies.get(propName).push(getProxy);
    }
    removeGetProxy(propName, getProxy) {
        if (this.getProxies.has(propName)) {
            const proxies = this.getProxies.get(propName);
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
    addSetProxy(propName, setProxy) {
        if (!this.setProxies.has(propName)) {
            this.setProxies.set(propName, []);
        }
        this.setProxies.get(propName).push(setProxy);
    }
    removeSetProxy(propName, setProxy) {
        if (this.setProxies.has(propName)) {
            const proxies = this.setProxies.get(propName);
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
    save(transaction, forceUpdate = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.rowControlState == "NOT_ON_DATABASE") {
                // Create row 
                try {
                    let created = yield this.create(transaction);
                    if (created)
                        this.setRowState("SYNCED");
                    return created;
                }
                catch (err) {
                    console.error("[Row] ERROR! Save function raised an exception!", err);
                    return false;
                }
            }
            else if (this.rowControlState == "UNSYNCED" || forceUpdate) {
                try {
                    yield this.update(transaction);
                    this.setRowState("SYNCED");
                    return true;
                }
                catch (err) {
                    console.error("[Row] ERROR! Save function raised an exception!", err);
                    return false;
                }
            }
            else {
                console.info("[Row] NOOP! The row is already marked as 'SYNCED' and therefore was not updated!");
                return true;
            }
        });
    }
    create(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.tableName == null) {
                throw new RowInformationMissing("To update/create a row please provide its connection + table name!");
            }
            let iD = this.get(this.primaryKey);
            let insertInstruction;
            if (transaction) {
                insertInstruction = transaction.insert(yield this.asJSON(), '*').into(this.tableName);
            }
            else {
                if (this.connection == null) {
                    throw new RowInformationMissing("To update/create a row please provide its connection + table name!");
                }
                insertInstruction = this.connection.insert(yield this.asJSON(), '*').into(this.tableName);
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
        });
    }
    update(transaction, pushAllValues = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.tableName == null || this.primaryKey == null) {
                throw new RowInformationMissing("To update/create a row please provide its connection + Primary field + Table name!");
            }
            const updateValues = pushAllValues ? this.asJSON() : this.asJSON(this.changedAttributes);
            // Primary key should NEVER be "updated"!
            delete updateValues[this.primaryKey];
            let updateInstruction;
            if (transaction != null) {
                updateInstruction =
                    transaction
                        .table(this.tableName)
                        .update(updateValues)
                        .where(this.primaryKey, this.get(this.primaryKey));
            }
            else {
                if (this.connection == null) {
                    throw new RowInformationMissing("To update/create a row please provide its Connection + primary field + table name!");
                }
                updateInstruction =
                    this.connection
                        .table(this.tableName)
                        .update(updateValues)
                        .where(this.primaryKey, this.get(this.primaryKey));
            }
            return updateInstruction
                .then((updated) => {
                console.log("[Row] UPDATE command successful, rows updated ", updated);
                return updateValues;
            })
                .catch((err) => {
                console.error("[Row] ERROR! UPDATE command failed, generated SQL error: ", err);
                throw new Error("UPDATE SQL ERROR! failed to update row!");
            });
        });
    }
    setTableName(name) {
        this.tableName = name;
        return this;
    }
    asJSON(keys) {
        let ans = {};
        const returnedKeys = keys || Object.keys(this.data);
        for (let index = 0; index < returnedKeys.length; index++) {
            ans[returnedKeys[index]] = this.get(returnedKeys[index]);
        }
        return ans;
    }
    destroy() {
        delete this.setProxies;
        delete this.getProxies;
        delete this.data;
        delete this.customSetters;
        delete this.customGetters;
        delete this.changedAttributes;
        return this.removeAllListeners();
    }
}
//# sourceMappingURL=Row.js.map