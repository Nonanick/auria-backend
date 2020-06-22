import Knex, { AlterTableBuilder, ColumnBuilder, Transaction } from "knex";
import { SQLTypes } from "./SQLTypes.js";
import { ResourceCatalog } from "../ResourceCatalog.js";
import { IColumn } from "../../schemaInterface/IColumn.js";
import { ResourceSchema } from "./ResourceSchema.js";
import { DefaultSchema } from "../default/DefaultRow.js";

export class ColumnSchema extends DefaultSchema<IColumn> {

    protected resource!: ResourceSchema;

    constructor(data?: Partial<IColumn> & Required<Pick<IColumn, RequiredColumnParameters>>) {
        super({
            ...{
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
                readable: true,
                required: !data?.nullable ?? false
            },
            ...data
        });

        this.defineGetter("column_keys", (keys) => {
            return String(keys).split(",");
        });
        this.defineSetter("column_keys", (keys: string[]) => {
            return keys.join(",");
        })

    }

    public setResource(resource: ResourceSchema) {
        this.resource = resource;
    }

    public async install(connection?: Knex) {

        if (this.resource == null) {
            throw new Error("[ColumnSchema] This column was not associated with any Resource!");
        }

        if (connection != null)
            this.connection = connection;

        return this.connection.schema
            .hasColumn(this.resource.get("table_name"), this.get("column_name"))
            .then(async (columnExists) => {
                console.log("[ColumnSchema] Will now install column: ", this.get("name"), " does it exist?", columnExists);
                if (columnExists) {
                    await this.installAlterInTable();
                } else {
                    await this.installAddToTable();
                }
                return this;
            });
    }

    public async save(transaction?: Transaction): Promise<boolean> {


        this.set("resource_id", this.resource.get("_id"));

        return this.connection
            .table(ResourceCatalog.Column.table_name)
            .where("resource_id", this.get("resource_id"))
            .where("name", this.get("name"))
            .where("column_name", this.get("column_name"))
            .select('*')
            .then(async (res) => {
                const data = await this.asJSON();

                if (res.length == 0) {

                    return this.connection
                        .insert(data)
                        .into(ResourceCatalog.Column.table_name)
                        .then((insertIds) => {
                            //this.set("_id", insertIds[0]);
                            this.setRowState("SYNCED");
                            return true;
                        });
                } else if (res.length == 1) {
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
                            } else if (updated > 1) {
                                console.error("Multiple rows updated when there was supposed to be only one!");
                            } else {
                                console.error("Failed to find row?????? Select was fine tou");
                            }

                            return true;
                        });
                } else {
                    return false;
                }
            });
    };

    protected async installAlterInTable() {
        return this.connection.schema.alterTable(this.resource.get("table_name"), (builder) => {
            return this.buildColumnWithBuilder(builder).alter();
        });
    }

    protected async installAddToTable() {
        return this.connection.schema.alterTable(this.resource.get("table_name"), (builder) => {
            let column = this.buildColumnWithBuilder(builder);

            //Can only define keys in ADD, when altering table it throws an error!
            if (this.get('column_keys').length > 0) {
                let keys: string[] = this.get('column_keys');
                if (keys.indexOf("IND") >= 0) column.index();
                if (keys.indexOf("UNI") >= 0) column.unique();
                if (keys.indexOf("PRI") >= 0) column.primary();
            }

            // TODO: check for key constraint when altering column!

            return column;
        });
    }

    protected buildColumnWithBuilder(builder: AlterTableBuilder): ColumnBuilder {
        let column: ColumnBuilder;
        const columnName = this.get("column_name");

        switch (this.get("sql_type") as SQLTypes) {
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
            case "JSON":
                column = builder.json(columnName);
                break;
            default:
                console.log("[ColumnSchema] Type ", this.get("sql_type"), " was not found in WITCH! using default varchar!");
                column = builder.string(columnName, this.get("length") || 255);
        };

        if (this.get("nullable") === true) column.nullable(); else column.notNullable();
        if (this.get("default_value") != null) {
            if (String(this.get("default_value")).indexOf("CURRENT_TIMESTAMP") === 0)
                column.defaultTo(this.connection.raw("CURRENT_TIMESTAMP"));
            else
                column.defaultTo(this.get("default_value"));
        }

        if (this.get('description') != null) column.comment(this.get('description'));

        return column;
    }
}

type RequiredColumnParameters = "column_name" | "name" | "sql_type";