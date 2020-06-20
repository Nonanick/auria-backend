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
import { ResourceCatalog } from "../ResourceCatalog.js";
export class ColumnRow extends DefaultRow {
    constructor(data) {
        super(Object.assign({
            _id: undefined,
            default_value: undefined,
            description: undefined,
            length: undefined,
            title: "",
            reference_id: undefined,
            nullable: true,
            column_keys: [],
            data_type: "string",
            status: "active",
        }, data));
        this.defineGetter("column_keys", (keys) => {
            return String(keys).split(",");
        });
        this.defineSetter("column_keys", (keys) => {
            return keys.join(",");
        });
    }
    setResource(resource) {
        this.resource = resource;
    }
    install(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.resource == null) {
                throw new Error("[ColumnRow] This column was not associated with any Resource!");
            }
            if (connection != null)
                this.connection = connection;
            return this.connection.schema
                .hasColumn(this.resource.get("table_name"), this.get("column_name"))
                .then((columnExists) => __awaiter(this, void 0, void 0, function* () {
                console.log("[ColumnRow] Will now install column: ", this.get("name"), " does it exist?", columnExists);
                if (columnExists) {
                    yield this.installAlterInTable();
                }
                else {
                    yield this.installAddToTable();
                }
                return this;
            }));
        });
    }
    save(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            this.set("resource_id", this.resource.get("_id"));
            return this.connection
                .table(ResourceCatalog.Column.table_name)
                .where("resource_id", this.get("resource_id"))
                .where("name", this.get("name"))
                .where("column_name", this.get("column_name"))
                .select('*')
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                const data = yield this.asJSON();
                if (res.length == 0) {
                    return this.connection
                        .insert(data)
                        .into(ResourceCatalog.Column.table_name)
                        .then((insertIds) => {
                        //this.set("_id", insertIds[0]);
                        this.setRowState("SYNCED");
                        return true;
                    });
                }
                else if (res.length == 1) {
                    this.set("_id", res[0]._id);
                    delete data._id;
                    return this.connection
                        .table(ResourceCatalog.Column.table_name)
                        .update(data)
                        .where("resource_id", this.get("resource_id"))
                        .where("name", this.get("name"))
                        .where("column_name", this.get("column_name"))
                        .then((updated) => {
                        if (updated == 1) {
                            this.setRowState("SYNCED");
                        }
                        else if (updated > 1) {
                            console.error("Multiple rows updated when tehre was supposed to be only one!");
                        }
                        else {
                            console.error("Failed to find row?????? Select was fine tou");
                        }
                        return true;
                    });
                }
                else {
                    return false;
                }
            }));
        });
    }
    ;
    installAlterInTable() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.connection.schema.alterTable(this.resource.get("table_name"), (builder) => {
                return this.buildColumnWithBuilder(builder).alter();
            });
        });
    }
    installAddToTable() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.connection.schema.alterTable(this.resource.get("table_name"), (builder) => {
                let column = this.buildColumnWithBuilder(builder);
                //Can only define keys in ADD, when altering table it throws an error!
                if (this.get('column_keys').length > 0) {
                    let keys = this.get('column_keys');
                    if (keys.indexOf("IND") >= 0)
                        column.index();
                    if (keys.indexOf("UNI") >= 0)
                        column.unique();
                    if (keys.indexOf("PRI") >= 0)
                        column.primary();
                }
                // TODO: check for key constraint when altering column!
                return column;
            });
        });
    }
    buildColumnWithBuilder(builder) {
        let column;
        const columnName = this.get("column_name");
        switch (this.get("sql_type")) {
            case "VARCHAR":
                column = builder.string(columnName, this.get("length") || 255);
                break;
            case "CHAR":
                column = builder.specificType(columnName, `CHAR(${this.get("length") || 30})`);
                break;
            case "TEXT":
                column = builder.text(columnName);
                break;
            case "LONGTEXT":
                column = builder.text(columnName, "longtext");
                break;
            case "TIMESTAMP":
                column = builder.timestamp(columnName);
                break;
            case "DATETIME":
                column = builder.dateTime(columnName);
                break;
            case "BOOLEAN":
                column = builder.boolean(columnName);
                break;
            case "INT":
            case "INTEGER":
                column = builder.integer(columnName, this.get("length") || 11);
                break;
            case "BIGINT":
                column = builder.bigInteger(columnName);
                break;
            default:
                console.log("[ColumnRow] Type ", this.get("sql_type"), " was not found in WITCH! using default varchar!");
                column = builder.string(columnName, this.get("length") || 255);
        }
        ;
        if (this.get("nullable") === true)
            column.nullable();
        else
            column.notNullable();
        if (this.get("default_value") != null) {
            if (String(this.get("default_value")).indexOf("CURRENT_TIMESTAMP") === 0)
                column.defaultTo(this.connection.raw("CURRENT_TIMESTAMP"));
            else
                column.defaultTo(this.get("default_value"));
        }
        if (this.get('description') != null)
            column.comment(this.get('description'));
        return column;
    }
}
//# sourceMappingURL=ColumnRow.js.map