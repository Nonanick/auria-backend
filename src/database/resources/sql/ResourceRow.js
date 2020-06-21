var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DefaultRow } from "../default/DefaultRow.js";
import { ColumnRow } from "./ColumnRow.js";
import { ResourceCatalog } from "../ResourceCatalog.js";
import { AuriaRow } from "../default/AuriaRow.js";
export class ResourceRow extends DefaultRow {
    constructor(data) {
        super(Object.assign({
            _id: undefined,
            connection_id: undefined,
            status: 'active',
            is_system_resource: false,
        }, data));
        this._primaryField = "_id";
        this.columns = {};
        this.references = {};
        this.filterProviders = {};
        const idColumn = new ColumnRow({
            name: "Id",
            column_name: "_id",
            column_keys: ["PRI"],
            sql_type: "CHAR",
            length: 22,
            data_type: "nanoid",
            nullable: false,
        });
        const statusColumn = new ColumnRow({
            name: "Status",
            column_name: "status",
            sql_type: "VARCHAR",
            length: 20,
            nullable: false,
            default_value: "active",
            title: "Entry Status",
            description: "Row current state"
        });
        const createdAtColumn = new ColumnRow({
            name: "Created At",
            column_name: "created_at",
            sql_type: "TIMESTAMP",
            default_value: "CURRENT_TIMESTAMP",
            title: "Row Creation data",
            description: "Row creation data"
        });
        this.addColumns(idColumn, statusColumn, createdAtColumn);
    }
    createRow(id, col) {
        return __awaiter(this, void 0, void 0, function* () {
            let nRow = new AuriaRow(this);
            nRow.setConnection(this.connection);
            if (id != null) {
                yield nRow.byId(id, col);
            }
            return nRow;
        });
    }
    getRow(id, column) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createRow(id, column);
        });
    }
    save(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return (transaction || this.connection)
                .table(ResourceCatalog.Resource.table_name)
                .where("name", this.get("name"))
                .where("table_name", this.get("table_name"))
                .select('*')
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                let data = yield this.asJSON();
                if (res.length == 0) {
                    return (transaction || this.connection)
                        .insert(data)
                        .into(ResourceCatalog.Resource.table_name)
                        .then((insertRes) => {
                        this.setRowState("SYNCED");
                        return true;
                    });
                }
                else {
                    this.set("_id", res[0]._id);
                    // Data ID not necessary on Update!
                    delete data._id;
                    return (transaction || this.connection)
                        .table(ResourceCatalog.Resource.table_name)
                        .update(data)
                        .where("name", this.get("name"))
                        .where("table_name", this.get("table_name"))
                        .then((updateRes) => {
                        if (updateRes == 1) {
                            this.setRowState("SYNCED");
                        }
                        else if (updateRes > 1) {
                            console.error("Multiple rows updated when tehre was supposed to be only one!");
                        }
                        else {
                            console.error("Failed to find row?????? Select was fine tou");
                        }
                        return true;
                    });
                }
            }));
        });
    }
    addColumns(...columns) {
        columns.forEach((column) => {
            const columnName = column.get("name");
            if (this.columns[columnName] != null)
                throw new Error(`[ResourceRow] Duplicate column on resource! Column with name ${columnName} already exists in ${this.get("name")}`);
            column.setResource(this);
            column.setConnection(this.connection);
            // Auto update Primary field!
            if (column.get("column_keys").includes("PRI")) {
                this.setRowPrimaryField(column.get("column_name"));
            }
            this.columns[columnName] = column;
        });
    }
    addReferences(...references) {
        references.forEach((reference) => {
            const referenceName = reference.get('name');
            if (this.references[referenceName] != null)
                throw new Error(`[ResourceRow] Duplicate reference on resource! Reference with name ${referenceName} already exists in ${this.get("name")}`);
            reference.setConnection(this.connection);
            this.references[referenceName] = reference;
        });
    }
    getColumns() {
        const allColumns = [];
        for (let columnName in this.columns) {
            if (this.columns.hasOwnProperty(columnName)) {
                allColumns.push(this.columns[columnName]);
            }
        }
        return allColumns;
    }
    install(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connection == null)
                this.connection = connection;
            return connection.schema
                .hasTable(this.get("table_name"))
                .then((tableExists) => {
                if (tableExists) {
                    return this;
                }
                else {
                    let tableCreation = connection.schema
                        .createTable(this.get("table_name"), (builder) => {
                        builder.specificType("_id", 'CHAR(21)').notNullable().primary();
                    })
                        .then((created) => {
                        console.log("[ResourceRow] Table creation > ", created);
                        return this;
                    });
                    tableCreation.catch((err) => {
                        console.error("[ResourceRow] SQL Error!", err);
                        throw new Error("[ResourceRow] Failed to create table! SQL Error");
                    });
                    return tableCreation.then(_ => this);
                }
            })
                //Table created
                .then(() => this.installColumns(connection));
        });
    }
    installColumns(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            let ans = [];
            for (let colName in this.columns) {
                if (this.columns.hasOwnProperty(colName)) {
                    ans.push(yield this.columns[colName].install(connection));
                }
            }
            return ans;
        });
    }
    installReferences(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            let ans = [];
            for (let refName in this.references) {
                if (this.references.hasOwnProperty(refName)) {
                    ans.push(yield this.references[refName].install(connection));
                }
            }
            return ans;
        });
    }
    addFilter(name, filter, options) {
        if (this.filterProviders[name] != null) {
            if (this.filterProviders[name].allowOverride === false) {
                throw new Error("ERROR! Filter proviter with name" + name + " DOES NOT ALLOW oveeride!");
            }
            console.warn("WARN! Filter provider with name ", name, " already exists in recource ", this.get("name"), "! Overriding it!");
        }
        this.filterProviders[name] = Object.assign(Object.assign({ filterProvider: filter, name: name }, {
            allowOverride: true
        }), options || {});
    }
    removeFilter(name) {
        if (this.filterProviders[name] == null) {
            console.info("INFO! Filter with name ", name, " is not avaliable on resource ", this.get("name"), " and therefore cannot be disabled!");
            return true;
        }
        if (this.filterProviders[name].allowOverride === false) {
            console.warn("WARN! Filter with name ", name, " CANNOT be disabled in ", this.get("name"), " because it was set with 'allowOverride' as false!");
            return;
        }
        delete this.filterProviders[name];
    }
    getFilters() {
        return Array.from(Object.values(this.filterProviders)).map(f => f.filterProvider);
    }
}
//# sourceMappingURL=ResourceRow.js.map