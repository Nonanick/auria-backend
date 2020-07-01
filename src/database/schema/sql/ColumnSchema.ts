import Knex, { AlterTableBuilder, ColumnBuilder, Transaction, CreateTableBuilder } from "knex";
import { SQLTypes } from "./SQLTypes.js";
import { EntitySchema } from "./EntitySchema.js";
import { Row } from "../../Row.js";

export class ColumnSchema extends Row<ColumnSchemaParameters> {

    protected __alreadyInstalled: boolean = false;

    public markAsAlreadyInstalled(): void {
        this.__alreadyInstalled = true;
    }

    public isMarkedAsInstalled(): boolean {
        return this.__alreadyInstalled;
    }
    protected entity!: EntitySchema;

    constructor(data?: Partial<ColumnSchemaParameters> & Required<Pick<ColumnSchemaParameters, RequiredColumnParameters>>) {
        super({
            ...{
                _id: undefined,
                default_value: undefined,
                length: undefined,
                nullable: true,
                column_keys: [],
                status: "active",
                readable: true,
                required: !data?.nullable ?? false
            },
            ...data
        });

        this.replaceGetterFunction("column_keys", (keys) => {
            return String(keys).split(",");
        });
        this.replaceSetterFunction("column_keys", (keys: string[]) => {
            return keys.join(",");
        })

    }

    public setEntity(entity: EntitySchema) {
        this.entity = entity;
    }

    public async install(connection?: Knex) {

        if (this.entity == null) {
            throw new Error("[ColumnSchema] This column was not associated with any Entity!");
        }

        if (connection != null)
            this.connection = connection;

        return this.connection.schema
            .hasColumn(this.entity.get("table_name"), this.get("column_name"))
            .then(async (columnExists) => {
                console.log("[ColumnSchema] Will now install column: ", this.get("column_name"), " does it exist?", columnExists);
                if (columnExists) {
                    await this.installAlterInTable();
                } else {
                    await this.installAddToTable();
                }
                return this;
            });
    }

    protected async installAlterInTable() {
        return this.connection.schema.alterTable(this.entity.get("table_name"), (builder) => {
            return this.buildColumnWithBuilder(builder).alter();
        });
    }

    protected async installAddToTable() {
        return this.connection.schema.alterTable(this.entity.get("table_name"), (builder) => {
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

    public buildColumnWithBuilder(builder: AlterTableBuilder | CreateTableBuilder): ColumnBuilder {
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

        if (this.get('comment') != null) column.comment(this.get('comment'));

        return column;
    }

}

export type RequiredColumnParameters = "column_name" | "sql_type";

export interface ColumnSchemaParameters {
    column_name: string;
    sql_type: SQLTypes;
    length: number;
    data_type: string;
    default_value: any;
    nullable: boolean;
    column_keys: ("UNI" | "IND" | "PRI")[];
    readable?: boolean;
    required?: boolean;
    comment?: string;
}